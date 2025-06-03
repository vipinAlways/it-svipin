"use client";

import HorizontalScrollCarousel from "@/components/HorizontalScrollCarousel";
import Lenis from "lenis";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValue } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
}

interface LanyardData {
  discord_user: DiscordUser;
  discord_status: "online" | "idle" | "dnd" | "offline";
}

interface NavLink {
  title: string;
  section: React.RefObject<HTMLDivElement | null>;
}

const Home = () => {
  const Homesection = useRef<HTMLDivElement>(null);
  const ProjectSection = useRef<HTMLDivElement>(null);
  const AboutSection = useRef<HTMLDivElement>(null);
  const [showGoTop, setShowGoTop] = useState(false);
  const [data, setStatus] = useState<LanyardData | null>(null);
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

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(
          `https://api.lanyard.rest/v1/users/733300745469952011`
        );
        const json = await res.json();
        if (json.success) {
          setStatus(json.data);
        }
      } catch{
        return null;
      }
    };

    fetchStatus();
  }, []);

  useEffect(() => {
    const section = Homesection.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowGoTop(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => {
      observer.unobserve(section);
    };
  }, [Homesection]);

  const links: NavLink[] = [
    { title: "Home", section: Homesection },
    { title: "Projects", section: ProjectSection },
    { title: "About", section: AboutSection },
  ];

  const scrollHandler = useCallback(
    (ref: React.RefObject<HTMLDivElement | null>) => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    },
    []
  );

  const statusDot = {
    online: "bg-green-500",
    idle: "bg-yellow-400",
    dnd: "bg-red-500",
    offline: "bg-gray-500",
  }[data?.discord_status || "offline"];

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

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

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
        <div className="w-full flex justify-center items-center flex-col gap-1">
          <div className="flex w-full items-center justify-around flex-wrap gap-6">
            {
              <div className="flex items-center justify-around gap-4 w-96 h-60 text-white p-4 rounded-xl">
                <div className="mt-1 relative w-[100px] h-[100px] md:w-[135px] md:h-[135px] col-span-4 ">
                  <Image
                    src={`https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`}
                    className="w-full h-full rounded-2xl object-cover"
                    alt="avatar"
                    width={1600}
                    height={2600}
                    priority
                  />
                  <span
                    className={`absolute bottom-1 left-1 w-4 h-4 rounded-full border-2 border-zinc-900 ${statusDot}`}
                  />
                </div>
                <div>
                  <p className="text-xl font-semibold">
                    @{data.discord_user.username}
                  </p>
                  <p className="capitalize text-sm text-zinc-300">
                    {data.discord_status}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            }
            <div className="text-white flex flex-col">
              <span>Hey there, I&#39;m Vipin! 👋</span>
              <span>I&#39;m 21 old </span>
            </div>
          </div>
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
