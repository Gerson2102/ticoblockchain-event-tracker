"use client";

import { useState } from "react";
import Icon from "../Icon";

type UtilityBarProps = {
  address: string; // used for clipboard + WhatsApp share payload
  mapsUrl: string;
  wazeUrl: string;
  appleMapsUrl: string;
  // Google Maps deep-link derived from GPS — included in the WhatsApp
  // message so the receiver can tap straight into navigation.
  gpsMapsUrl: string;
};

type CopyState = "idle" | "copied" | "error";

// Utility strip below the transport grid. Five equal-weight actions let
// attendees copy the address, share it, or open their preferred maps app.
// Clipboard access requires the browser runtime, hence "use client".
export default function UtilityBar({
  address,
  mapsUrl,
  wazeUrl,
  appleMapsUrl,
  gpsMapsUrl,
}: UtilityBarProps) {
  const [copyState, setCopyState] = useState<CopyState>("idle");

  const handleCopy = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 2000);
      return;
    }
    try {
      await navigator.clipboard.writeText(address);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 2000);
    }
  };

  const whatsappText = encodeURIComponent(
    `Dirección del evento TicoBlockchain 2026:\n${address}\n${gpsMapsUrl}`,
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappText}`;

  const copyLabel =
    copyState === "copied"
      ? "COPIADO"
      : copyState === "error"
        ? "ERROR"
        : "COPIAR DIRECCIÓN";

  return (
    <div className="border-2 border-primary bg-primary">
      <div className="grid grid-cols-2 md:grid-cols-5 divide-x-2 divide-on-primary/20">
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 px-3 py-4 min-h-[56px] mono-data text-[10px] sm:text-xs font-bold uppercase tracking-widest text-on-primary hover:bg-secondary transition-colors duration-200"
          aria-live="polite"
        >
          <Icon
            name={copyState === "copied" ? "check" : "content_copy"}
            size={14}
          />
          {copyLabel}
        </button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-3 py-4 min-h-[56px] mono-data text-[10px] sm:text-xs font-bold uppercase tracking-widest text-on-primary hover:bg-secondary transition-colors duration-200"
        >
          <Icon name="north_east" size={14} />
          WhatsApp
        </a>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-3 py-4 min-h-[56px] mono-data text-[10px] sm:text-xs font-bold uppercase tracking-widest text-on-primary hover:bg-secondary transition-colors duration-200"
        >
          <Icon name="location_on" size={14} />
          Google Maps
        </a>
        <a
          href={wazeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-3 py-4 min-h-[56px] mono-data text-[10px] sm:text-xs font-bold uppercase tracking-widest text-on-primary hover:bg-secondary transition-colors duration-200"
        >
          <Icon name="north_east" size={14} />
          Waze
        </a>
        <a
          href={appleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-2 md:col-span-1 flex items-center justify-center gap-2 px-3 py-4 min-h-[56px] mono-data text-[10px] sm:text-xs font-bold uppercase tracking-widest text-on-primary hover:bg-secondary transition-colors duration-200"
        >
          <Icon name="location_on" size={14} />
          Apple Maps
        </a>
      </div>
    </div>
  );
}
