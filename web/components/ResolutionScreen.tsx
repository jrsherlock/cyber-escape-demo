"use client";

import type { GameStateView } from "../lib/types";

type Send = (type: string, payload?: unknown) => void;

export function ResolutionScreen({
  state,
  send,
}: {
  state: GameStateView;
  send: Send;
}) {
  const scenario = state.currentScenario;
  const safe = scenario.status === "resolved";
  const option = scenario.decision.options.find(
    (o) => o.id === scenario.resultOptionId,
  );

  return (
    <section
      className={[
        "rounded-2xl p-6 shadow",
        safe ? "bg-mint/10 border-2 border-mint" : "bg-rose/10 border-2 border-rose",
      ].join(" ")}
    >
      <p className="text-sm uppercase tracking-widest">
        {safe ? "Safe choice" : "Let's rewind"}
      </p>
      <h2 className="mt-1 font-display text-3xl">
        {safe ? "Doris is okay." : "That would have gone badly."}
      </h2>
      {option && (
        <p className="mt-2 text-base text-ink/70">
          The group chose: <span className="font-medium">{option.label}</span>
        </p>
      )}
      <p className="mt-4 whitespace-pre-line text-lg text-ink/90">
        {scenario.resolutionBody}
      </p>

      {safe ? (
        <>
          <Journal state={state} />
          <button
            type="button"
            onClick={() => send("finishSession")}
            className="mt-6 rounded-xl bg-mint px-6 py-4 text-lg font-medium text-white"
          >
            Finish the session
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => send("retry")}
          className="mt-6 rounded-xl bg-ink px-6 py-4 text-lg font-medium text-parchment"
        >
          Rewind and try again
        </button>
      )}
    </section>
  );
}

function Journal({ state }: { state: GameStateView }) {
  if (state.journal.length === 0) return null;
  return (
    <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
      <h3 className="font-display text-2xl">Red Flag Journal</h3>
      <ul className="mt-3 space-y-3">
        {state.journal.map((entry, idx) => (
          <li key={`${entry.scenarioId}-${idx}`} className="border-l-4 border-amber pl-4">
            <p className="text-base font-medium">{entry.title}</p>
            <p className="text-base text-ink/70">{entry.lesson}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
