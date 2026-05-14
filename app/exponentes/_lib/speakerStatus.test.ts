import { describe, expect, test } from "vitest";
import { SPEAKERS } from "../../data/speakers";
import { applyLiveStatus } from "./speakerStatus";

// Build a wall-clock Date in Costa Rica (UTC-6, no DST).
function crDate(hhmm: string, dateISO = "2026-05-14"): Date {
  return new Date(`${dateISO}T${hhmm}:00-06:00`);
}

function findSpeaker(speakers: ReturnType<typeof applyLiveStatus>, id: string) {
  const speaker = speakers.find((s) => s.id === id);
  if (!speaker) throw new Error(`Speaker ${id} not found`);
  return speaker;
}

describe("applyLiveStatus — event day", () => {
  test("at 10:15 — Diego Loaiza (WINK) and Ricardo Barquero (Nimiq) are live", () => {
    const result = applyLiveStatus(SPEAKERS, crDate("10:15"));
    expect(findSpeaker(result, "diego-loaiza-centeno").status).toBe("live");
    expect(findSpeaker(result, "ricardo-barquero").status).toBe("live");
  });

  test("at 11:00 — Perspectivas de Inversión panel (Karla / Walter / Carlo / Ileana / José Miguel) is live", () => {
    const result = applyLiveStatus(SPEAKERS, crDate("11:00"));
    expect(findSpeaker(result, "karla-cordoba-brenes").status).toBe("live");
    expect(findSpeaker(result, "walter-montes").status).toBe("live");
    expect(findSpeaker(result, "carlo-blasio").status).toBe("live");
    expect(findSpeaker(result, "ileana-atan-chan").status).toBe("live");
    expect(findSpeaker(result, "jose-miguel-alfaro").status).toBe("live");
    // WINK ended at 10:25 — Diego is past.
    expect(findSpeaker(result, "diego-loaiza-centeno").status).toBe("past");
  });

  test("at 12:05 — Sebastián Ceciliano (Stellar / LATAM) is live on Escenario 2", () => {
    const result = applyLiveStatus(SPEAKERS, crDate("12:05"));
    // Sebastián moved to Esc-2 11:55 — 12:15 per the master agenda PDF.
    expect(findSpeaker(result, "sebastian-ceciliano").status).toBe("live");
  });

  test("at 13:00 — Geraldine Pacheco (AML/CFT) is live", () => {
    const result = applyLiveStatus(SPEAKERS, crDate("13:00"));
    // Geraldine runs 12:50 — 13:10 on Main.
    expect(findSpeaker(result, "geraldine-pacheco").status).toBe("live");
    // Earlier speakers are past.
    expect(findSpeaker(result, "diego-loaiza-centeno").status).toBe("past");
    expect(findSpeaker(result, "andy-guzman-toledo").status).toBe("past");
  });

  test("at 13:25 — Stephanie Sánchez (Del Código a la Ley) is live", () => {
    const result = applyLiveStatus(SPEAKERS, crDate("13:25"));
    // Stephanie runs 13:15 — 13:35 on Main.
    expect(findSpeaker(result, "stephanie-sanchez").status).toBe("live");
    // Geraldine ended at 13:10 — past.
    expect(findSpeaker(result, "geraldine-pacheco").status).toBe("past");
  });

  test("at 14:55 — Javier Buitrago (Pagos y Stablecoins moderator) is live", () => {
    const result = applyLiveStatus(SPEAKERS, crDate("14:55"));
    // Pagos y Stablecoins runs 14:50 — 15:30 on main, Javier is the moderator.
    expect(findSpeaker(result, "javier-buitrago").status).toBe("live");
  });

  test("at 16:20 — Carlos René and Cristian Guillén (Agentes Autónomos panel) are live", () => {
    const result = applyLiveStatus(SPEAKERS, crDate("16:20"));
    expect(findSpeaker(result, "carlos-rene").status).toBe("live");
    expect(findSpeaker(result, "cristian-guillen").status).toBe("live");
    // Rogelio Martínez remains a confirmed event participant on time "Por
    // anunciar", so he retains his seed "scheduled" status.
    expect(findSpeaker(result, "rogelio-martinez").status).toBe("scheduled");
  });

  test("after the last keyed talk (19:00) — Por-anunciar speakers fall back to their seed status", () => {
    const result = applyLiveStatus(SPEAKERS, crDate("19:00"));
    // Rogelio Martínez has time "Por anunciar" — never matches a session, retains seed.
    const rogelio = findSpeaker(result, "rogelio-martinez");
    const seed = SPEAKERS.find((s) => s.id === "rogelio-martinez");
    expect(rogelio.status).toBe(seed!.status);
  });
});

describe("applyLiveStatus — speakers without a matching session", () => {
  test("Por anunciar speakers retain seed status at any moment", () => {
    const result = applyLiveStatus(SPEAKERS, crDate("12:00"));
    const tba = result.filter((s) => s.time === "Por anunciar");
    expect(tba.length).toBeGreaterThan(0);
    for (const speaker of tba) {
      const seed = SPEAKERS.find((s) => s.id === speaker.id);
      expect(speaker.status).toBe(seed!.status);
    }
  });
});

describe("applyLiveStatus — input immutability", () => {
  test("does not mutate the input array or its entries", () => {
    const before = SPEAKERS.map((s) => ({ ...s }));
    applyLiveStatus(SPEAKERS, crDate("10:15"));
    for (let i = 0; i < SPEAKERS.length; i++) {
      expect(SPEAKERS[i]).toEqual(before[i]);
    }
  });
});
