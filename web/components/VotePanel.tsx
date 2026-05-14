"use client";

import type { DecisionView, ScenarioStatus } from "../lib/types";

type Send = (type: string, payload?: unknown) => void;

export function VotePanel({
  decision,
  status,
  myVote,
  voteCounts,
  totalVoters,
  send,
}: {
  decision: DecisionView;
  status: ScenarioStatus;
  myVote: string | null;
  voteCounts: Record<string, number>;
  totalVoters: number;
  send: Send;
}) {
  if (status !== "active" && status !== "huddle") return null;
  const majority = Math.floor(totalVoters / 2) + 1;

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <header className="mb-4">
        <h2 className="font-display text-2xl">Decide together</h2>
        <p className="mt-1 text-base text-ink/70">
          A majority of {majority} of {totalVoters} chooses the action. You can
          change your vote at any time.
        </p>
      </header>

      <ul className="grid gap-3">
        {decision.options.map((opt) => {
          const count = voteCounts[opt.id] ?? 0;
          const mine = myVote === opt.id;
          return (
            <li key={opt.id}>
              <button
                type="button"
                onClick={() => send("castVote", { optionId: opt.id })}
                className={[
                  "flex w-full flex-col items-start gap-1 rounded-2xl border-2 p-5 text-left transition",
                  mine
                    ? "border-mint bg-mint/10"
                    : "border-ink/15 bg-parchment hover:border-mint",
                ].join(" ")}
              >
                <div className="flex w-full items-baseline justify-between">
                  <span className="text-lg font-medium">{opt.label}</span>
                  <span className="rounded-full bg-ink/10 px-3 py-1 text-sm">
                    {count} / {totalVoters}
                  </span>
                </div>
                {opt.detail && (
                  <span className="text-base text-ink/70">{opt.detail}</span>
                )}
                {mine && (
                  <span className="text-sm text-mint">Your vote</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {myVote && (
        <button
          type="button"
          onClick={() => send("clearVote")}
          className="mt-4 text-base text-ink/60 underline"
        >
          Take back my vote
        </button>
      )}
    </section>
  );
}
