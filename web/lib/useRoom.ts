"use client";

import { Client, Room } from "colyseus.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SERVER_HTTP_URL, SERVER_WS_URL } from "./config";
import type { GameStateView, ScenarioStatus, Station } from "./types";

type RoomBundle = {
  client: Client;
  room: Room;
};

function toPlainState(state: any): GameStateView {
  const players: GameStateView["players"] = {};
  state.players?.forEach?.((p: any, key: string) => {
    players[key] = {
      id: p.id,
      displayName: p.displayName,
      station: (p.station || "") as Station | "",
      isConnected: p.isConnected,
      isFacilitator: p.isFacilitator,
    };
  });

  const evidence: GameStateView["currentScenario"]["evidence"] = {};
  state.currentScenario?.evidence?.forEach?.((e: any, key: string) => {
    evidence[key] = {
      id: e.id,
      visibleToStation: e.visibleToStation as Station,
      kind: e.kind,
      title: e.title,
      body: e.body,
      revealed: e.revealed,
    };
  });

  const votes: Record<string, string> = {};
  state.currentScenario?.decision?.votes?.forEach?.(
    (optionId: string, playerId: string) => {
      votes[playerId] = optionId;
    },
  );

  const options =
    state.currentScenario?.decision?.options?.map?.((o: any) => ({
      id: o.id,
      label: o.label,
      detail: o.detail,
      safe: o.safe,
    })) ?? [];

  const journal =
    state.journal?.map?.((entry: any) => ({
      scenarioId: entry.scenarioId,
      title: entry.title,
      lesson: entry.lesson,
    })) ?? [];

  return {
    code: state.code ?? "",
    createdAt: state.createdAt ?? "",
    facilitatorId: state.facilitatorId ?? "",
    phase: (state.phase ?? "lobby") as GameStateView["phase"],
    players,
    journal,
    currentScenario: {
      id: state.currentScenario?.id ?? "",
      title: state.currentScenario?.title ?? "",
      intro: state.currentScenario?.intro ?? "",
      status: (state.currentScenario?.status ?? "intro") as ScenarioStatus,
      resultOptionId: state.currentScenario?.resultOptionId ?? "",
      resolutionBody: state.currentScenario?.resolutionBody ?? "",
      highlightedEvidenceId: state.currentScenario?.highlightedEvidenceId ?? "",
      evidence,
      decision: {
        prompt: state.currentScenario?.decision?.prompt ?? "",
        options,
        votes,
      },
      timer: {
        totalSeconds: state.currentScenario?.timer?.totalSeconds ?? 0,
        remainingSeconds: state.currentScenario?.timer?.remainingSeconds ?? 0,
        paused: state.currentScenario?.timer?.paused ?? false,
      },
    },
  };
}

export async function createRoom(): Promise<{ code: string }> {
  const res = await fetch(`${SERVER_HTTP_URL}/rooms`, { method: "POST" });
  if (!res.ok) throw new Error("Could not create a room.");
  return res.json();
}

export function useRoom(code: string | null, displayName: string) {
  const [state, setState] = useState<GameStateView | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>("");
  const bundleRef = useRef<RoomBundle | null>(null);

  useEffect(() => {
    if (!code) return;
    let cancelled = false;
    const client = new Client(SERVER_WS_URL);

    (async () => {
      try {
        const room = await client.joinOrCreate("wednesday", {
          code: code.toUpperCase(),
          displayName,
        });
        if (cancelled) {
          room.leave();
          return;
        }
        bundleRef.current = { client, room };
        setSessionId(room.sessionId);
        setState(toPlainState(room.state));
        room.onStateChange((next) => {
          setState(toPlainState(next));
        });
        room.onError((_code, message) => {
          setError(message ?? "Room error");
        });
        room.onLeave(() => {
          bundleRef.current = null;
        });
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      }
    })();

    return () => {
      cancelled = true;
      const bundle = bundleRef.current;
      bundleRef.current = null;
      bundle?.room.leave().catch(() => {});
    };
  }, [code, displayName]);

  const send = useCallback((type: string, payload?: unknown) => {
    bundleRef.current?.room.send(type, payload as any);
  }, []);

  const me = useMemo(() => {
    if (!state || !sessionId) return null;
    return state.players[sessionId] ?? null;
  }, [state, sessionId]);

  return { state, error, sessionId, me, send };
}
