import { ArraySchema, MapSchema } from "@colyseus/schema";
import { Decision, Evidence, Option, Scenario, Timer } from "../schema/GameState";

export function buildPopupScenario(): Scenario {
  const scenario = new Scenario();
  scenario.id = "popup";
  scenario.title = "The Pop-Up";
  scenario.intro =
    "It's Wednesday at Doris's house. The news is on. Suddenly the TV freezes and a red alert fills the screen. A voice is yelling. Everyone, take a look at your station.";
  scenario.status = "intro";

  const evidence = new MapSchema<Evidence>();

  const screen = new Evidence();
  screen.id = "popup_screen";
  screen.visibleToStation = "screen";
  screen.kind = "popup";
  screen.title = "What the screen says";
  screen.body =
    "!! SECURITY ALERT !! Your computer has been infected with 5 viruses. Your bank passwords are exposed. DO NOT TURN OFF YOUR COMPUTER. Call Microsoft Support immediately: 1-800-555-FIXX. A countdown timer is ticking from 03:00. A loud siren plays.";
  evidence.set(screen.id, screen);

  const phone = new Evidence();
  phone.id = "popup_phone";
  phone.visibleToStation = "phone";
  phone.kind = "contacts";
  phone.title = "Doris's contacts list";
  phone.body =
    "Granddaughter Maya (she works in IT) — 319-555-0144.\nReal Microsoft Support, from microsoft.com/help — 1-800-MICROSOFT.\nThe number on the pop-up — 1-800-555-3499.\nYou can place a call from this station.";
  evidence.set(phone.id, phone);

  const reference = new Evidence();
  reference.id = "popup_url";
  reference.visibleToStation = "reference";
  reference.kind = "browser";
  reference.title = "The browser address bar";
  reference.body =
    "The pop-up is sitting on a page at:\n\nhttps://totally-not-microsoft-security[.]xyz/alert?id=8821\n\nNot microsoft.com. Not windows.com. A long, strange .xyz address.";
  evidence.set(reference.id, reference);

  const journal = new Evidence();
  journal.id = "popup_flier";
  journal.visibleToStation = "journal";
  journal.kind = "reference";
  journal.title = "Library flier on the kitchen table";
  journal.body =
    "FROM THE IOWA CITY PUBLIC LIBRARY — Spotting Tech Support Scams.\n\n• Microsoft, Apple, and Google will NEVER show a phone number in a security alert.\n• Real warnings never include a countdown timer or a loud voice.\n• If you see one of these: close the browser. If you can't, hold the power button. Then call someone you trust.";
  evidence.set(journal.id, journal);

  scenario.evidence = evidence;

  const decision = new Decision();
  decision.prompt = "What should Doris do?";
  const options = new ArraySchema<Option>();

  const optA = new Option();
  optA.id = "call_popup";
  optA.label = "Call the number on the pop-up";
  optA.detail = "It says it's Microsoft Support.";
  optA.safe = false;
  options.push(optA);

  const optB = new Option();
  optB.id = "click_fix";
  optB.label = "Click the \"Fix Now\" button on the pop-up";
  optB.detail = "Let it scan the computer.";
  optB.safe = false;
  options.push(optB);

  const optC = new Option();
  optC.id = "close_and_call_maya";
  optC.label = "Close the browser and call Maya, the granddaughter who knows tech";
  optC.detail = "Use the number on the fridge, not the one on the screen.";
  optC.safe = true;
  options.push(optC);

  const optD = new Option();
  optD.id = "ignore_and_turn_off_tv";
  optD.label = "Just turn off the TV and ignore it";
  optD.detail = "It's the TV's problem, not the computer's.";
  optD.safe = false;
  options.push(optD);

  decision.options = options;
  scenario.decision = decision;

  const timer = new Timer();
  timer.totalSeconds = 300;
  timer.remainingSeconds = 300;
  timer.paused = false;
  scenario.timer = timer;

  return scenario;
}

export const POPUP_REDFLAG = {
  scenarioId: "popup",
  title: "Pop-ups with phone numbers are scams.",
  lesson:
    "Microsoft, Apple, and Google never display a phone number in a security warning. Close the browser. Call someone you trust, using a number you already have.",
};

export const POPUP_RESOLUTIONS: Record<string, string> = {
  call_popup:
    "If Doris had called that number, the \"support agent\" would have asked her to install remote-access software, then watched while she logged into her bank. By the end of the call she'd be helping them empty her own checking account. Let's rewind and try again — this time, look at where the address bar is really pointing.",
  click_fix:
    "If Doris had clicked Fix Now, the page would have downloaded a real piece of malware onto her computer — the kind that watches every keystroke. Let's rewind. Read the library flier on the kitchen table out loud to each other.",
  ignore_and_turn_off_tv:
    "Close, but the pop-up isn't on the TV — it's on the laptop sitting next to it. Turning off the TV won't stop it. Let's rewind. Look again at which device is making the noise.",
  close_and_call_maya:
    "Maya picks up. She tells Doris exactly what the library flier said — close the browser, no real warning ever has a phone number. She offers to come over after work to double-check the computer is fine. The pop-up is gone. The coffee is still warm. Wednesday Club continues.",
};
