"use client";

import { useEffect, useRef, useState } from "react";

/* A horizontal swipe row that teaches itself once, game-style:
   the first time it scrolls into view on a phone, the row nudges sideways
   and an animated hand shows which way to swipe. Gone after the first swipe. */
export function SwipeRow({
  id,
  as: Tag = "div",
  className = "",
  children,
}: {
  id: string;
  as?: "div" | "ul";
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const row = ref.current;
    if (!row) return;
    const key = `kusa-swipe-${id}`;
    try {
      if (sessionStorage.getItem(key)) return;
    } catch {
      /* storage blocked: still show once per page view */
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timers: number[] = [];
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      setHint(false);
      timers.forEach(clearTimeout);
      try {
        sessionStorage.setItem(key, "1");
      } catch {}
    };

    const onUserScroll = () => {
      if (row.scrollLeft > 24) finish();
    };

    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || done) return;
        if (row.scrollWidth <= row.clientWidth + 8) return; // nothing to swipe (tablet, desktop)
        obs.disconnect();
        setHint(true);
        if (!reduced) {
          timers.push(window.setTimeout(() => row.scrollTo({ left: 72, behavior: "smooth" }), 500));
          timers.push(window.setTimeout(() => row.scrollTo({ left: 0, behavior: "smooth" }), 1150));
        }
        timers.push(window.setTimeout(finish, 3600));
        timers.push(window.setTimeout(() => row.addEventListener("scroll", onUserScroll, { passive: true }), 1500));
      },
      { threshold: 0.6 }
    );
    obs.observe(row);
    return () => {
      obs.disconnect();
      row.removeEventListener("scroll", onUserScroll);
      timers.forEach(clearTimeout);
      timers = [];
    };
  }, [id]);

  return (
    <div className="relative w-full min-w-0">
      <Tag ref={ref as React.Ref<never>} className={className}>
        {children}
      </Tag>
      {hint && (
        <div className="swipe-hint pointer-events-none absolute inset-x-0 bottom-6 flex justify-center z-20 md:hidden" aria-hidden="true">
          <span className="inline-flex items-center gap-2.5 h-[44px] pl-3 pr-4 rounded-full bg-[#0B3E33]/95 text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,0.45)]">
            <span className="swipe-hand inline-flex">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V11m0-.5a1.5 1.5 0 0 1 3 0v3.5a6 6 0 0 1-6 6h-.6a6 6 0 0 1-4.6-2.2L4.5 14.6a1.5 1.5 0 0 1 2.3-1.9L9 15" />
              </svg>
            </span>
            <span className="font-jura font-bold text-[14px]">Glissez</span>
            <svg className="swipe-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#DBAE40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M13 8 9 4M13 8l-4 4" />
            </svg>
          </span>
        </div>
      )}
    </div>
  );
}
