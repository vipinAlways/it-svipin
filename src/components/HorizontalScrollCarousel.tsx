import React, { useRef } from 'react'
import { useScroll, useTransform, motion } from "framer-motion"
import { cards } from '@/constans';

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-transparent">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x, opacity }} className="flex">
          {cards.map((card) => {
            return (
              <div
                key={card.id}
                className="group relative w-screen h-screen overflow-hidden bg-transparent"
              >
                <div className="absolute inset-0 z-10 grid place-content-center">
                  <p className="bg-transparent text-6xl font-black uppercase text-white backdrop-blur-lg">
                    {card.title}  
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default HorizontalScrollCarousel;
