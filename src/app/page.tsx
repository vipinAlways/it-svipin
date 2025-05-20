"use client";
import HorizontalScrollCarousel from "@/components/HorizontalScrollCarousel";
import Lenis from "lenis";
import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface NavLink {
  title: string;
  section: React.RefObject<HTMLDivElement | null>;
}

const Home = () => {
  const Homesection = useRef<HTMLDivElement>(null);
  const ProjectSection = useRef<HTMLDivElement>(null);
  const AboutSection = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  const links: NavLink[] = [
    { title: "Home", section: Homesection },
    { title: "Projects", section: ProjectSection },
    { title: "About", section: AboutSection },
  ];
  const scrollHandler = useCallback(
    (ref: React.RefObject<HTMLDivElement | null>) => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  function position(e: MouseEvent) {
    document.querySelector(".cursor")?.animate(
      {
        top: `${e.clientY}px`,
        left: `${e.clientX}px`,
      },
      { duration: 500, fill: "forwards" }
    );
  }

  useEffect(() => {
    window.addEventListener("mousemove", position);

    return () => {
      window.removeEventListener("mousemove", position);
    };
  }, []);

  return (
    <div className="bg-transparent relative p-4 ">
      <span
        className="cursor z-10 fixed border-[2px] border-zinc-700 h-7 w-7 rounded-full shadow-md p-1"
        style={{ top: "-10px", left: "-60px" }}
      ></span>
      <nav className="fixed top-0 left-0 z-20 w-full h-20 flex items-center justify-center">
        <div className="max-sm:w-full w-2/5 h-16 rounded-full backdrop-blur-sm bg-[#06060644] flex items-center justify-evenly max-sm:rounded-3xl">
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
        className="flex h-screen items-center justify-center flex-col py-9"
      >
        <div className="h-screen w-full flex items-center justify-center flex-col gap-3">
          <h1 className="text-shadow-zinc-50 font-[port] text-center text-9xl font-bold gap-8 flex w-full justify-center">
            <span>VIPIN</span> <span>ALWAYS</span>
          </h1>
          <p className="w-full text-center text-4xl font-bold">
            <span>FULL-STACK WEB DEVELOPER</span>
          </p>
        </div>

        <div>
          <h1 className="text-4xl text-center">here are My works</h1>
        </div>
      </section>

      <section ref={ProjectSection} className="relative w-full ">
        <div className="h-[70vh] w-full flex justify-center items-center flex-col gap-1 ">
          <motion.h1
          initial={{opacity:0.6,y:10}}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-7xl"
          >
            Full-Stack Brilliance
          </motion.h1>
          <motion.h2
          initial={{opacity:0.6,y:10}}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ amount: 0.5 }}
            className="text-6xl"
          >
            Engineered by ONE
          </motion.h2>
        </div>
        <HorizontalScrollCarousel />
      </section>

      <section
        ref={AboutSection}
        className="scroll-mt-20 flex h-screen items-center justify-center"
      >
        <span className="font-semibold uppercase text-neutral-500">
          Scroll up
        </span>
      </section>
    </div>
  );
};

export default Home;
