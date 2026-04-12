// Pulsing crimson dot used next to "EN VIVO" labels. Two stacked spans:
// the outer animates a ping halo, the inner is the solid glowing dot.
export default function LiveDot() {
  return (
    <span className="flex h-3 w-3 relative">
      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-secondary opacity-75" />
      <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary animate-live-glow" />
    </span>
  );
}
