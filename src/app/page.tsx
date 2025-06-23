"use client";

import HorizontalScrollCarousel from "@/components/HorizontalScrollCarousel";
import DiscordActivity from "@/components/DiscordActivity";
import { useCallback, useEffect, useRef, useState } from "react";
import { easeInOut, motion, useMotionValue } from "framer-motion";
import Lenis from "lenis";
import { useTheme } from "next-themes";

interface NavLink {
  title: string;
  section: React.RefObject<HTMLDivElement | null>;
}

const Home = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();

  const Homesection = useRef<HTMLDivElement>(null);
  const ProjectSection = useRef<HTMLDivElement>(null);
  const SkillSection = useRef<HTMLDivElement>(null);
  const ContactSection = useRef<HTMLDivElement>(null);

  const scrollY = useMotionValue(0);

  useEffect(() => setMounted(true), []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const initialColor = currentTheme === "dark" ? "#F7F4F3" : "#5B2333";
  const finalColor = currentTheme === "dark" ? "#5B2333" : "#F7F4F3";

  const links: NavLink[] = [
    { title: "Home", section: Homesection },
    { title: "Projects", section: ProjectSection },
    { title: "Skill", section: SkillSection },
    { title: "Contact", section: ContactSection },
  ];

  useEffect(() => {
    const lenis = new Lenis();
    const update = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(update);
    };

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      scrollY.set(scroll);
    });

    requestAnimationFrame(update);
    return () => lenis.destroy();
  }, [scrollY]);

  const scrollHandler = useCallback(
    (ref: React.RefObject<HTMLDivElement | null>) => {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    },
    []
  );

  useEffect(() => {
    const position = (e: MouseEvent) => {
      document.querySelector(".cursor")?.animate(
        {
          top: `${e.clientY}px`,
          left: `${e.clientX}px`,
        },
        { duration: 500, fill: "forwards" }
      );
    };

    if (typeof document !== "undefined") {
      document.addEventListener("mousemove", position);
    }

    return () => {
      document.removeEventListener("mousemove", position);
    };
  }, []);

  return (
    <div className="bg-transparent relative p-4 px-4 font-[port] flex flex-col lg:gap-20  gap-12">
      <span
        className={`cursor z-10 fixed border-[2px]  h-7 w-7 rounded-full shadow-md p-1 -top-[10px] -left-[60px] bg-[#5B2333] dark:bg-[#F7F4F3]`}
      ></span>

      <nav className="hidden lg:flex fixed top-0 left-1/2 -translate-x-1/2 z-20 w-[30rem] h-20 items-center justify-center">
        <div className="w-full h-16 rounded-full backdrop-blur-xl dark:bg-[#a2818144] bg-[#dfd5d27a] flex items-center justify-evenly">
          {links.map((link) => (
            <button
              key={link.title}
              onClick={() => scrollHandler(link.section)}
              className="px-4 py-2 hover:underline text-xl"
            >
              {link.title}
            </button>
          ))}
        </div>
      </nav>

      <section ref={Homesection} id="top" className="min-h-screen  w-full">
        {mounted && (
          <motion.div
            initial={{
              clipPath: "circle(0%)",
              backgroundColor: initialColor,
            }}
            whileInView={{
              clipPath: "circle(100%)",
              backgroundColor: finalColor,
              transition: { duration: 0.5, ease: easeInOut },
            }}
            viewport={{ once: true }}
            ref={Homesection}
            id="top"
            className="flex min-h-screen items-center w-full justify-center flex-col py-9 gap-20"
          >
            <div>
              <h1 className="font-[port] text-center text-9xl max-lg:text-5xl font-bold flex gap-8 justify-center">
                <span>VIPIN</span> <span>ALWAYS</span>
              </h1>
              <p className="text-center text-4xl max-lg:text-xl font-bold">
                FULL-STACK WEB DEVELOPER
              </p>
            </div>

            <div className="flex w-full items-start justify-evenly flex-wrap gap-10 max-lg:flex-col max-lg:items-center">
              <DiscordActivity />
              <div className="rounded-xl w-full max-w-md max-h-min overflow-auto acti">
                <h1 className="text-2xl font-semibold flex items-start justify-start w-full h-14">
                  My Lore
                </h1>
                <div className="flex gap-1 flex-col text-lg">
                  <span>Yo, I&#39;m Vipin 👾</span>
                  <span>
                    Full-stack wizard 🧙‍♂️ // React, Node, Mongo kinda vibe~
                  </span>
                  <span>Coding past midnight ⌨️🌙</span>
                  <span>21 but built like a startup founder 🚀</span>
                  <span>
                    Catch me live on VSCode 💻 or vibin&#39; to a podcast 🎧
                  </span>
                  <span className="block">
                    Let&#39;s build something dope 💡✨
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      <section
        ref={ProjectSection}
        className="w-full h-fit flex flex-col justify-center gap-3"
      >
        <div className="w-full flex items-center justify-center">
          <motion.h2
            whileInView={{ opacity: 1, scale: 1.2 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            initial={{ opacity: 0, scale: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-center"
          >
            My Artworks
          </motion.h2>
        </div>
        <div className="w-full h-full">
          <div className="relative w-full flex items-center justify-center">
            <HorizontalScrollCarousel />
          </div>
        </div>
      </section>

      <section
        ref={SkillSection}
        className="flex h-fit items-center justify-center w-full"
      >
        <div className="w-full h-full flex flex-col gap-10 ">
          <h1 className="lg:text-6xl text-start w-full">My Toolbox</h1>
          <div className="flex flex-wrap items-center gap-4 not-hover:scale-100 toolbox  hover:ease-linear duration-200">
          {[1,2,3,4,5].map((item) => (
              <div key={item} className="w-36 h-36 hover:scale-[1.01] border-zinc-500 dark:border flex items-center justify-center  rounded-xl border dark:shadow-[#F7F4F3] shadow-[#5B2333]  hover:ease-linear duration-200" ></div>
          ))}
          
          </div>
        </div>
      </section>
      <section
        ref={ContactSection}
        className="flex h-fit items-center justify-center w-full"
      >
        <div
       
          className="w-full h-full flex flex-col gap-10"
        ></div>
      </section>
    </div>
  );
};

export default Home;
