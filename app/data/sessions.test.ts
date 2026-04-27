import { describe, expect, test } from "vitest";
import {
  computeSessionStatuses,
  getLiveSessions,
  getNextSessions,
  getNextTransitionAt,
  SESSIONS,
} from "./sessions";

// Helper — builds a Date from a wall-clock time in Costa Rica. Since CR is
// UTC-6 year-round (no DST), the explicit offset makes these tests unambiguous
// regardless of the machine running them.
function crDate(hhmm: string, dateISO = "2026-05-14"): Date {
  return new Date(`${dateISO}T${hhmm}:00-06:00`);
}

describe("computeSessionStatuses — event day", () => {
  test("at 09:59 (gap between VISA keynote end and WINK start)", () => {
    const statuses = computeSessionStatuses(SESSIONS, crDate("09:59"));

    // VISA ended at 09:55 — past.
    expect(statuses.get("keynote-1-visa")).toBe("past");
    // WINK starts at 10:00 — not yet live, promoted to next on main.
    expect(statuses.get("wink-main")).toBe("next");
    // Nimiq also starts at 10:00 — promoted to next on escenario-2.
    expect(statuses.get("nimiq-esc2")).toBe("next");
    // Ceremonies earlier in the day — past.
    expect(statuses.get("registro")).toBe("past");
    expect(statuses.get("apertura")).toBe("past");
  });

  test("at 10:00 exactly — WINK and Nimiq flip to live", () => {
    const statuses = computeSessionStatuses(SESSIONS, crDate("10:00"));

    expect(statuses.get("keynote-1-visa")).toBe("past");
    expect(statuses.get("wink-main")).toBe("live");
    expect(statuses.get("nimiq-esc2")).toBe("live");
    // Main pass promotes the earliest scheduled matching (main OR both): the
    // "both"-stage morning coffee break at 10:30 wins.
    expect(statuses.get("coffee-break-am")).toBe("next");
    // Esc-2 pass then looks for the next scheduled matching (esc-2 OR both) —
    // the coffee break is already "next" so it's excluded, falling through to
    // Olanzo (10:55). This is by design: each stage gets its own "next" marker.
    expect(statuses.get("olanzo-esc2")).toBe("next");
    // Perspectivas is main-only and later than the coffee break — still plain scheduled.
    expect(statuses.get("perspectivas-inversion-main")).toBe("scheduled");
  });

  test("at 10:25 exactly — WINK ends (inclusive end), next slot live-adjacent", () => {
    const statuses = computeSessionStatuses(SESSIONS, crDate("10:25"));

    // 10:25 >= end "10:25" → past.
    expect(statuses.get("wink-main")).toBe("past");
    expect(statuses.get("nimiq-esc2")).toBe("past");
    // Same "next" promotion pattern as at 10:00 — coffee break wins main,
    // Olanzo wins esc-2 as fallback.
    expect(statuses.get("coffee-break-am")).toBe("next");
    expect(statuses.get("olanzo-esc2")).toBe("next");
    expect(statuses.get("perspectivas-inversion-main")).toBe("scheduled");
  });

  test("at 10:35 — morning coffee break is live on both stages", () => {
    const statuses = computeSessionStatuses(SESSIONS, crDate("10:35"));
    expect(statuses.get("coffee-break-am")).toBe("live");
    // Perspectivas (main) and Olanzo (esc-2) start at 10:55 → both promoted to "next".
    expect(statuses.get("perspectivas-inversion-main")).toBe("next");
    expect(statuses.get("olanzo-esc2")).toBe("next");
  });

  test("at 17:30 — Ecosistemas y CRTW just started on Main", () => {
    const statuses = computeSessionStatuses(SESSIONS, crDate("17:30"));
    // The 16:45–17:25 Main panel ended; CRTW panel runs 17:30–17:55.
    expect(statuses.get("blockchain-ciudadania-main")).toBe("past");
    expect(statuses.get("ecosistemas-crtw-main")).toBe("live");
  });

  test("at 15:40 — afternoon coffee break (both-stage) is live", () => {
    const statuses = computeSessionStatuses(SESSIONS, crDate("15:40"));
    expect(statuses.get("coffee-break")).toBe("live");
  });

  test("at 19:00 — coctel (both-stage, 18:15-20:00) is live", () => {
    const statuses = computeSessionStatuses(SESSIONS, crDate("19:00"));
    expect(statuses.get("coctel")).toBe("live");
    // Tether brindis (18:00–18:15) ran just before — past.
    expect(statuses.get("tether-brindis")).toBe("past");
  });
});

describe("computeSessionStatuses — off-event-day fallback", () => {
  test("day before the event returns literal seed statuses", () => {
    const statuses = computeSessionStatuses(SESSIONS, crDate("10:00", "2026-05-13"));
    for (const session of SESSIONS) {
      expect(statuses.get(session.id)).toBe(session.status);
    }
  });

  test("day after the event returns literal seed statuses", () => {
    const statuses = computeSessionStatuses(SESSIONS, crDate("10:00", "2026-05-15"));
    for (const session of SESSIONS) {
      expect(statuses.get(session.id)).toBe(session.status);
    }
  });
});

describe("getLiveSessions", () => {
  test("at 10:15 — WINK on main, Nimiq on escenario-2", () => {
    const live = getLiveSessions(crDate("10:15"));
    expect(live.main?.id).toBe("wink-main");
    expect(live.escenario2?.id).toBe("nimiq-esc2");
  });

  test("at 15:40 — coffee break mirrored onto both keys", () => {
    const live = getLiveSessions(crDate("15:40"));
    expect(live.main?.id).toBe("coffee-break");
    expect(live.escenario2?.id).toBe("coffee-break");
  });

  test("at 09:58 (between VISA end and WINK start, main stage has no live) — both undefined", () => {
    const live = getLiveSessions(crDate("09:58"));
    // VISA ended 09:55, nothing else live on either stage.
    expect(live.main).toBeUndefined();
    expect(live.escenario2).toBeUndefined();
  });
});

describe("getNextTransitionAt", () => {
  test("at 10:15 — returns 10:25 (WINK end) as the next boundary", () => {
    const iso = getNextTransitionAt(crDate("10:15"));
    expect(iso).not.toBeNull();
    // Boundary in CR time: 10:25 → UTC 16:25.
    expect(new Date(iso!).toISOString()).toBe("2026-05-14T16:25:00.000Z");
  });

  test("at 10:25 exactly — returns the next boundary (10:30 starts)", () => {
    const iso = getNextTransitionAt(crDate("10:25"));
    expect(new Date(iso!).toISOString()).toBe("2026-05-14T16:30:00.000Z");
  });

  test("day before event — returns null (no transitions to schedule)", () => {
    expect(getNextTransitionAt(crDate("10:00", "2026-05-13"))).toBeNull();
  });

  test("after last talk ends (post-20:00) — returns null", () => {
    expect(getNextTransitionAt(crDate("21:00"))).toBeNull();
  });
});

describe("getNextSessions", () => {
  test("at 10:00 — returns upcoming sessions sorted chronologically", () => {
    const next = getNextSessions(3, crDate("10:00"));
    expect(next).toHaveLength(3);
    // Sorted ascending by startTime.
    for (let i = 1; i < next.length; i++) {
      expect(next[i].startTime >= next[i - 1].startTime).toBe(true);
    }
    // None of them should have already started (wink/nimiq are live at 10:00).
    for (const session of next) {
      expect(session.startTime > "10:00").toBe(true);
    }
  });

  test("limit parameter caps the number of results", () => {
    const next = getNextSessions(2, crDate("10:00"));
    expect(next).toHaveLength(2);
  });
});
