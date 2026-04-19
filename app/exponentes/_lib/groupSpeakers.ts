import type { Speaker } from "../../data/types";

// A speaker appearance is either a solo talk or a panel (multiple speakers
// sharing the same time + stage). Panels get rendered as joint cards so
// the "on stage together" relationship is visible.
export type SpeakerAppearance =
  | { kind: "solo"; speaker: Speaker }
  | {
      kind: "panel";
      time: string;
      stage: Speaker["stage"];
      status: Speaker["status"];
      speakers: Speaker[];
    };

// Group consecutive speakers that share a time+stage into joint panel
// appearances. Input order is preserved — the first speaker of a panel
// determines its position in the output list.
export function groupAppearances(
  speakers: readonly Speaker[],
): SpeakerAppearance[] {
  const result: SpeakerAppearance[] = [];
  const indexByKey = new Map<string, number>();

  for (const speaker of speakers) {
    const key = `${speaker.time}|${speaker.stage}`;
    const existingIdx = indexByKey.get(key);
    if (existingIdx === undefined) {
      indexByKey.set(key, result.length);
      result.push({ kind: "solo", speaker });
      continue;
    }
    const existing = result[existingIdx];
    if (existing.kind === "solo") {
      result[existingIdx] = {
        kind: "panel",
        time: existing.speaker.time,
        stage: existing.speaker.stage,
        status: existing.speaker.status,
        speakers: [existing.speaker, speaker],
      };
    } else {
      existing.speakers.push(speaker);
    }
  }
  return result;
}

