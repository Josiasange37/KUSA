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
  const [count, setCount] = useState(0);
  const [index, setIndex] = useState(0);
  const [scrollable, setScrollable] = useState(false);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  // Track whether the row scrolls (phones) and which card is in front
  useEffect(() => {
    const row = ref.current;
    if (!row) return;
    const measure = () => {
      setScrollable(row.scrollWidth > row.clientWidth + 8);
      setCount(row.children.length);
    };
    const onScroll = () => {
      const first = row.children[0] as HTMLElement | undefined;
      if (!first) return;
      const step = first.offsetWidth + parseFloat(getComputedStyle(row).columnGap || "0");
      const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 4;
      setIndex(atEnd ? row.children.length - 1 : Math.round(row.scrollLeft / step));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    row.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      row.removeEventListener("scroll", onScroll);
    };
  }, []);

  const goTo = (i: number) => {
    const row = ref.current;
    const card = row?.children[i] as HTMLElement | undefined;
    if (row && card) row.scrollTo({ left: card.offsetLeft - row.offsetLeft - 16, behavior: "smooth" });
  };

  // Mouse users (desktop browser at phone width): drag to scroll
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !scrollable || !ref.current) return;
    drag.current = { x: e.clientX, left: ref.current.scrollLeft, moved: false };
    ref.current.style.scrollSnapType = "none";
    ref.current.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || !ref.current) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    ref.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    const d = drag.current;
    if (!d || !ref.current) return;
    dragMoved.current = d.moved;
    drag.current = null;
    // snap to the nearest card from the live position
    const row = ref.current;
    const first = row.children[0] as HTMLElement | undefined;
    const step = first ? first.offsetWidth + parseFloat(getComputedStyle(row).columnGap || "0") : row.clientWidth;
    const target = Math.max(0, Math.min(row.children.length - 1, Math.round(row.scrollLeft / step)));
    row.style.scrollSnapType = "";
    goTo(target);
  };
  // A drag must not trigger the card's link
  const onClickCapture = (e: React.MouseEvent) => {
    if (dragMoved.current) {
      e.preventDefault();
      e.stopPropagation();
      dragMoved.current = false;
    }
  };
  const dragMoved = useRef(false);

  useEffect(() => {
    const row = ref.current;
    if (!row) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timers: number[] = [];
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      setHint(false);
      timers.forEach(clearTimeout);
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
          // the cards follow the finger on each pass
          for (const t0 of [0, 1600]) {
            timers.push(window.setTimeout(() => row.scrollTo({ left: 80, behavior: "smooth" }), t0 + 350));
            timers.push(window.setTimeout(() => row.scrollTo({ left: 0, behavior: "smooth" }), t0 + 1150));
          }
        }
        timers.push(window.setTimeout(finish, 3300));
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
  }, []);

  return (
    <div className="relative w-full min-w-0" data-swipe={id}>
      <Tag
        ref={ref as React.Ref<never>}
        className={`${className} ${scrollable ? "cursor-grab active:cursor-grabbing select-none" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDragStart={(e) => scrollable && e.preventDefault()}
        onClickCapture={onClickCapture}
      >
        {children}
      </Tag>
      {scrollable && count > 1 && (
        <div className="flex justify-center gap-0.5 pt-1" role="group" aria-label="Position dans la liste">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Carte ${i + 1} sur ${count}`}
              aria-current={i === index ? "true" : undefined}
              className="w-7 h-7 flex items-center justify-center"
            >
              <span className={`block h-2 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-gold" : "w-2 bg-line-2"}`} />
            </button>
          ))}
        </div>
      )}
      {hint && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center" aria-hidden="true">
          <div className="relative w-[200px] h-[120px]">
            {/* gold trail drawn by the finger */}
            <span className="swipe-trail absolute top-[38px] right-[48px] h-[6px] w-[104px] rounded-full bg-gradient-to-l from-[#DBAE40] to-[#DBAE40]/0" />
            {/* touch ripple where the finger lands */}
            <span className="swipe-ripple absolute top-[13px] right-[22px] w-[56px] h-[56px] rounded-full border-2 border-[#DBAE40]" />
            {/* the finger */}
            <span className="swipe-finger absolute top-[14px] right-[24px] w-[56px] h-[56px] rounded-full bg-[#0B3E33] text-white flex items-center justify-center shadow-[0_14px_30px_-8px_rgba(0,0,0,0.5)] ring-4 ring-white/70">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 14a8 8 0 0 1-8 8" />
                <path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
                <path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1" />
                <path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10" />
                <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
              </svg>
            </span>
            <span className="swipe-label absolute left-1/2 bottom-0 whitespace-nowrap inline-flex items-center gap-1.5 h-[32px] px-3.5 rounded-full bg-[#0B3E33] text-white font-jura font-bold text-[13px] shadow-lg">
              Glissez pour voir la suite
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
