"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cards, CardType } from "@/constans";

export default function HorizontalSnapScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      if (!container.contains(target)) return;

      e.preventDefault();

      if (isScrolling.current) return;

      if (e.deltaY >= 60 && activeIndex < cards.length - 1) {
        setActiveIndex((i) => i + 1);
        isScrolling.current = true;
      } else if (e.deltaY <= -30 && activeIndex > 0) {
        setActiveIndex((i) => i - 1);
        isScrolling.current = true;
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 700);
    };

    container.addEventListener("wheel", handleWheel);

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [activeIndex]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden absolute top-0 left-0">
      <motion.div
        style={{
          display: "flex",
          width: `${cards.length * 100}vw`,
          height: "100vh",
        }}
        animate={{ x: `-${activeIndex * 100}vw` }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {cards.map((card: CardType, i) => (
          <div
            key={i}
            style={{
              backgroundColor: `hsl(${i * 90}, 70%, 60%)`,
              fontSize: "3rem",
              userSelect: "none",
            }}
            className="w-full h-screen flex items-center justify-center"
          >
            {card.title}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
