"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function useCountUp(end: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);
  const animEndRef = useRef(end);

  useEffect(() => {
    if (!inView || hasAnimated.current) {
      if (hasAnimated.current) {
        setValue(end);
      }
      return;
    }
    hasAnimated.current = true;
    animEndRef.current = end;

    const start = performance.now();
    const startValue = 0;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      setValue(Math.round(startValue + (animEndRef.current - startValue) * easedProgress));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  useEffect(() => {
    if (hasAnimated.current) {
      setValue(end);
    }
  }, [end]);

  return { ref, value };
}
