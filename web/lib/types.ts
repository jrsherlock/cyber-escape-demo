export type Station = "screen" | "phone" | "reference" | "journal";

export const STATIONS: Station[] = ["screen", "phone", "reference", "journal"];

export const STATION_LABELS: Record<Station, string> = {
  screen: "Screen",
  phone: "Phone",
  reference: "Reference",
  journal: "Journal",
};

export const STATION_DESCRIPTIONS: Record<Station, string> = {
  screen: "You see what's on the TV and the laptop.",
  phone: "You can make calls and read texts.",
  reference: "You see the browser address bar and trusted help articles.",
  journal: "You hold the Red Flag Journal and a library flier.",
};

export type PlayerView = {
  id: string;
  displayName: string;
  station: Station | "";
  isConnected: boolean;
  isFacilitator: boolean;
};

export type EvidenceView = {
  id: string;
  visibleToStation: Station;
  kind: string;
  title: string;
  body: string;
  revealed: boolean;
};

export type OptionView = {
  id: string;
  label: string;
  detail: string;
  safe: boolean;
};

export type DecisionView = {
  prompt: string;
  options: OptionView[];
  votes: Record<string, string>;
};

export type TimerView = {
  totalSeconds: number;
  remainingSeconds: number;
  paused: boolean;
};

export type ScenarioStatus = "intro" | "active" | "huddle" | "resolved" | "replay";

export type ScenarioView = {
  id: string;
  title: string;
  intro: string;
  status: ScenarioStatus;
  resultOptionId: string;
  resolutionBody: string;
  highlightedEvidenceId: string;
  evidence: Record<string, EvidenceView>;
  decision: DecisionView;
  timer: TimerView;
};

export type RedFlagEntryView = {
  scenarioId: string;
  title: string;
  lesson: string;
};

export type GameStateView = {
  code: string;
  createdAt: string;
  facilitatorId: string;
  phase: "lobby" | "scenario" | "complete";
  players: Record<string, PlayerView>;
  currentScenario: ScenarioView;
  journal: RedFlagEntryView[];
};
