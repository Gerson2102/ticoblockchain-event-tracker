import Link from "next/link";
import { agendaHrefForStage } from "../../data/venue";
import type { Speaker } from "../../data/types";
import Icon from "../../components/Icon";
import type { PanelContext } from "../_lib/groupSpeakers";

type PanelChipProps = {
  context: PanelContext;
  // The host card knows which physical stage the speaker is on; we pass it
  // through so the chip can deep-link to /agenda?stage=… and land the
  // correct track filter alongside the session anchor.
  stage: Speaker["stage"];
  // "row" trims the chip vertically so it fits in the dense mobile-row
  // meta strip; "card" gets a touch more breathing room on desktop tiles.
  variant?: "row" | "card";
};

// Internal-link chip rendered above the speaker's name on cards belonging
// to a panel session. Single source of truth for the "PANEL · {title} →"
// label and its target URL — keeps SpeakerCard and SpeakerRow visually
// consistent across viewports.
export default function PanelChip({ context, stage, variant = "card" }: PanelChipProps) {
  const base = agendaHrefForStage(stage);
  const href = context.sessionId ? `${base}#session-${context.sessionId}` : base;

  const sizeClass = variant === "row" ? "text-[9px]" : "text-[10px]";

  return (
    <Link
      href={href}
      className={`group/chip inline-flex items-center gap-1.5 mono-data ${sizeClass} font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors max-w-full`}
    >
      <span className="text-primary/50 shrink-0">Panel</span>
      <span className="text-primary/30 shrink-0" aria-hidden="true">·</span>
      <span className="truncate">{context.title}</span>
      <Icon
        name="arrow_forward"
        size={variant === "row" ? 10 : 11}
        className="shrink-0 transition-transform duration-150 group-hover/chip:translate-x-0.5"
      />
    </Link>
  );
}
