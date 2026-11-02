"use client";

import { useId, useState } from "react";
import type { Sample } from "@/lib/dev";

/* The original KUSA code window (#07131E, three window dots, Roboto Mono),
   extended with language tabs, a copy button and an optional response pane. */
export function CodeWindow({
  title,
  samples,
  response,
  responseLabel = "Réponse",
  className = "",
}: {
  title: string;
  samples: Sample[];
  response?: string;
  responseLabel?: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const base = useId();
  const current = samples[active];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(current.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked: nothing to do */
    }
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + samples.length) % samples.length;
    setActive(next);
    document.getElementById(`${base}-tab-${next}`)?.focus();
  };

  return (
    <div
      className={`flex flex-col w-full overflow-hidden ${className}`}
      style={{
        background: "#07131E",
        border: "1px solid rgba(255, 255, 255, 0.055)",
        borderRadius: 18,
        boxShadow: "0 16px 40px -10px rgba(0,0,0,0.5), 0 0 35px rgba(11,62,51,0.25)",
      }}
    >
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-[15px] min-h-[44px] border-b border-white/[0.063]">
        <span className="flex-none w-[7px] h-[7px] rounded-full bg-[#D15449]" aria-hidden="true" />
        <span className="flex-none w-[7px] h-[7px] rounded-full bg-[#D3AD43]" aria-hidden="true" />
        <span className="flex-none w-[7px] h-[7px] rounded-full bg-[#4F9A71]" aria-hidden="true" />
        <span className="ml-1 font-mono text-[11px] text-[#8896A4] whitespace-nowrap overflow-hidden text-ellipsis">{title}</span>
        <button
          type="button"
          onClick={copy}
          className="ml-auto -mr-2 flex-none min-h-[40px] font-jura font-bold text-[12px] text-[#8896A4] hover:text-white px-3 rounded-md hover:bg-white/[0.06] active:bg-white/[0.08] transition-colors"
          aria-live="polite"
        >
          {copied ? "Copié" : "Copier"}
        </button>
      </div>

      {/* Language tabs */}
      {samples.length > 1 && (
        <div role="tablist" aria-label="Langage" className="flex gap-1 px-3 pt-2.5 overflow-x-auto">
          {samples.map((s, i) => (
            <button
              key={s.label}
              id={`${base}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls={`${base}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`font-jura font-bold text-[13px] px-3.5 min-h-[40px] rounded-md whitespace-nowrap transition-colors ${
                i === active ? "bg-[#DBAE40]/15 text-[#DBAE40]" : "text-[#8896A4] hover:text-[#CED6DB]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* Request */}
      <div
        id={`${base}-panel`}
        role={samples.length > 1 ? "tabpanel" : undefined}
        aria-labelledby={samples.length > 1 ? `${base}-tab-${active}` : undefined}
        tabIndex={0}
        className="overflow-x-auto px-4 py-4"
      >
        <pre className="code text-[11.5px] sm:text-[13px]">
          <code>{current.code}</code>
        </pre>
      </div>

      {/* Response */}
      {response && (
        <div className="border-t border-[#17222C]">
          <p className="px-4 pt-3 font-jura font-bold text-[11px] text-[#6E8090]">{responseLabel}</p>
          <div className="overflow-x-auto px-4 pb-4 pt-1.5" tabIndex={0}>
            <pre className="code text-[11.5px] sm:text-[13px]" style={{ color: "#5FB585" }}>
              <code>{response}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
