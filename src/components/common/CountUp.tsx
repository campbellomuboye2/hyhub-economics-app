
"use client";

import { useEffect, useState, useRef } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function CountUp({
  end,
  duration = 1.5,
  className,
  prefix = "",
  suffix = "",
  decimals = 0,
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let observer: IntersectionObserver;

    const animate = (startTime: number, startVal: number, endVal: number) => {
      const now = performance.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const current = startVal + progress * (endVal - startVal);
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(() => animate(startTime, startVal, endVal));
      }
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        const startTime = performance.now();
        animate(startTime, 0, end);
        observer.disconnect();
      }
    };

    if (ref.current) {
      observer = new IntersectionObserver(handleIntersect, { threshold: 0.1 });
      observer.observe(ref.current);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
