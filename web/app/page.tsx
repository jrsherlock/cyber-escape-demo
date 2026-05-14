"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createRoom } from "../lib/useRoom";

export default function HomePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function go(c: string) {
    const trimmed = c.trim().toUpperCase();
    const cleanName = name.trim() || "Friend";
    if (!/^[A-Z]{4}$/.test(trimmed)) {
      setError("Room codes are four letters, like ABCD.");
      return;
    }
    sessionStorage.setItem("wc:displayName", cleanName);
    router.push(`/room/${trimmed}`);
  }

  async function onCreate() {
    setBusy(true);
    setError(null);
    try {
      const { code: created } = await createRoom();
      go(created);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  function onJoin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    go(code);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 px-6 py-12">
      <header className="flex flex-col gap-2">
        <p className="text-base uppercase tracking-widest text-mint">
          A Cybercade Escape Room
        </p>
        <h1 className="font-display text-5xl text-ink">The Wednesday Club</h1>
        <p className="text-lg text-ink/80">
          You and your friends are spending Wednesday at Doris's house. Things
          are about to get strange. Work together. Compare what you see. Decide
          what Doris should do.
        </p>
      </header>

      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <label className="block text-lg font-medium" htmlFor="name">
          Your name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Doris, Maya, anyone"
          className="mt-2 w-full rounded-xl border border-ink/20 bg-parchment px-4 py-3 text-lg"
          autoComplete="given-name"
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">Start a new room</h2>
            <p className="mt-2 text-base text-ink/70">
              You'll get a four-letter code to share with your friends.
            </p>
            <button
              type="button"
              onClick={onCreate}
              disabled={busy}
              className="mt-4 w-full rounded-xl bg-mint px-6 py-4 text-lg font-medium text-white shadow disabled:opacity-60"
            >
              {busy ? "Setting up…" : "Start a new Wednesday"}
            </button>
          </div>

          <form onSubmit={onJoin}>
            <h2 className="font-display text-2xl">Join a room</h2>
            <p className="mt-2 text-base text-ink/70">
              Type the four-letter code your friend gave you.
            </p>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="ABCD"
              maxLength={4}
              className="mt-4 w-full rounded-xl border border-ink/20 bg-parchment px-4 py-4 text-center text-3xl uppercase tracking-[0.5em]"
              autoComplete="off"
              inputMode="text"
            />
            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-ink px-6 py-4 text-lg font-medium text-parchment shadow"
            >
              Join
            </button>
          </form>
        </div>

        {error && (
          <p className="mt-6 rounded-xl bg-rose/10 px-4 py-3 text-base text-rose">
            {error}
          </p>
        )}
      </section>

      <footer className="text-sm text-ink/60">
        This is a demo of the Pop-Up scenario. No real scam recordings are used.
      </footer>
    </main>
  );
}
