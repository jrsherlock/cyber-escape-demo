import { Server, matchMaker } from "@colyseus/core";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { monitor } from "@colyseus/monitor";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { WednesdayRoom } from "./rooms/WednesdayRoom";

const PORT = Number(process.env.PORT ?? 2567);

async function main() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const httpServer = createServer(app);
  const gameServer = new Server({
    transport: new WebSocketTransport({ server: httpServer }),
  });

  gameServer.define("wednesday", WednesdayRoom).filterBy(["code"]);

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.post("/rooms", async (req, res) => {
    try {
      const code = generateCode();
      const room = await matchMaker.createRoom("wednesday", { code });
      res.json({ code, roomId: room.roomId });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  app.get("/rooms/:code", async (req, res) => {
    const code = String(req.params.code).toUpperCase();
    const rooms = await matchMaker.query({ name: "wednesday", code });
    if (rooms.length === 0) {
      res.status(404).json({ error: "not_found" });
      return;
    }
    res.json({ code, roomId: rooms[0].roomId });
  });

  app.use("/colyseus", monitor());

  await new Promise<void>((resolve) => httpServer.listen(PORT, resolve));
  console.log(`[wednesday-club] listening on http://localhost:${PORT}`);
}

function generateCode(): string {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  let out = "";
  for (let i = 0; i < 4; i++) {
    out += letters[Math.floor(Math.random() * letters.length)];
  }
  return out;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
