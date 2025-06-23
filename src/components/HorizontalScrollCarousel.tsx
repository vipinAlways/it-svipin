"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { cards } from "@/constans";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";

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
      className="relative scroll-smooth h-[400vh] w-full"
    >
      <div className="sticky lg:top-0 top-6 h-[80vh] flex items-center overflow-hidden lg:h-screen ">
        <motion.div
          style={{ x }}
          transition={{ ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex items-center gap-2 "
        >
          {cards.map(
            (card) =>
              card.liveLink&& (
                <motion.div
                  key={card.id}
                  className={`relative  glassy-container ${card.bgColor} `}
                  transition={{ ease: "easeOut", duration: 0.5 }}
                  viewport={{ amount: 0.5 }}
                >
                  <div style={{padding:"5px"}} className=" absolute inset-0 flex flex-col lg:flex-row justify-evenly max-lg:justify-center max-lg:gap-4 items-center lg:w-full h-full w-[90%] ">
                    <div className="flex flex-col lg:h-96 h-64 md:h-auto justify-center items-center text-center">
                      <div
                        style={{ padding: "10px" }}
                        className="flex flex-col items-start justify-center gap-5"
                      >
                        <h1 className="text-7xl max-lg:text-2xl">
                          {card.title}
                        </h1>
                        <p className="text-2xl max-w-md text-start max-lg:text-sm">
                          {card.description}
                        </p>
                      </div>
                      <a href={`${card.gitlink}/blob/main/README.md`} className="">Read More</a>
                    </div>

                    <div
                      style={{ padding: "15px" }}
                      className="lg:h-96 h-64 w-[35%] max-lg:w-full flex flex-col gap-2 items-center "
                    >
                      <div className=" h-full w-full rounded-lg relative group ">
                        <Image
                          src={card.image || "/non.png"}
                          alt={card.title}
                          fill
                          loading="lazy"
                          className="object-cover object-center rounded-lg z-10 group-hover:opacity-0 transition-all duration-150 ease-in group-focus:opacity-0"
                        />
                        <Image
                          src={"/non.png"}
                          alt={card.title}
                          fill
                          loading="lazy"
                          className="object-cover object-center rounded-lg z-[1]"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-3 w-full">
                        <a
                          target="_blank"
                          href={card.gitlink || ""}
                          className="h-12 flex-1 rounded-lg border-zinc-500 dark:border bg-white/20 backdrop-blur-3xl flex items-center justify-center new group"
                        >
                          <FaGithub className="w-8 h-8  text-[#cec8c5] rotate " />
                        </a>
                        <a
                          target="_blank"
                          href={card.liveLink || ""}
                          className="h-12 flex-1 rounded-lg border-zinc-500 dark:border bg-white/20 backdrop-blur-2xl flex items-center justify-center  "
                        >
                          <FaExternalLinkAlt className="w-6 h-6 text-[#cec8c5] rotate" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollCarousel;
