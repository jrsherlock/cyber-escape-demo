import { Client, Room } from "@colyseus/core";
import {
  GameState,
  Player,
  RedFlagEntry,
  STATIONS,
  Station,
} from "../schema/GameState";
import {
  buildPopupScenario,
  POPUP_REDFLAG,
  POPUP_RESOLUTIONS,
} from "../scenarios/popup";

const RECONNECT_SECONDS = 60 * 5;
const TICK_INTERVAL_MS = 1000;

type JoinOptions = {
  displayName?: string;
  isFacilitator?: boolean;
};

export class WednesdayRoom extends Room<GameState> {
  maxClients = 7;
  autoDispose = true;
  private tickInterval?: NodeJS.Timeout;

  onCreate(options: { code?: string } = {}) {
    const state = new GameState();
    state.code = options.code ?? randomCode();
    state.createdAt = new Date().toISOString();
    state.phase = "lobby";
    state.currentScenario = buildPopupScenario();
    this.setState(state);

    this.onMessage("pickStation", (client, payload: { station: Station }) => {
      const player = this.state.players.get(client.sessionId);
      if (!player || player.isFacilitator) return;
      if (!STATIONS.includes(payload.station)) return;
      player.station = payload.station;
    });

    this.onMessage("startScenario", (client) => {
      if (this.state.phase !== "lobby") return;
      const player = this.state.players.get(client.sessionId);
      if (!player) return;
      this.state.phase = "scenario";
      const scenario = this.state.currentScenario;
      scenario.status = "active";
      scenario.timer.paused = false;
      this.startTicker();
    });

    this.onMessage("revealEvidence", (client, payload: { evidenceId: string }) => {
      const player = this.state.players.get(client.sessionId);
      if (!player) return;
      const evidence = this.state.currentScenario.evidence.get(payload.evidenceId);
      if (!evidence) return;
      if (
        evidence.visibleToStation !== player.station &&
        !player.isFacilitator
      ) {
        return;
      }
      evidence.revealed = true;
    });

    this.onMessage("setHuddle", (client, payload: { paused: boolean }) => {
      if (this.state.phase !== "scenario") return;
      const scenario = this.state.currentScenario;
      if (scenario.status !== "active" && scenario.status !== "huddle") return;
      scenario.timer.paused = !!payload.paused;
      scenario.status = payload.paused ? "huddle" : "active";
    });

    this.onMessage("castVote", (client, payload: { optionId: string }) => {
      const player = this.state.players.get(client.sessionId);
      if (!player || player.isFacilitator) return;
      const scenario = this.state.currentScenario;
      if (scenario.status !== "active" && scenario.status !== "huddle") return;
      const valid = scenario.decision.options.some((o) => o.id === payload.optionId);
      if (!valid) return;
      scenario.decision.votes.set(client.sessionId, payload.optionId);
      this.maybeResolveVote();
    });

    this.onMessage("clearVote", (client) => {
      const scenario = this.state.currentScenario;
      if (scenario.status !== "active" && scenario.status !== "huddle") return;
      scenario.decision.votes.delete(client.sessionId);
    });

    this.onMessage("retry", (client) => {
      const scenario = this.state.currentScenario;
      if (scenario.status !== "replay") return;
      scenario.decision.votes.clear();
      scenario.status = "active";
      scenario.resultOptionId = "";
      scenario.resolutionBody = "";
      scenario.timer.paused = false;
    });

    this.onMessage("finishSession", (client) => {
      if (this.state.currentScenario.status !== "resolved") return;
      this.state.phase = "complete";
      this.stopTicker();
    });
  }

  async onAuth(_client: Client, _options: JoinOptions) {
    return true;
  }

  onJoin(client: Client, options: JoinOptions = {}) {
    const player = new Player();
    player.id = client.sessionId;
    player.displayName =
      (options.displayName ?? "").trim() || `Player ${this.state.players.size + 1}`;
    player.isConnected = true;
    player.isFacilitator = !!options.isFacilitator;
    if (player.isFacilitator && !this.state.facilitatorId) {
      this.state.facilitatorId = client.sessionId;
    }
    this.state.players.set(client.sessionId, player);
  }

  async onLeave(client: Client, consented: boolean) {
    const player = this.state.players.get(client.sessionId);
    if (!player) return;
    player.isConnected = false;
    if (consented) {
      this.state.players.delete(client.sessionId);
      this.state.currentScenario.decision.votes.delete(client.sessionId);
      return;
    }
    try {
      await this.allowReconnection(client, RECONNECT_SECONDS);
      player.isConnected = true;
    } catch {
      this.state.players.delete(client.sessionId);
      this.state.currentScenario.decision.votes.delete(client.sessionId);
    }
  }

  onDispose() {
    this.stopTicker();
  }

  private startTicker() {
    if (this.tickInterval) return;
    this.tickInterval = setInterval(() => this.tick(), TICK_INTERVAL_MS);
  }

  private stopTicker() {
    if (!this.tickInterval) return;
    clearInterval(this.tickInterval);
    this.tickInterval = undefined;
  }

  private tick() {
    const scenario = this.state.currentScenario;
    if (scenario.status !== "active") return;
    if (scenario.timer.paused) return;
    if (scenario.timer.remainingSeconds <= 0) return;
    scenario.timer.remainingSeconds = Math.max(0, scenario.timer.remainingSeconds - 1);
  }

  private votingPlayers(): Player[] {
    const list: Player[] = [];
    this.state.players.forEach((p) => {
      if (!p.isFacilitator && p.isConnected && p.station) list.push(p);
    });
    return list;
  }

  private maybeResolveVote() {
    const scenario = this.state.currentScenario;
    const voters = this.votingPlayers();
    if (voters.length === 0) return;
    const tally = new Map<string, number>();
    scenario.decision.votes.forEach((optionId, playerId) => {
      if (voters.some((v) => v.id === playerId)) {
        tally.set(optionId, (tally.get(optionId) ?? 0) + 1);
      }
    });
    const needed = Math.floor(voters.length / 2) + 1;
    let chosen: string | undefined;
    tally.forEach((count, optionId) => {
      if (count >= needed) chosen = optionId;
    });
    if (!chosen) return;
    this.resolveDecision(chosen);
  }

  private resolveDecision(optionId: string) {
    const scenario = this.state.currentScenario;
    const option = scenario.decision.options.find((o) => o.id === optionId);
    if (!option) return;
    scenario.resultOptionId = optionId;
    scenario.resolutionBody = POPUP_RESOLUTIONS[optionId] ?? "";
    scenario.timer.paused = true;
    if (option.safe) {
      scenario.status = "resolved";
      const entry = new RedFlagEntry();
      entry.scenarioId = POPUP_REDFLAG.scenarioId;
      entry.title = POPUP_REDFLAG.title;
      entry.lesson = POPUP_REDFLAG.lesson;
      const already = this.state.journal.some((e) => e.scenarioId === entry.scenarioId);
      if (!already) this.state.journal.push(entry);
      scenario.highlightedEvidenceId = "popup_url";
      this.stopTicker();
    } else {
      scenario.status = "replay";
      scenario.highlightedEvidenceId = hintFor(optionId);
    }
  }
}

function hintFor(optionId: string): string {
  switch (optionId) {
    case "call_popup":
      return "popup_url";
    case "click_fix":
      return "popup_flier";
    case "ignore_and_turn_off_tv":
      return "popup_screen";
    default:
      return "popup_flier";
  }
}

function randomCode(): string {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  let out = "";
  for (let i = 0; i < 4; i++) {
    out += letters[Math.floor(Math.random() * letters.length)];
  }
  return out;
}
