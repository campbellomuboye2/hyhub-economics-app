
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
  const observer = useRef<IntersectionObserver | null>(null);
  const animationFrameId = useRef<number>();
  const isAnimating = useRef(false);

  useEffect(() => {
    // Reset count to 0 when the `end` value changes
    setCount(0);
    isAnimating.current = false; // Reset animation flag

    // If there's a pending animation frame, cancel it
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    
    // If there's an observer, disconnect it
    if(observer.current) {
        observer.current.disconnect();
    }

    const startAnimation = () => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      let startTime: number | null = null;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / (duration * 1000), 1);
        const currentCount = percentage * end;
        setCount(currentCount);

        if (percentage < 1) {
          animationFrameId.current = requestAnimationFrame(animate);
        } else {
          isAnimating.current = false;
        }
      };
      animationFrameId.current = requestAnimationFrame(animate);
    };

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.current?.disconnect();
        }
      });
    }, options);

    if (ref.current) {
      observer.current.observe(ref.current);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      observer.current?.disconnect();
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
