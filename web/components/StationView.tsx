"use client";

import type { EvidenceView } from "../lib/types";

export function StationView({
  evidence,
  highlighted,
}: {
  evidence: EvidenceView;
  highlighted: boolean;
}) {
  const kind = evidence.kind;
  const tone =
    kind === "popup"
      ? "border-rose bg-rose/5"
      : kind === "browser"
        ? "border-amber bg-amber/5"
        : kind === "reference"
          ? "border-mint bg-mint/5"
          : "border-ink/15 bg-parchment";

  return (
    <article
      className={[
        "rounded-2xl border-2 p-5 transition",
        tone,
        highlighted ? "ring-4 ring-amber" : "",
      ].join(" ")}
    >
      <header className="flex items-baseline justify-between">
        <h3 className="font-display text-xl">{evidence.title}</h3>
        {highlighted && (
          <span className="rounded-full bg-amber px-3 py-1 text-sm text-ink">
            Look here
          </span>
        )}
      </header>
      <p className="mt-2 whitespace-pre-line text-base text-ink/90">
        {evidence.body}
      </p>
    </article>
  );
}
