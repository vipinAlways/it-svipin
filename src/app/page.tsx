"use client";

import HorizontalScrollCarousel from "@/components/HorizontalScrollCarousel";
import { useCallback, useEffect, useRef } from "react";
import DiscordActivity from "@/components/DiscordActivity";
import { useMotionValue } from "framer-motion";
import Lenis from "lenis";
interface NavLink {
  title: string;
  section: React.RefObject<HTMLDivElement | null>;
}

const Home = () => {
  const Homesection = useRef<HTMLDivElement>(null);
  const ProjectSection = useRef<HTMLDivElement>(null);
  const AboutSection = useRef<HTMLDivElement>(null);

  const links: NavLink[] = [
    { title: "Home", section: Homesection },
    { title: "Projects", section: ProjectSection },
    { title: "About", section: AboutSection },
  ];

  const scrollY = useMotionValue(0);

  useEffect(() => {
    const lenis = new Lenis({});
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
    <div className="bg-transparent relative p-4 px-4 font-[port] flex flex-col gap-3">
      <span
        className="cursor z-10 fixed border-[2px] border-zinc-700 h-7 w-7 rounded-full shadow-md p-1"
        style={{ top: "-10px", left: "-60px" }}
      ></span>

      <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-20 w-[30rem] h-20 flex items-center justify-center max-lghidden">
        <div className="max-sm:w-full w-full h-16 rounded-full backdrop-blur-md bg-[#06060644] flex items-center justify-evenly max-sm:rounded-3xl">
          {links.map((link) => (
            <button
              key={link.title}
              onClick={() => scrollHandler(link.section)}
              className={`text-white px-4 py-2 hover:underline `}
            >
              {link.title}
            </button>
          ))}
        </div>
      </nav>

      <section
        ref={Homesection}
        id="top"
        className="flex min-h-screen items-center w-full justify-center flex-col py-9 gap-20"
      >
        <div>
          <h1 className="text-shadow-zinc-50 font-[port] text-center text-9xl max-lg:text-4xl font-bold flex gap-8 justify-center">
            <span>VIPIN</span> <span>ALWAYS</span>
          </h1>
          <p className="text-center text-4xl max-lg:text-xl font-bold">
            FULL-STACK WEB DEVELOPER
          </p>
        </div>

        <div className="flex w-full items-start justify-evenly flex-wrap gap-10 max-lgflex-col max-lgitems-center">
          <DiscordActivity />

          <div className="text-white rounded-xl w-full max-w-md max-h-min overflow-auto acti ">
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
              <span className="block">Let&#39;s build something dope 💡✨</span>
            </div>
          </div>
        </div>
      </section>

      <h2 className="text-4xl md:text-5xl font-bold text-center">
        My Artworks
      </h2>
      <section
        ref={ProjectSection}
        className="w-full h-fit  flex items-center "
      >
        <div className="w-full max-w-7xl  flex items-center  flex-col ">
          <div className="relative w-full">
            <HorizontalScrollCarousel />
          </div>
        </div>
      </section>

      <section
        ref={AboutSection}
        className="flex h-screen items-center justify-center"
      >
        <span className="font-semibold uppercase text-neutral-500">
          Scroll up
        </span>
      </section>
    </div>
  );
};

export default Home;
