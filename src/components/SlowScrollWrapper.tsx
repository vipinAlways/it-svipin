"use client"
import React, { useEffect, useRef, ReactNode } from "react";

interface SlowScrollWrapperProps {
  children: ReactNode;
}

const SlowScrollWrapper: React.FC<SlowScrollWrapperProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollY = useRef(0);
  const targetScroll = useRef(0);

  useEffect(() => {
    const update = () => {
      scrollY.current += (targetScroll.current - scrollY.current) * 0.1;

      if (scrollRef.current) {
        scrollRef.current.style.transform = `translateY(-${scrollY.current}px)`;
      }

      requestAnimationFrame(update);
    };

    const onScroll = () => {
      targetScroll.current = window.scrollY;
    };

    requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll);

    // Set body height to fake scroll container
    if (scrollRef.current) {
      document.body.style.height = `${scrollRef.current.getBoundingClientRect().height}px`;
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.style.height = "auto";
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="fixed top-0 left-0 w-full will-change-transform z-0"
    >
      {children}
    </div>
  );
};

export default SlowScrollWrapper;
