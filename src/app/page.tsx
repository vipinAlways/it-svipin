"use client";
import HorizontalScrollCarousel from "@/components/HorizontalScrollCarousel";
import Lenis from "lenis";
import { useCallback, useEffect, useRef } from "react";

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
    const raf = (time: any) => {
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

  return (
    <div className="bg-transparent relative p-4 ">
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
        className="flex h-screen items-center justify-center"
      >
        <div className="h-screen w-full flex items-center justify-center flex-col">
          <h1 className=" text-green-50 font-[port] text-center text-9xl font-bold">VIPIN ALWAYS</h1>
          <p className="w-full text-center"><span>Web Developer</span> <span>Full Stack</span> <span></span></p>
        </div>
      </section>

      <section ref={ProjectSection} className="relative w-full ">
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
