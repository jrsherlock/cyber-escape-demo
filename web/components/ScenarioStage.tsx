"use client";

import { useMemo } from "react";
import {
  GameStateView,
  PlayerView,
  STATION_LABELS,
  Station,
} from "../lib/types";
import { StationView } from "./StationView";
import { VotePanel } from "./VotePanel";
import { ResolutionScreen } from "./ResolutionScreen";

type Send = (type: string, payload?: unknown) => void;

export function ScenarioStage({
  state,
  me,
  sessionId,
  send,
}: {
  state: GameStateView;
  me: PlayerView;
  sessionId: string;
  send: Send;
}) {
  const scenario = state.currentScenario;
  const players = Object.values(state.players).filter((p) => !p.isFacilitator);
  const myStation = me.station as Station | "";

  const myEvidence = useMemo(
    () =>
      Object.values(scenario.evidence).filter(
        (e) => e.visibleToStation === myStation,
      ),
    [scenario.evidence, myStation],
  );

  const voters = players.filter((p) => p.station && p.isConnected);
  const totalVoters = voters.length;
  const voteCounts: Record<string, number> = {};
  Object.entries(scenario.decision.votes).forEach(([, optionId]) => {
    voteCounts[optionId] = (voteCounts[optionId] ?? 0) + 1;
  });
  const myVote = scenario.decision.votes[sessionId] ?? null;

  const inReplayOrResolved =
    scenario.status === "resolved" || scenario.status === "replay";

  return (
    <div className="flex flex-col gap-6">
      <ScenarioHeader scenario={scenario} myStation={myStation} send={send} />

      {!myStation && (
        <div className="rounded-2xl bg-amber/10 p-5 text-base">
          You haven't picked a station yet. Ask another player to pause and head
          back to the lobby, or refresh to pick one.
        </div>
      )}

      {myStation && (
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <header className="mb-4 flex items-baseline justify-between">
            <h2 className="font-display text-2xl">
              Your station: {STATION_LABELS[myStation]}
            </h2>
            <p className="text-sm text-ink/60">
              Only you can see this. Tell the others what you find.
            </p>
          </header>
          <div className="grid gap-4">
            {myEvidence.map((e) => (
              <StationView
                key={e.id}
                evidence={e}
                highlighted={scenario.highlightedEvidenceId === e.id}
              />
            ))}
          </div>
        </section>
      )}

      <PlayerStrip players={players} mySessionId={sessionId} />

      {inReplayOrResolved ? (
        <ResolutionScreen state={state} send={send} />
      ) : (
        <VotePanel
          decision={scenario.decision}
          status={scenario.status}
          myVote={myVote}
          voteCounts={voteCounts}
          totalVoters={totalVoters}
          send={send}
        />
      )}
    </div>
  );
}

function ScenarioHeader({
  scenario,
  myStation,
  send,
}: {
  scenario: GameStateView["currentScenario"];
  myStation: Station | "";
  send: Send;
}) {
  const minutes = Math.floor(scenario.timer.remainingSeconds / 60);
  const seconds = scenario.timer.remainingSeconds % 60;
  const timerStr = `${minutes}:${String(seconds).padStart(2, "0")}`;
  const huddleActive = scenario.status === "huddle";

  return (
    <section className="rounded-2xl bg-ink p-6 text-parchment shadow">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-widest text-amber">
            Scenario · {scenario.title}
          </p>
          <p className="mt-2 font-display text-3xl">{scenario.decision.prompt}</p>
          <p className="mt-3 max-w-2xl text-base text-parchment/80">
            {scenario.intro}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-3">
          <div
            className={[
              "rounded-xl px-4 py-3 font-mono text-3xl",
              scenario.timer.paused ? "bg-amber/30" : "bg-parchment/10",
            ].join(" ")}
            aria-live="polite"
          >
            {timerStr}
          </div>
          {myStation && (scenario.status === "active" || huddleActive) && (
            <button
              type="button"
              onClick={() => send("setHuddle", { paused: !huddleActive })}
              className={[
                "rounded-xl px-5 py-3 text-base font-medium",
                huddleActive
                  ? "bg-amber text-ink"
                  : "bg-parchment text-ink hover:bg-parchment/90",
              ].join(" ")}
            >
              {huddleActive ? "Resume" : "Huddle (pause)"}
            </button>
          )}
        </div>
      </div>
      {huddleActive && (
        <p className="mt-4 rounded-xl bg-amber/20 px-4 py-3 text-base">
          Huddle on. The timer is paused. Take a breath and compare what you
          each see.
        </p>
      )}
    </section>
  );
}

function PlayerStrip({
  players,
  mySessionId,
}: {
  players: PlayerView[];
  mySessionId: string;
}) {
  return (
    <ul className="flex flex-wrap gap-3">
      {players.map((p) => (
        <li
          key={p.id}
          className={[
            "rounded-full px-4 py-2 text-base",
            p.id === mySessionId ? "bg-mint text-white" : "bg-white shadow-sm",
          ].join(" ")}
        >
          <span className="font-medium">{p.displayName}</span>
          {p.station && (
            <span className="ml-2 opacity-80">
              · {STATION_LABELS[p.station as Station]}
            </span>
          )}
          {!p.isConnected && (
            <span className="ml-2 text-rose">offline</span>
          )}
        </li>
      ))}
    </ul>
  );
}
