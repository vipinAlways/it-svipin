"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { cards } from "@/constans";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-76%"]);

  return (
   <section
  ref={targetRef}
  className="relative bg-transparent scroll-smooth h-[400vh] w-[95vw]"
>
  <div className="sticky top-0 flex h-screen items-center overflow-hidden">
    <motion.div
      style={{ x }}
      transition={{ ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex items-center gap-2"
    >
      {cards.map((card) => (
        <motion.div
          key={card.id}
          className={`relative   rounded-xl  glassy-container ${card.bgColor} `}
          initial={{ scale: 0.98 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          viewport={{ amount: 0.5 }}
        >
          <div className="absolute inset-0  flex flex-col md:flex-row justify-evenly max-lgjustify-center max-lggap-4 items-center w-full h-full bg-transparent z-20">
          
            <div  className="flex flex-col h-96 md:h-auto justify-center items-center text-center">
              <div style={{padding:"10px"}} className="flex flex-col items-start justify-center gap-5">
                <h1 className="text-7xl max-lgtext-4xl">{card.title}</h1>
                <p className="text-2xl max-w-md text-start max-lgtext-xl">{card.description}</p>
              </div>
            </div>

            
            <div style={{padding:"15px"}} className="h-96 w-[35%] max-lgw-full flex flex-col gap-2 items-center ">
              <div className=" h-full w-full rounded-lg relative border group border-white/70">
                <Image
                src={card.image ||"/non.png"}
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
                <Link target="_blank" href={card.gitlink || ""} className="h-12 flex-1 rounded-lg border-zinc-500 border bg-white/20 backdrop-blur-2xl flex items-center justify-center new">
                    <FaGithub className="w-8 h-8  text-[#cec8c5] rotate" />
                </Link>
                <Link target="_blank" href={card.liveLink||""} className="h-12 flex-1 rounded-lg border-zinc-500 border bg-white/20 backdrop-blur-2xl flex items-center justify-center  ">
                  <FaExternalLinkAlt  className="w-6 h-6 text-[#cec8c5] rotate"/>
                    
                </Link>
                
        
              </div>
            </div>
          </div>

        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

  );
};

export default HorizontalScrollCarousel;
