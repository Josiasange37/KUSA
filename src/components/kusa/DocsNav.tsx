"use client";

import { useEffect, useRef, useState } from "react";

export type DocsGroup = { title: string; items: { id: string; label: string }[] };

/* Sticky documentation sidebar with scroll-spy, and a compact select on phones. */
export function DocsNav({ groups }: { groups: DocsGroup[] }) {
  const ids = groups.flatMap((g) => g.items.map((i) => i.id));
  const [active, setActive] = useState(ids[0]);
  const rowRef = useRef<HTMLElement>(null);

  // Keep the active chip visible in the phone row
  useEffect(() => {
    const row = rowRef.current;
    const chip = row?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (row && chip) row.scrollTo({ left: chip.offsetLeft - 16, behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => Boolean(e));
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Phone: sticky row of section chips, active one kept in view */}
      <div className="lg:hidden sticky top-[calc(var(--nav-h)+env(safe-area-inset-top))] z-30 -mx-4 sm:-mx-8 bg-cream/95 backdrop-blur-sm border-b border-line">
        <nav aria-label="Sections de la documentation" ref={rowRef} className="snap-row flex gap-2 overflow-x-auto px-4 sm:px-8 py-2.5">
          {groups.flatMap((g) => g.items).map((i) => {
            const on = i.id === active;
            return (
              <a
                key={i.id}
                href={`#${i.id}`}
                data-id={i.id}
                aria-current={on ? "location" : undefined}
                className={`flex-none inline-flex items-center h-[42px] px-4 rounded-full font-jura font-bold text-[14px] whitespace-nowrap transition-colors ${
                  on ? "bg-brand text-white" : "bg-surface text-forest border border-line-2"
                }`}
              >
                {i.label}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Desktop: sidebar */}
      <nav aria-label="Sommaire de la documentation" className="hidden lg:block sticky top-[calc(var(--nav-h)+28px)] max-h-[calc(100vh-var(--nav-h)-56px)] overflow-y-auto pr-2">
        {groups.map((g) => (
          <div key={g.title} className="mb-6">
            <p className="font-jura font-bold text-[12.5px] text-gold mb-2 px-3">{g.title}</p>
            <ul className="flex flex-col">
              {g.items.map((i) => {
                const on = i.id === active;
                return (
                  <li key={i.id}>
                    <a
                      href={`#${i.id}`}
                      aria-current={on ? "location" : undefined}
                      className={`block px-3 py-2 rounded-[8px] font-jura font-semibold text-[14px] transition-colors ${
                        on ? "bg-mint text-forest" : "text-slate hover:text-forest hover:bg-surface"
                      }`}
                    >
                      {i.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </>
  );
}
