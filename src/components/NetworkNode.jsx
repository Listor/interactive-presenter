import React, { useEffect, useState, useMemo } from "react";

/**
 * Star & Ring Network Node
 * - A central "star" that breaths/glows.
 * - An outer ring that appears when the star shrinks.
 * - Randomly triggers to create a "twinkling field" effect.
 */
export default function NetworkNode({
  x = "50%",
  y = "50%",
  size = 10,
  color = "#2aa7ff",
  zIndex = 5,
  positionMode = "fixed", // "fixed" | "absolute"
  className = "",
  style = {},
  // Animation timing
  duration = 4000, 
  minIdleMs = 2000,
  maxIdleMs = 10000,
}) {
  const [active, setActive] = useState(false);

  // Random generator
  const rand = (a, b) => a + Math.random() * (b - a);

  useEffect(() => {
    let t1, t2;
    let cancelled = false;

    const schedule = () => {
      // Stay idle for a random time
      const delay = rand(minIdleMs, maxIdleMs);
      
      t1 = setTimeout(() => {
        if (cancelled) return;
        setActive(true);

        // Stay active for the duration of the animation
        t2 = setTimeout(() => {
          if (cancelled) return;
          setActive(false);
          schedule(); // Re-schedule next cycle
        }, duration);
      }, delay);
    };

    schedule();

    return () => {
      cancelled = true;
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [duration, minIdleMs, maxIdleMs]);

  return (
    <>
      <style>{css}</style>
      <div
        className={["nn-container", active ? "nn-active" : "", className].join(" ")}
        style={{
          position: positionMode,
          left: x,
          top: y,
          width: size,
          height: size,
          zIndex,
          pointerEvents: "none",
          color: color, // Cascade color to CSS vars
          "--nn-color": color,
          "--nn-duration": `${duration}ms`,
          ...style,
        }}
      >
        <div className="nn-star" />
        <div className="nn-ring" />
      </div>
    </>
  );
}

const css = `
.nn-container {
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.nn-star {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--nn-color);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--nn-color);
  transform: scale(1);
  opacity: 0.8;
  will-change: transform, opacity, box-shadow;
}

.nn-container.nn-active .nn-star {
  animation: nn-star-breathe var(--nn-duration) ease-in-out forwards;
}

.nn-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0.5px solid var(--nn-color);
  border-radius: 50%;
  opacity: 0;
  transform: scale(1);
  pointer-events: none;
  box-sizing: border-box;
  will-change: transform, opacity;
}

.nn-container.nn-active .nn-ring {
  animation: nn-ring-pulse var(--nn-duration) ease-in-out forwards;
}

@keyframes nn-star-breathe {
  0% {
    transform: scale(1);
    box-shadow: 0 0 5px var(--nn-color), 0 0 10px var(--nn-color);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.5);
    box-shadow: 0 0 20px var(--nn-color), 0 0 40px var(--nn-color);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 5px var(--nn-color), 0 0 10px var(--nn-color);
    opacity: 0.8;
  }
}

@keyframes nn-ring-pulse {
  0% { /* Star is small */
    opacity: 0;
    transform: scale(1);
    border-width: 0.5px;
  }
  45% { /* Star is big, ring hidden */
    opacity: 0;
    transform: scale(1.6);
  }
  55% { /* Star starts shrinking, ring appears */
    opacity: 0.8;
    transform: scale(2.4);
    border-width: 1px;
  }
  75% { /* Blinking effect */
    opacity: 1;
    transform: scale(2.8);
    box-shadow: 0 0 10px var(--nn-color);
  }
  100% { /* Fades away */
    opacity: 0;
    transform: scale(3.6);
    border-width: 0px;
  }
}
`;
