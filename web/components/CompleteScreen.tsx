"use client";

import Link from "next/link";
import type { GameStateView } from "../lib/types";

export function CompleteScreen({ state }: { state: GameStateView }) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm">
      <p className="text-sm uppercase tracking-widest text-mint">
        Wednesday is over
      </p>
      <h2 className="mt-1 font-display text-4xl">
        Doris is fine. The coffee is still warm.
      </h2>
      <p className="mt-4 text-lg text-ink/80">
        You and your friends turned away a scam today. Here's what you wrote in
        the Red Flag Journal:
      </p>

      <ul className="mt-6 space-y-4">
        {state.journal.map((entry, idx) => (
          <li
            key={`${entry.scenarioId}-${idx}`}
            className="rounded-2xl border-2 border-amber/40 bg-parchment p-5"
          >
            <p className="text-lg font-medium">{entry.title}</p>
            <p className="mt-2 text-base text-ink/80">{entry.lesson}</p>
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="mt-8 inline-block rounded-xl bg-ink px-6 py-4 text-lg font-medium text-parchment"
      >
        Back to the start
      </Link>
    </section>
  );
}
