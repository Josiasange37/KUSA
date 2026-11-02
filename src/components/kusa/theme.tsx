"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { THEME_KEY as KEY } from "@/lib/theme-init";

export function ThemeToggle({ className = "", bare = false }: { className?: string; bare?: boolean }) {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.add("theme-anim");
    root.setAttribute("data-theme", next);
    window.setTimeout(() => root.classList.remove("theme-anim"), 400);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* storage blocked: theme still applies for this visit */
    }
    setTheme(next);
  };

  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Passer au thème clair" : "Passer au thème sombre"}
      title={dark ? "Thème clair" : "Thème sombre"}
      className={`relative w-[44px] h-[44px] flex-none rounded-[10px] flex items-center justify-center text-forest transition-all active:scale-95 ${bare ? "hover:bg-surface-2 active:bg-surface-2" : "border border-line-2 bg-surface hover:bg-surface-2"} ${className}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
        className="absolute transition-all duration-300"
        style={{ opacity: dark ? 1 : 0, transform: dark ? "rotate(0) scale(1)" : "rotate(-60deg) scale(0.6)" }}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="absolute transition-all duration-300"
        style={{ opacity: dark ? 0 : 1, transform: dark ? "rotate(60deg) scale(0.6)" : "rotate(0) scale(1)" }}
      >
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
    </button>
  );
}

/* Sign-in and sign-up are full-screen: no navbar, no footer. */
export const BARE_ROUTES = ["/connexion", "/inscription"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (BARE_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"))) return null;
  return <>{children}</>;
}
