"use client";
import HorizontalScrollCarousel from "@/components/HorizontalScrollCarousel";
import Lenis from "lenis";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import Link from "next/link";

interface NavLink {
  title: string;
  section: React.RefObject<HTMLDivElement | null>;
}

const Home = () => {
  const Homesection = useRef<HTMLDivElement>(null);
  const ProjectSection = useRef<HTMLDivElement>(null);
  const AboutSection = useRef<HTMLDivElement>(null);

  const [showGoTop, setShowGoTop] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowGoTop(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (Homesection.current) {
      observer.observe(Homesection.current);
    }

    return () => {
      if (Homesection.current) {
        observer.unobserve(Homesection.current);
      }
    };
  }, [Homesection]);

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

    return () => {
      lenis.destroy();
    };
  }, [scrollY]);

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
    <div className="bg-transparent relative p-4 font-[port]">
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
        className="flex h-screen items-center justify-center flex-col py-9 gap-3"
      >
        <h1 className="text-shadow-zinc-50 font-[port] text-center text-9xl max-lg:text-3xl font-bold flex gap-8 justify-center">
          <span>VIPIN</span> <span>ALWAYS</span>
        </h1>
        <p className="text-center text-4xl max-lg:text-2xl font-bold">
          FULL-STACK WEB DEVELOPER
        </p>
        <h1 className="text-4xl text-center mt-10">here are My works</h1>
      </section>

      <section ref={ProjectSection} className="relative w-full">
        <div className="h-screen w-full flex justify-center items-center flex-col gap-1">
          <motion.h1
            initial={{ opacity: 0.6, y: 10 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-7xl max-lg:text-3xl"
          >
            Full-Stack Brilliance
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0.6, y: 10 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ amount: 0.5 }}
            className="text-6xl max-lg:text-2xl"
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

      {showGoTop && (
        <button
          onClick={() =>
            document
              .getElementById("top")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="fixed bottom-6 right-6 z-50 bg-black text-white p-3 text-3xl w-15 h-15 shadow-lg hover:bg-gray-800 transition-all "
        >
          &uarr;
        </button>
      )}
    </div>
  );
};

export default Home;
