"use client";

import { useRoom } from "../lib/useRoom";
import { Lobby } from "./Lobby";
import { ScenarioStage } from "./ScenarioStage";
import { CompleteScreen } from "./CompleteScreen";

export function GameRoom({
  code,
  displayName,
}: {
  code: string;
  displayName: string;
}) {
  const { state, error, sessionId, me, send } = useRoom(code, displayName);

  if (error) {
    return (
      <div className="rounded-2xl bg-rose/10 p-6 text-rose">
        <p className="text-lg font-medium">We couldn't connect to the room.</p>
        <p className="mt-2 text-base">{error}</p>
        <p className="mt-4 text-base">
          Check that the server is running and the room code is correct.
        </p>
      </div>
    );
  }

  if (!state || !me) {
    return (
      <div className="rounded-2xl bg-white p-6 text-lg shadow-sm">
        Connecting to room {code}…
      </div>
    );
  }

  if (state.phase === "lobby") {
    return <Lobby state={state} me={me} send={send} />;
  }

  if (state.phase === "complete") {
    return <CompleteScreen state={state} />;
  }

  return <ScenarioStage state={state} me={me} sessionId={sessionId} send={send} />;
}
