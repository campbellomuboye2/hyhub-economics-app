
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
  duration = 1500, // duration in ms
  className,
  prefix = "",
  suffix = "",
  decimals = 0,
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animationFrameId = useRef<number>();
  const startTime = useRef<number>();

  const animate = (timestamp: number) => {
    if (!startTime.current) {
      startTime.current = timestamp;
    }

    const progress = timestamp - startTime.current;
    const progressFraction = Math.min(progress / duration, 1);
    const currentVal = progressFraction * end;
    setCount(currentVal);

    if (progress < duration) {
      animationFrameId.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTime.current = undefined;
          animationFrameId.current = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
