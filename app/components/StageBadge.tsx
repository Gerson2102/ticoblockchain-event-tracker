import type { Stage } from "../data/types";

type StageBadgeProps = {
  stage: Stage;
  // `sm` fits the compact hero rails; `md` is sized for the main agenda
  // departure board rows.
  size?: "sm" | "md";
};

// Color carries the stage identity (MAIN cobalt / ESC 2 crimson / AMBOS
// pale cobalt), and a distinct geometric glyph prefixes the label so the
// difference survives color-blind modes and grayscale printouts.
export default function StageBadge({ stage, size = "sm" }: StageBadgeProps) {
  const { bg, glyph, label } =
    stage === "main"
      ? { bg: "bg-primary text-on-primary", glyph: "▮", label: "MAIN" }
      : stage === "escenario-2"
        ? { bg: "bg-secondary text-on-secondary", glyph: "▯", label: "ESC 2" }
        : {
            bg: "bg-primary-fixed text-on-primary-fixed",
            glyph: "◫",
            label: "AMBOS",
          };

  const sizeClasses =
    size === "md" ? "text-[10px] px-3 py-1" : "text-[9px] px-1.5 py-0.5";

  return (
    <span
      className={`${bg} ${sizeClasses} mono-data font-black uppercase tracking-widest inline-flex items-center gap-1 shrink-0`}
    >
      <span aria-hidden="true">{glyph}</span>
      {label}
    </span>
  );
}
