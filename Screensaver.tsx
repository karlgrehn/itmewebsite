"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import classNames from "classnames";
import styles from "./Screensaver.module.scss";

// Official Apple TV Aerial video of New York City (Daytime Drone Shot)
const VIDEO_URL =
  "https://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b1-1.mov";

export const Screensaver = () => {
  const [isIdle, setIsIdle] = useState(false);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Timeout duration in milliseconds (60 seconds)
  const IDLE_TIMEOUT = 60000;

  const wakeUp = useCallback(() => {
    setIsIdle(false);
  }, []);

  useEffect(() => {
    setMounted(true);
    let timeoutId: NodeJS.Timeout;

    const handleActivity = () => {
      wakeUp();
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsIdle(true), IDLE_TIMEOUT);
    };

    // Initial setup
    timeoutId = setTimeout(() => setIsIdle(true), IDLE_TIMEOUT);

    // Attach event listeners
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("mousedown", handleActivity);
    window.addEventListener("keypress", handleActivity);
    window.addEventListener("scroll", handleActivity, true);
    window.addEventListener("touchstart", handleActivity);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("mousedown", handleActivity);
      window.removeEventListener("keypress", handleActivity);
      window.removeEventListener("scroll", handleActivity, true);
      window.removeEventListener("touchstart", handleActivity);
    };
  }, [wakeUp]);

  // Handle play/pause logic for performance depending on if the screensaver is visible
  useEffect(() => {
    if (!videoRef.current) return;

    if (isIdle) {
      videoRef.current.play().catch((e) => console.warn("Video play failed:", e));
    } else {
      // Optional: Pause video when not visible to save resources
      setTimeout(() => {
        if (!isIdle && videoRef.current) {
          videoRef.current.pause();
        }
      }, 2000); // Wait for transition to finish
    }
  }, [isIdle]);

  if (!mounted) return null;

  return (
    <div
      className={classNames(styles.screensaverContainer, { [styles.active]: isIdle })}
      onClick={wakeUp} // Extra interaction handler directly on overlay
      onKeyDown={wakeUp}
      role="presentation" // Suppress ARIA requirements as it's a visual overlay
    >
      <video
        ref={videoRef}
        className={styles.video}
        src={VIDEO_URL}
        loop
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
};
