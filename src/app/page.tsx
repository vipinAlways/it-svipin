"use client";

import HorizontalScrollCarousel from "@/components/HorizontalScrollCarousel";
import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import DiscordActivity from "@/components/DiscordActivity";
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
    <div className="bg-transparent relative p-4  px-9 font-[port]">
      <span
        className="cursor z-10 fixed border-[2px] border-zinc-700 h-7 w-7 rounded-full shadow-md p-1"
        style={{ top: "-10px", left: "-60px" }}
      ></span>

      <Link
        href={"/"}
        className="fixed top-3 left-10 z-20 text-3xl flex items-end hover:opacity-75 transition-all duration-200 ease-linear"
      >
        Vipin <span>.</span> <span>_</span>
      </Link>

      <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-20 w-[30rem] h-20 flex items-center justify-center">
        <div className="max-sm:w-full w-full h-16 rounded-full backdrop-blur-sm bg-[#06060644] flex items-center justify-evenly max-sm:rounded-3xl">
          {links.map((link) => (
            <button
              key={link.title}
              onClick={() => scrollHandler(link.section)}
              className="text-white px-4 py-2 hover:underline"
            >
              {link.title}
            </button>
          ))}
        </div>
      </nav>

      <section
        ref={Homesection}
        id="top"
        className="flex h-screen items-center justify-center flex-col py-9 gap-6"
      >
        <div>
          <h1 className="text-shadow-zinc-50 font-[port] text-center text-9xl max-lg:text-3xl font-bold flex gap-8 justify-center">
            <span>VIPIN</span> <span>ALWAYS</span>
          </h1>
          <p className="text-center text-4xl max-lg:text-2xl font-bold">
            FULL-STACK WEB DEVELOPER
          </p>
        </div>
        <div className="flex w-full items-start justify-evenly max-md:flex-col flex-wrap gap-6 z-50">
          <DiscordActivity />
          <div className="text-white rounded-xl w-72 p-2 h-60 overflow-auto acti shadow-lg">
            <h1 className="text-xl font-semibold sticky top-0 backdrop-blur-sm bg-[#06060644] z-50 flex items-start justify-start space-x-2 w-full h-14">
              My Lore
            </h1>

            <span className="block mb-1">Yo, I&#39;m Vipin 👾</span>
            <span className="block mb-1">
              Full-stack wizard 🧙‍♂️ // React, Node, Mongo kinda vibe
            </span>
            <span className="block mb-1">Coding past midnight ⌨️🌙</span>
            <span className="block mb-1">
              21 but built like a startup founder 🚀
            </span>
            <span className="block mb-1">
              Catch me live on VSCode 💻 or vibin&#39; to a podcast 🎧
            </span>
            <span className="block">Let&#39;s build something dope 💡✨</span>
          </div>
        </div>
      </section>

      <section ref={ProjectSection} className="w-full h-screen">
        <div className="w-full h-screen relative">
          <HorizontalScrollCarousel />
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
