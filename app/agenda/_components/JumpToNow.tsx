"use client";

import { useEffect, useState } from "react";
import Icon from "../../components/Icon";

export default function JumpToNow() {
  const [hasLive, setHasLive] = useState(false);

  useEffect(() => {
    const check = () => {
      setHasLive(document.querySelector("[data-now]") !== null);
    };
    check();
    // Re-check when the server re-renders at a transition boundary.
    // LiveRefresh invalidates the router, which swaps the DOM — observe
    // the body so we pick up any new/removed data-now rows.
    const observer = new MutationObserver(check);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["data-now"],
    });
    return () => observer.disconnect();
  }, []);

  if (!hasLive) return null;

  const handleClick = () => {
    document
      .querySelector("[data-now]")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Saltar a la sesión en vivo"
      className="fixed z-40 bg-secondary text-on-secondary px-4 py-3 shadow-lg hover:bg-primary hover:text-on-primary transition-colors duration-200 mono-data text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 animate-fade-up border-2 border-on-secondary/20"
      style={{
        bottom: "calc(1.5rem + env(safe-area-inset-bottom))",
        right: "calc(1.5rem + env(safe-area-inset-right))",
      }}
    >
      <Icon name="my_location" size={14} />
      En vivo
    </button>
  );
}
