"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GameRoom } from "../../../components/GameRoom";

export default function RoomPage({ params }: { params: { code: string } }) {
  const code = params.code.toUpperCase();
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("wc:displayName");
    setName(stored && stored.trim() ? stored.trim() : "Friend");
  }, []);

  if (name === null) {
    return (
      <main className="mx-auto max-w-xl px-6 py-12 text-lg">Loading…</main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-6 md:px-8 md:py-10">
      <header className="mb-6 flex items-baseline justify-between">
        <Link
          href="/"
          className="text-sm uppercase tracking-widest text-mint hover:underline"
        >
          ← The Wednesday Club
        </Link>
        <p className="font-display text-2xl">
          Room <span className="tracking-[0.4em]">{code}</span>
        </p>
      </header>

      <GameRoom code={code} displayName={name} />
    </main>
  );
}
