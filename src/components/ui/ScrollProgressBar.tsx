"use client";

import React, { useEffect, useState } from "react";

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full transition-all duration-75 ease-out"
        style={{
          width: `${scrollProgress}%`,
          background:
            "linear-gradient(90deg, #D4AF37 0%, #DBAE40 60%, #F5D77F 100%)",
          boxShadow: "0 0 8px rgba(219, 174, 64, 0.6)",
        }}
      />
    </div>
  );
};
