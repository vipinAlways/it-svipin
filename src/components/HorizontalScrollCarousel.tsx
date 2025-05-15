import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { cards } from "@/constans";

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-transparent scroll-smooth">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex">
          {cards.map((card) => {
            return (
              <motion.div
                key={card.id}
                className="group relative w-screen h-screen overflow-hidden"
                initial={{ clipPath: "circle(0% at 50% 50%)" }}
                whileInView={{ clipPath: "circle(100% at 50% 50%)" }}
                transition={{ ease: "linear"}}
              >
                <div className="absolute inset-0 z-10  place-content-center flex justify-around items-center flex-1/2">
                  <div className="relative h-72 w-52">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2  w-full h-full bg-blue-500  rounded-lg"></div>
                    <div className="absolute top-10 -right-1/2 translate-y-1/3 w-full h-full bg-orange-500 rotate-45 rounded-lg "></div>
                    <div className="absolute top-10 -left-1/2 translate-y-1/3 w-full h-full bg-red-500 -rotate-45 rounded-lg"></div>
                  </div>
                 <div className="flex flex-col h-full justify-around">
                  <h1 className="text-3xl">{card.title}</h1>
                 </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollCarousel;
