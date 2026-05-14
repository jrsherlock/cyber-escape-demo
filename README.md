# cyber-escape-demo

A working demo of **The Wednesday Club**, a cooperative escape room that
teaches scam recognition to older adults. The Pop-Up scenario from §6.1 of the
GDD is implemented end-to-end. The other five scenarios are content-only in
the design doc.

See [`docs/GDD.md`](docs/GDD.md) for the full design.

## Layout

```
.
├── docs/GDD.md      Full game design document
├── server/          Colyseus authoritative game server (TypeScript)
└── web/             Next.js + Tailwind client (App Router)
```

## What's playable

The Pop-Up scenario:

- 2–4 players join a four-letter room code
- Each picks a different station (Screen, Phone, Reference, Journal)
- Each station sees a different piece of evidence — no one can solve it alone
- Anyone can press **Huddle** to pause the timer
- Majority vote chooses the action
- Wrong choice → "what would have happened" rewind with the hint clue highlighted
- Right choice → red flag is written into the shared Red Flag Journal

## Running locally

You'll need Node 20+ in two terminals.

```bash
# Terminal 1: game server
cd server
npm install
npm run dev
# → listening on http://localhost:2567

# Terminal 2: web client
cd web
npm install
npm run dev
# → http://localhost:3000
```

Open `http://localhost:3000`, start a new Wednesday, then open the same room
code in a second browser window to play as a second friend. Pick different
stations on each window and click **Begin Wednesday**.

## Configuration

The web client looks for the server at `localhost:2567` by default. Override
with environment variables in `web/.env.local`:

```
NEXT_PUBLIC_SERVER_HTTP_URL=http://your-host:2567
NEXT_PUBLIC_SERVER_WS_URL=ws://your-host:2567
```

## What's intentionally not built yet

The GDD describes a much larger product. This demo is scoped to prove out the
core multiplayer loop on one scenario. Not yet implemented:

- The other five scenarios (Grandchild, Romance, Government Voice, Inbox, Doorbell)
- Facilitator mode and discussion guide export
- Narrator audio and captions
- Spanish localization
- Reconnection UI (the server-side reconnection window is wired up, but the
  client doesn't yet present a friendly "reconnecting…" screen)
- Persistence (Supabase). Sessions live only in server memory for now.
