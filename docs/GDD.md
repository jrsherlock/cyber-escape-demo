# The Wednesday Club

## A Cybercade Escape Room GDD

---

## 1. Pitch

Two to six players, working together, navigate a single afternoon in the life of an older adult under scam pressure. Each player sees a different part of the picture (the phone, the email inbox, the front door, the bank statement, the TV). To "escape" each room, they must compare notes, spot the red flags, and collectively choose the safe action before the timer runs out. The game teaches recognition patterns by making them muscle memory.

Built on Cybercade's existing Colyseus multiplayer foundation. Designed first for senior centers, libraries, family game nights, and corporate elder-care benefits programs.

## 2. Audience and Use Cases

**Primary**: adults 60+, the statistically dominant scam-loss demographic per FTC Consumer Sentinel and FBI IC3 data.
**Secondary**: families playing intergenerationally, especially adult children wanting to coach parents without lecturing.
**Tertiary**: community organizations (senior centers, libraries, AARP chapters) and corporate benefits programs offering financial-elder-fraud training.

Use cases:

- 30 to 45 minute facilitated sessions at senior centers
- 15 minute single-room drop-ins at libraries
- Family game night (Thanksgiving, holidays)
- Caregiver-led one-on-one sessions

## 3. Design Pillars

1. **Dignity over warnings.** Players are heroes, not victims-in-waiting. Scams are puzzles to solve, not failures to avoid.
2. **Recognition over recall.** The goal is not memorizing rules. It is teaching the body the feeling of "wait, something is off here."
3. **Collaboration as defense.** The game models the real-world defense pattern: when something feels wrong, call a trusted person before acting.
4. **Calm tempo.** No twitch mechanics. Timers exist but are forgiving (3 to 5 minute decision windows, never seconds).
5. **No fail state.** Wrong choices trigger a graceful "this is what would have happened" cinematic, then return players to the decision. Shame is the enemy of learning.

## 4. Setting and Narrative

The **Wednesday Club** is a fictional group of friends who meet every Wednesday at Doris's house for coffee. One Wednesday, the day goes sideways. The phone rings. The TV throws up a strange pop-up. There is a knock at the door. A grandchild texts in a panic. Each member of the club has to help the others, and by the end of the day they have collectively turned away every scam attempt.

Players inhabit members of the club. Each session is one Wednesday. The narrative wrapper is warm, slightly comedic, and respectful. Tonally inspired by *Only Murders in the Building* and *Grace and Frankie*, not by infomercial fear appeals.

## 5. Core Loop

1. **Stimulus**: a scam vector arrives (phone call, email, doorbell, pop-up, text).
2. **Discovery**: each player sees a different piece of evidence on their station.
3. **Huddle**: players talk (voice or built-in chat) and compare what they see.
4. **Decision**: the group votes on an action. Consensus required.
5. **Resolution**: safe action closes the scenario with a brief "what they were after" reveal. Unsafe action triggers a "what would have happened" cinematic, then a retry.
6. **Journal**: the red flag is logged in the shared Red Flag Journal, which players keep at session end.

Average scenario length: 5 to 8 minutes. Full session: 30 to 45 minutes across 4 to 6 scenarios.

## 6. Scenarios (MVP set of six)

### 6.1 The Pop-Up

**Stimulus**: Doris is watching the news. The screen freezes. A loud Windows-Defender-style pop-up appears with a phone number and a voice yelling that her computer has been hacked.
**Asymmetric clues**: one player sees the pop-up text, one sees the actual address bar URL, one sees the real Microsoft support page on their tablet, one sees a printed flier from the library about tech support scams.
**Red flag taught**: tech support pop-ups with phone numbers are always fake. Real OS warnings never include a phone number.

### 6.2 The Grandchild

**Stimulus**: a text from "Grandma it's me, I lost my phone and I'm in jail, please don't tell mom and dad, I need bail money."
**Asymmetric clues**: one player sees the text, one sees the unfamiliar phone number, one can "call" the real grandchild who answers normally, one sees a sticky note on the fridge with all family phone numbers.
**Red flag taught**: emergency plus secrecy plus untraceable payment is the signature of the grandparent scam. Verify through a known number, always.

### 6.3 The Romance

**Stimulus**: an online friend of six months, met in a widows' support group, has finally asked for money. His daughter is sick. He cannot access his accounts because he is on an oil rig.
**Asymmetric clues**: one player reads the messages, one sees the reverse image search of the "boyfriend's" photo (it is a Spanish actor), one sees his pattern of always being unable to video call, one sees a public list of common romance scam scripts.
**Red flag taught**: cannot video, always overseas, eventual money ask. Reverse image search is a superpower.

### 6.4 The Government Voice

**Stimulus**: a robocall claiming to be Social Security, threatening that her number will be "suspended" unless she presses 1.
**Asymmetric clues**: one hears the call, one sees the SSA's actual policy page ("we will never call to threaten you"), one sees a list of payment methods being demanded (gift cards), one sees the caller ID spoofing explainer.
**Red flag taught**: government agencies do not threaten by phone, do not demand gift cards, do not "suspend" your SSN.

### 6.5 The Inbox

**Stimulus**: three emails arrive in quick succession. One from "Amazon" about an unauthorized $899 order, one from her real bank, one from a Nigerian prince variant updated for 2026 (crypto investment opportunity).
**Asymmetric clues**: each player sees one email in detail. They must compare sender addresses, link destinations (hover, do not click), and tone. The real bank email is the only legitimate one.
**Red flag taught**: legitimate sender domains, link hovering, urgency as a manipulation tactic.

### 6.6 The Doorbell

**Stimulus**: a man at the door says he is from the water company and needs to check her pipes because of a contamination issue on the street.
**Asymmetric clues**: one player sees through the peephole and notices no marked truck, one player can call the real water company, one player remembers (via a journal entry) that the city sends written notices for service visits, one player sees the man's body language on the doorbell camera.
**Red flag taught**: unannounced utility visits, distraction burglary, verify before opening.

**Stretch scenarios for post-MVP**: Medicare card phishing, QR code menu swap, fake check overpayment, charity scam after a disaster, deepfake voice clone of a family member.

## 7. Player Roles

Roles are soft. Every player can do everything, but each starts at a "station" with privileged information. Stations rotate between scenarios so no player gets bored or stuck in one lane.

- **Phone**: receives calls and texts.
- **Screen**: sees the TV, the laptop pop-ups, the email inbox.
- **Door**: sees the doorbell camera, peephole, mail slot.
- **Reference**: has access to the Red Flag Journal, the trusted contacts list, and the ability to "look things up."
- **Family** (optional fifth and sixth station for intergenerational sessions): a grandchild or adult child plays a coaching role. Can give one hint per scenario. Cannot vote. This protects the agency of older players while keeping younger ones engaged.

## 8. Mechanics

### 8.1 Asymmetric Information

The most important mechanic. Every player sees a different piece of the truth. No single player can solve a scenario alone. This models the real-world defense pattern: get a second opinion before acting.

### 8.2 The Huddle Button

Any player can press Huddle at any time. This pauses all timers, dims the scenario visually, and brings up a shared "what do we know" board. Encourages the habit of pausing under pressure.

### 8.3 Consensus Action

Decisions require a majority vote (3 of 4, or 4 of 5, depending on table size). No single player can take a harmful action. This is the digital equivalent of "let me check with my daughter first."

### 8.4 The Red Flag Journal

A shared, persistent artifact. Every red flag the group identifies gets added with a one-line description. At session end, players can print or email themselves the journal. This is the takeaway artifact, and it doubles as marketing (every journal is co-branded with Cybercade and the facility).

### 8.5 The "Call Back" Rule

A recurring meta-rule. Any time the players are pressured to act, hanging up and calling the verified number always works. The game rewards this with shorter, cleaner resolutions. By scenario four, players have internalized the rule.

### 8.6 Replay-on-Mistake

If the group makes the unsafe choice, they see a brief, non-scary cinematic of "what the scammer wanted." Then the scenario rewinds with one extra clue highlighted. No score penalty, no shame.

## 9. UX and Accessibility

### 9.1 Visual

- Default font size 20pt, one-tap zoom to 28pt.
- WCAG AAA color contrast.
- All UI elements at least 60x60px tap targets.
- High-contrast mode and color-blind palettes available from main menu, no submenu hunt.
- Animations slow by default (300ms minimum on transitions). Option to disable motion entirely.

### 9.2 Audio

- All text is also read aloud by a warm, slow narrator (think NPR weekend voice).
- Closed captions on every audio element, including scam call audio.
- Volume controls per audio channel (narrator, scam character, ambient).

### 9.3 Input

- Tablet-first design. Mouse and keyboard supported but secondary.
- No drag-and-drop. All actions are taps or clicks.
- Multi-tap forgiveness (300ms debounce).
- No timers under five minutes. No actions requiring fine motor precision.

### 9.4 Cognitive Load

- One decision at a time, never branching trees.
- The current goal is always visible at the top of the screen in plain language ("Decide: should Doris press 1?").
- Help button on every screen, opens a contextual hint, not a manual.

### 9.5 Facilitator Mode

A dedicated mode for senior center staff, librarians, and caregivers. The facilitator sees an overview screen with all stations, can pause for the room, can inject hints, and gets a printable post-game discussion guide.

## 10. Multiplayer Architecture (Colyseus)

### 10.1 Room Topology

- One Colyseus room per game session.
- Capacity 2 to 6 players plus optional facilitator (observer role).
- Server is authoritative for all puzzle state, evidence reveals, vote tallies, and scenario transitions. Clients render and submit intents, nothing more.
- Join via 4-letter friendly code (no random matchmaking, ever). Codes are spoken aloud at senior centers and written on whiteboards.

### 10.2 State Schema (Colyseus @colyseus/schema)

```
GameRoom
├── sessionId, code, createdAt, facilitatorId
├── players: MapSchema<Player>
│   └── Player: { id, displayName, station, isConnected, isFacilitator }
├── currentScenario: Scenario
│   ├── id, title, status (active | huddle | resolved | replay)
│   ├── evidence: MapSchema<Evidence>
│   │   └── Evidence: { id, visibleToStation, revealed, content }
│   ├── decision: Decision
│   │   ├── prompt, options: ArraySchema<Option>
│   │   └── votes: MapSchema<PlayerId, OptionId>
│   └── timer: { totalSeconds, remainingSeconds, paused }
├── journal: ArraySchema<RedFlagEntry>
└── progress: { scenariosCompleted, currentIndex, totalCount }
```

### 10.3 Server-Authoritative Validation

Every player intent is validated server-side before state mutation:

- Vote intents check the player is in the room and the scenario is in a votable state.
- Evidence reveal intents check the requesting player owns that station.
- Huddle pause is a room-level mutation, any player can trigger, server enforces idempotency.

This matters not just for game integrity but for the eventual leaderboard and outcomes data sold back to corporate buyers (anonymized aggregate metrics on "which scams were hardest to spot").

### 10.4 Reconnection

Older players will close tablet lids, lose Wi-Fi, hand the device to a grandchild and back. Reconnection window is 5 minutes. State, station, and votes are preserved server-side. Players rejoin where they left off.

### 10.5 Voice Chat

**Phase 1**: out of band. Players in the same room (senior center setting) just talk. Family game night uses FaceTime or speakerphone.
**Phase 2**: integrated WebRTC for remote families, brokered through Daily.co or Twilio. Colyseus signals room membership, WebRTC handles media.

## 11. Tech Stack

- **Frontend**: Next.js with React, Tailwind for styling, framer-motion for the gentle animations. Existing Cybercade patterns reused where possible.
- **Realtime**: Colyseus, hosted on the existing Cybercade infrastructure.
- **State persistence**: Supabase (sessions, journals, completion data, anonymized analytics).
- **Audio**: pre-recorded narration in MP3, served from CDN. Scam call audio is synthesized via ElevenLabs from scripted dialogue with proper licensing. No real scam recordings used.
- **Auth**: optional. Drop-in mode requires no account. Family mode supports magic-link email login.

## 12. Educational Outcomes

Each session produces:

- A populated Red Flag Journal (the player artifact).
- An anonymized session record (for aggregate research and corporate buyer reporting).
- A printable family discussion guide ("here is what we learned today, here is who to call if it happens for real").

Measurable outcomes for pilot evaluation:

- Pre/post quiz: recognition of common scam patterns.
- Six-month follow-up: self-reported encounters and outcomes.
- Partner with a gerontology research program (the University of Iowa is well-positioned through Tippie and the College of Public Health) for a formal efficacy study post-MVP.

## 13. Distribution and Business Model

Three channels, in priority order:

1. **Direct to senior centers and libraries**: site license, annual fee per facility, includes facilitator training and printed materials.
2. **Corporate elder-care benefits**: companies offering this as a benefit to employees with aging parents. Higher ASP, includes family mode and remote-play features.
3. **AARP and Area Agency on Aging partnerships**: co-branded distribution at scale.

**Free tier**: a single demo room (the Pop-Up scenario), playable solo or with one other player, no facilitator features. Designed for word-of-mouth and at-event demos.

## 14. MVP Scope

Six scenarios, four player stations, no voice chat integration (Phase 2), tablet-first responsive design, facilitator mode, Red Flag Journal export, two language localizations (English, Spanish). Target build: 12 to 16 weeks with a small team (2 engineers, 1 designer, 1 educator/content lead, narrator and voice talent contracted).

## 15. Risks and Open Questions

- **Tone risk**: any whiff of condescension destroys the product. Real older-adult playtesters from week one are non-negotiable.
- **Tech accessibility**: tablets at senior centers are inconsistent. May need to ship loaner kits for some pilots.
- **Scam realism vs. trauma**: the "what would have happened" cinematics must be informative without being frightening. Test heavily.
- **Localization beyond Spanish**: Mandarin, Vietnamese, Russian, Tagalog all have strong cases. Sequence based on senior center partner demographics.
- **Liability**: clear disclaimer that this is education, not a guarantee. Real scam losses still need real reporting channels (IC3, FTC, local PD).

## 16. Roadmap

- **Phase 1 (weeks 1 to 16)**: MVP build, 3 pilot sites in Iowa (Iowa City Senior Center, Coralville Public Library, one corporate buyer).
- **Phase 2 (months 5 to 9)**: voice chat integration, two additional scenarios, formal efficacy study with University of Iowa.
- **Phase 3 (months 10 to 18)**: corporate channel buildout, AARP outreach, four additional scenarios covering deepfake voice clones, AI-generated romance scams, and emerging AI-driven attack patterns.
- **Phase 4 (year 2+)**: SWARM-adjacent integration optional: corporate buyers pipe their own observed attack patterns into custom scenarios for their employees' parents, closing the loop between enterprise threat intel and family-level defense.
