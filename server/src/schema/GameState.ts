import { Schema, MapSchema, ArraySchema, type } from "@colyseus/schema";

export const STATIONS = ["screen", "phone", "reference", "journal"] as const;
export type Station = (typeof STATIONS)[number];

export class Player extends Schema {
  @type("string") id = "";
  @type("string") displayName = "";
  @type("string") station = "";
  @type("boolean") isConnected = true;
  @type("boolean") isFacilitator = false;
}

export class Evidence extends Schema {
  @type("string") id = "";
  @type("string") visibleToStation = "";
  @type("string") title = "";
  @type("string") body = "";
  @type("string") kind = "";
  @type("boolean") revealed = false;
}

export class Option extends Schema {
  @type("string") id = "";
  @type("string") label = "";
  @type("string") detail = "";
  @type("boolean") safe = false;
}

export class Decision extends Schema {
  @type("string") prompt = "";
  @type([Option]) options = new ArraySchema<Option>();
  @type({ map: "string" }) votes = new MapSchema<string>();
}

export class Timer extends Schema {
  @type("number") totalSeconds = 300;
  @type("number") remainingSeconds = 300;
  @type("boolean") paused = false;
}

export class Scenario extends Schema {
  @type("string") id = "";
  @type("string") title = "";
  @type("string") intro = "";
  @type("string") status = "intro";
  @type("string") resultOptionId = "";
  @type("string") resolutionBody = "";
  @type("string") highlightedEvidenceId = "";
  @type({ map: Evidence }) evidence = new MapSchema<Evidence>();
  @type(Decision) decision = new Decision();
  @type(Timer) timer = new Timer();
}

export class RedFlagEntry extends Schema {
  @type("string") scenarioId = "";
  @type("string") title = "";
  @type("string") lesson = "";
}

export class GameState extends Schema {
  @type("string") code = "";
  @type("string") createdAt = "";
  @type("string") facilitatorId = "";
  @type("string") phase = "lobby";
  @type({ map: Player }) players = new MapSchema<Player>();
  @type(Scenario) currentScenario = new Scenario();
  @type([RedFlagEntry]) journal = new ArraySchema<RedFlagEntry>();
}
