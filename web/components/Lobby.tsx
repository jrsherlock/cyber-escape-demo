"use client";

import {
  GameStateView,
  PlayerView,
  STATIONS,
  STATION_DESCRIPTIONS,
  STATION_LABELS,
  Station,
} from "../lib/types";

type Send = (type: string, payload?: unknown) => void;

export function Lobby({
  state,
  me,
  send,
}: {
  state: GameStateView;
  me: PlayerView;
  send: Send;
}) {
  const players = Object.values(state.players).filter((p) => !p.isFacilitator);
  const stationOwners: Partial<Record<Station, PlayerView>> = {};
  players.forEach((p) => {
    if (p.station) stationOwners[p.station as Station] = p;
  });

  const distinctStations = new Set(players.map((p) => p.station).filter(Boolean));
  const canStart = players.length >= 2 && distinctStations.size >= 2;

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="font-display text-3xl">Pick a station</h2>
        <p className="mt-2 text-base text-ink/70">
          Each station sees something different. You'll need to compare notes
          before you decide what Doris should do.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {STATIONS.map((s) => {
            const owner = stationOwners[s];
            const mine = me.station === s;
            const taken = !!owner && owner.id !== me.id;
            return (
              <button
                key={s}
                type="button"
                disabled={taken}
                onClick={() => send("pickStation", { station: s })}
                className={[
                  "min-h-[140px] rounded-2xl border-2 p-5 text-left transition",
                  mine
                    ? "border-mint bg-mint/10"
                    : taken
                      ? "border-ink/10 bg-ink/5 opacity-60"
                      : "border-ink/15 bg-parchment hover:border-mint",
                ].join(" ")}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-2xl">
                    {STATION_LABELS[s]}
                  </span>
                  {mine && (
                    <span className="rounded-full bg-mint px-3 py-1 text-sm text-white">
                      You
                    </span>
                  )}
                  {taken && !mine && (
                    <span className="rounded-full bg-ink/10 px-3 py-1 text-sm">
                      {owner?.displayName}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-base text-ink/80">
                  {STATION_DESCRIPTIONS[s]}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="font-display text-2xl">Friends in the room</h3>
        <ul className="mt-3 flex flex-wrap gap-3">
          {players.map((p) => (
            <li
              key={p.id}
              className="rounded-full bg-parchment px-4 py-2 text-base"
            >
              <span className="font-medium">{p.displayName}</span>
              {p.station && (
                <span className="ml-2 text-ink/60">
                  · {STATION_LABELS[p.station as Station]}
                </span>
              )}
              {!p.isConnected && (
                <span className="ml-2 text-rose">offline</span>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-base text-ink/70">
            {canStart
              ? "Looks good. Whenever the group is ready, begin."
              : "Need at least two people at two different stations to start."}
          </p>
          <button
            type="button"
            disabled={!canStart}
            onClick={() => send("startScenario")}
            className="rounded-xl bg-mint px-6 py-4 text-lg font-medium text-white shadow disabled:opacity-50"
          >
            Begin Wednesday
          </button>
        </div>
      </section>
    </div>
  );
}
