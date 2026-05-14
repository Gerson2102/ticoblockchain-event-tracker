import { describe, expect, test } from "vitest";
import { SPEAKERS } from "../../data/speakers";
import { expandAppearances } from "./groupSpeakers";
import { applyLiveStatus } from "./speakerStatus";

function crDate(hhmm: string, dateISO = "2026-05-14"): Date {
  return new Date(`${dateISO}T${hhmm}:00-06:00`);
}

// Counts duplicate entries the merge pass drops from the output (every
// same-name appearance beyond the first one collapses into additionalSlot).
function countDuplicateAppearances(): number {
  const byName = new Map<string, number>();
  for (const s of SPEAKERS) {
    byName.set(s.name, (byName.get(s.name) ?? 0) + 1);
  }
  let dropped = 0;
  for (const count of byName.values()) {
    if (count > 1) dropped += count - 1;
  }
  return dropped;
}

describe("expandAppearances", () => {
  test("returns one appearance per speaker, minus same-name duplicates that merge into the earliest card", () => {
    const appearances = expandAppearances(SPEAKERS);
    // Karla, JM Zamora, and Gianina each have two source entries that
    // collapse into a single card with additionalSlot.
    expect(appearances).toHaveLength(SPEAKERS.length - countDuplicateAppearances());
  });

  test("Gianina renders as a single card with the TBA slot folded in as additionalSlot", () => {
    const appearances = expandAppearances(SPEAKERS);
    const gianinaAppearances = appearances.filter(
      (a) => a.speaker.name === "Gianina Redondo",
    );
    expect(gianinaAppearances).toHaveLength(1);
    expect(gianinaAppearances[0].speaker.id).toBe("gianina-redondo-agentes");
    expect(gianinaAppearances[0].additionalSlot).toEqual({
      talk: "Agentes Autónomos y Dinero Digital",
      time: "Por anunciar",
    });
  });

  test("Karla renders as a single card anchored to her Perspectivas slot, with the CRTW cierre as additionalSlot", () => {
    const appearances = expandAppearances(SPEAKERS);
    const karla = appearances.filter(
      (a) => a.speaker.name === "Karla Córdoba Brenes",
    );
    expect(karla).toHaveLength(1);
    expect(karla[0].speaker.id).toBe("karla-cordoba-brenes");
    expect(karla[0].additionalSlot).toEqual({
      talk: "TicoBlockchain y CRTW (Panel)",
      time: "17:30 — 17:55",
    });
  });

  test("JM Zamora renders as a single card anchored to his Ecosistema Fintech panel, with the CRTW cierre as additionalSlot", () => {
    const appearances = expandAppearances(SPEAKERS);
    const jmz = appearances.filter(
      (a) => a.speaker.name === "José Miguel Zamora Barquero",
    );
    expect(jmz).toHaveLength(1);
    expect(jmz[0].speaker.id).toBe("jose-miguel-zamora");
    expect(jmz[0].additionalSlot).toEqual({
      talk: "TicoBlockchain y CRTW (Panel)",
      time: "17:30 — 17:55",
    });
  });

  test("solo speakers have no panelContext", () => {
    const appearances = expandAppearances(SPEAKERS);
    const visa = appearances.find(
      (a) => a.speaker.id === "rodrigo-barros-de-paula",
    );
    expect(visa).toBeDefined();
    expect(visa?.panelContext).toBeUndefined();
  });

  test("panelists share a panelContext with the right size, sessionId, and indices", () => {
    const appearances = expandAppearances(SPEAKERS);
    // Perspectivas de Inversión 2026 — 5 panelists, lead is Karla (Moderadora).
    const perspectivasIds = [
      "karla-cordoba-brenes",
      "walter-montes",
      "carlo-blasio",
      "ileana-atan-chan",
      "jose-miguel-alfaro",
    ];
    const panelMembers = perspectivasIds.map((id) => {
      const a = appearances.find((x) => x.speaker.id === id);
      if (!a) throw new Error(`missing ${id}`);
      return a;
    });

    for (const member of panelMembers) {
      expect(member.panelContext).toBeDefined();
      expect(member.panelContext?.sessionId).toBe("perspectivas-inversion-main");
      expect(member.panelContext?.panelSize).toBe(5);
      // Title trims the role suffix (" (Moderadora)") off the lead's talk.
      expect(member.panelContext?.title).not.toMatch(/\(/);
      expect(member.panelContext?.title.length).toBeGreaterThan(0);
    }

    // First panelist (Karla) gets indexInPanel = 0; the rest follow input order.
    expect(panelMembers[0].panelContext?.indexInPanel).toBe(0);
    expect(panelMembers[4].panelContext?.indexInPanel).toBe(4);
  });

  test("panelists are emitted contiguously in output order", () => {
    const appearances = expandAppearances(SPEAKERS);
    const start = appearances.findIndex(
      (a) => a.speaker.id === "karla-cordoba-brenes",
    );
    expect(start).toBeGreaterThanOrEqual(0);
    // The 5 panelists occupy positions [start, start+4].
    const slice = appearances
      .slice(start, start + 5)
      .map((a) => a.speaker.id);
    expect(slice).toEqual([
      "karla-cordoba-brenes",
      "walter-montes",
      "carlo-blasio",
      "ileana-atan-chan",
      "jose-miguel-alfaro",
    ]);
  });

  test("'Por anunciar' speakers each get their own appearance with no panelContext", () => {
    const appearances = expandAppearances(SPEAKERS);
    const tba = appearances.filter(
      (a) => a.speaker.time === "Por anunciar",
    );
    expect(tba.length).toBeGreaterThan(0);
    for (const a of tba) {
      expect(a.panelContext).toBeUndefined();
    }
  });

  test("merged card flips its primary to the currently-live appearance — Karla at 11:00 anchors to Perspectivas", () => {
    const withStatus = applyLiveStatus(SPEAKERS, crDate("11:00"));
    const appearances = expandAppearances(withStatus);
    const karla = appearances.filter((a) => a.speaker.name === "Karla Córdoba Brenes");
    expect(karla).toHaveLength(1);
    expect(karla[0].speaker.id).toBe("karla-cordoba-brenes");
    expect(karla[0].speaker.status).toBe("live");
    expect(karla[0].additionalSlot?.talk).toBe("TicoBlockchain y CRTW (Panel)");
  });

  test("merged card flips its primary to the currently-live appearance — Karla at 17:35 anchors to CRTW cierre", () => {
    const withStatus = applyLiveStatus(SPEAKERS, crDate("17:35"));
    const appearances = expandAppearances(withStatus);
    const karla = appearances.filter((a) => a.speaker.name === "Karla Córdoba Brenes");
    expect(karla).toHaveLength(1);
    expect(karla[0].speaker.id).toBe("karla-cordoba-brenes-cierre");
    expect(karla[0].speaker.status).toBe("live");
    expect(karla[0].additionalSlot?.talk).toBe("Perspectivas de Inversión 2026 (Moderadora)");
  });

  test("merged card flips its primary to the currently-live appearance — JM Zamora at 17:35 anchors to CRTW cierre", () => {
    const withStatus = applyLiveStatus(SPEAKERS, crDate("17:35"));
    const appearances = expandAppearances(withStatus);
    const jmz = appearances.filter((a) => a.speaker.name === "José Miguel Zamora Barquero");
    expect(jmz).toHaveLength(1);
    expect(jmz[0].speaker.id).toBe("jose-miguel-zamora-cierre");
    expect(jmz[0].speaker.status).toBe("live");
    expect(jmz[0].additionalSlot?.talk).toBe("Ecosistema Fintech en LatAm: Retos y Oportunidades (Moderador)");
  });

  test("panel sessionId resolves for every panel session that surfaces on cards", () => {
    const appearances = expandAppearances(SPEAKERS);
    const panelSessionIds = new Set<string>();
    for (const a of appearances) {
      if (a.panelContext?.sessionId) panelSessionIds.add(a.panelContext.sessionId);
    }
    // CRTW (ticoblockchain-crtw-main) is intentionally absent: both its
    // panelists (Karla, JM Zamora) anchor to earlier primary slots and
    // surface CRTW via additionalSlot rather than panelContext.
    expect(panelSessionIds).toContain("perspectivas-inversion-main");
    expect(panelSessionIds).toContain("pagos-stablecoins-main");
    expect(panelSessionIds).toContain("agentes-autonomos-main");
    expect(panelSessionIds).toContain("ecosistema-fintech-latam-main");
    expect(panelSessionIds).not.toContain("ticoblockchain-crtw-main");
  });
});
