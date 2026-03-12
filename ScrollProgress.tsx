"use client";

import { useEffect, useRef } from "react";

export const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      if (!barRef.current) return;
      
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;
      
      let progress = 0;
      if (totalHeight > 0) {
        progress = scrollPosition / totalHeight;
      }
      
      // Use transform scaleX for GPU-accelerated smooth rendering instead of width
      barRef.current.style.transform = `scaleX(${progress})`;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Call once to set initial state
    updateScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        height: "4px",
        width: "100%", /* Base width is 100%, we scale it down */
        background: "linear-gradient(90deg, #a855f7, #c084fc)",
        zIndex: 9999,
        transformOrigin: "left", /* Scale from left to right */
        transform: "scaleX(0)", /* Initial state */
        pointerEvents: "none",
        willChange: "transform", /* Hint for browser layout engine */
      }}
    />
  );
};
