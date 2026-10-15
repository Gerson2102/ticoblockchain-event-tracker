import { getEventPhase, getSessionsAt } from "../../lib/session-time";
import type { Speaker, SessionStatus } from "../../data/types";

// Each speaker's live status is derived from the agenda session at the
// matching time + stage, so the speakers page reflects the same live state
// as the agenda. If no matching session exists (speaker time is "Por
// anunciar"), the speaker is "past" once the event is over, else "scheduled".
//
// Match rule: speaker.time === session.time AND
// (speaker.stage === session.stage OR session.stage === "both").
// "both"-stage sessions (ceremonies, joint keynotes) light up speakers on
// either physical stage at that moment.
export function applyLiveStatus(
  speakers: readonly Omit<Speaker, "status">[],
  now: Date,
): Speaker[] {
  const sessions = getSessionsAt(now);
  const unmatched: SessionStatus =
    getEventPhase(now) === "after" ? "past" : "scheduled";
  return speakers.map((speaker) => {
    const match = sessions.find(
      (session) =>
        session.time === speaker.time &&
        (session.stage === speaker.stage || session.stage === "both"),
    );
    return { ...speaker, status: match ? match.status : unmatched };
  });
}
