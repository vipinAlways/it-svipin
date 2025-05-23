"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { cards } from "@/constans";

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);

  return (
    <section
      ref={targetRef}
      className="relative bg-transparent scroll-smooth h-[500vh] "
    >
      <div className="sticky top-0  flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x }}
          transition={{ ease: "easeOut"}}
          viewport={{ once: true }}
          className="flex"
        >
          {cards.map((card) => {
            return (
              <motion.div
                key={card.id}
                className="group relative w-screen h-screen overflow-hidden"
                initial={{ scale: 1 }}
                whileInView={{ scale: 0.95 }}
                transition={{ ease: "easeOut", duration: 0.5 }}
                viewport={{ amount: 0.5 }}
              >
                <div className="absolute inset-0 z-10 max-md:top-1/2 top-30 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-around items-center flex-1/2 max-md:flex-col max-md:justify-center h-fit w-full ">
                  <div className="relative h-full  w-52">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2  w-full  h-72 bg-blue-500  rounded-lg"></div>
                    <div className="absolute top-10 -right-1/2 translate-y-1/3 w-full h-72 bg-orange-500 rotate-45 rounded-lg "></div>
                    <div className="absolute top-10 -left-1/2 translate-y-1/3 w-full  h-72 bg-red-500 -rotate-45 rounded-lg"></div>
                  </div>
                  <div className="flex flex-col h-screen max-md:h-20 justify-end w-[33rem] items-center text-center"> 
                   <div className="flex flex-col items-center justify-center gap-5">
                     <h1 className="text-7xl">{card.title}</h1>
                    <p className="text-2xl w-[26rem] text-end">
                      {card.description}
                    </p>
                   </div>
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
