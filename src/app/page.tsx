"use client";

import HorizontalScrollCarousel from "@/components/HorizontalScrollCarousel";
import DiscordActivity from "@/components/DiscordActivity";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import Lenis from "lenis";

import { Activity, cards, skills } from "@/constans";
import Image from "next/image";
import { IoMdMailOpen } from "react-icons/io";
import {
  FaDiscord,
  FaExternalLinkAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { SiHyperskill } from "react-icons/si";
import { MdHome } from "react-icons/md";
import { GrConnect } from "react-icons/gr";
import PreLoader from "@/components/PreLoader";

interface NavLink {
  title: string;
  section: React.RefObject<HTMLDivElement | null>;
  icon?: React.ReactNode;
}

const Home = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [status, setStatus] = useState<string>("");
  const [data, setData] = useState();
  const Homesection = useRef<HTMLDivElement>(null);
  const ProjectSection = useRef<HTMLDivElement>(null);
  const SkillSection = useRef<HTMLDivElement>(null);
  const ConnectSection = useRef<HTMLDivElement>(null);

  const scrollY = useMotionValue(0);

  const links: NavLink[] = [
    {
      title: "Home",
      section: Homesection,
      icon: <MdHome className="h-6 w-6 flex-1" />,
    },
    {
      title: "Projects",
      section: ProjectSection,
      icon: <GoProjectSymlink className="h-6 w-6 flex-1" />,
    },
    {
      title: "Skill",
      section: SkillSection,
      icon: <SiHyperskill className="h-6 w-6 flex-1" />,
    },
    {
      title: "Connect",
      section: ConnectSection,
      icon: <GrConnect className="h-6 w-6 flex-1" />,
    },
  ];
  const contact = [
    {
      link: "https://github.com/vipinAlways",
      icon: <FaGithub className="w-10 h-10  " />,
      name: "GitHub",
    },
    {
      link: "https://discord.com/users/733300745469952011",
      icon: <FaDiscord className="w-10 h-10  " />,
      name: "Discord",
    },
    {
      link: "https://www.linkedin.com/in/vipin-tiwari-a16556250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      icon: <FaLinkedin className="w-10 h-10  " />,
      name: "LinkedIn",
    },
    {
      link: "mailto:vipinKumarti555@gmail.com",
      icon: <IoMdMailOpen className="w-10 h-10  " />,
      name: "Email",
    },
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

  useEffect(() => {
    const controller = new AbortController();

    const fetchPresence = async () => {
      try {
        const res = await fetch(
          "https://api.lanyard.rest/v1/users/733300745469952011",
          { signal: controller.signal }
        );
        const json = await res.json();

        if (json.success) {
          const data = json.data;
          setData(data);
          setStatus(data.discord_status);
          setActivities(data.activities || []);
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error("Failed to fetch presence: " + error.message);
        } else {
          throw new Error("Failed to fetch presence: Unknown error");
        }
      }
    };

    fetchPresence();
    const interval = setInterval(fetchPresence, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [status]);

  if (!data) {
    return <PreLoader />;
  }

  return (
    <div className="bg-transparent relative p-4 px-4 font-[port] flex flex-col sm:gap-20  gap-6">
      <span
        className={`cursor z-10 fixed border-[2px]  h-7 w-7 rounded-full shadow-md p-1 -top-[10px] -left-[60px] bg-[#5B2333]/20 dark:bg-[#F7F4F3]/20 max-lg:hidden`}
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
      <nav className="md:hidden w-full fixed bottom-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-evenly padd-5">
        <div className="w-full h-20 rounded-xl backdrop-blur-xl dark:bg-[#a2818144] bg-[#dfd5d27a] flex items-center justify-evenly">
          {links.map((link) => (
            <button
              key={link.title}
              onClick={() => scrollHandler(link.section)}
              className="px-4 py-2 hover:underline text-base flex flex-col items-center "
            >
              {link.icon}
            </button>
          ))}
        </div>
      </nav>

      <section ref={Homesection} id="top" className="h- w-full">
        <motion.div
          ref={Homesection}
          id="top"
          className="flex h-fit items-center w-full justify-center flex-col py-9 lg:gap-20 sm:gap-10 gap-5 mt-20 overflow-hidden"
        >
          <div>
            {" "}
            <h1 className="font-[port] text-center text-4xl sm:text-5xl md:text-8xl font-bold flex flex-wrap gap-4 justify-center">
              <span>VIPIN</span> <span>ALWAYS</span>
            </h1>
            <p className="text-center lg:text-4xl text-xl font-bold">
              FULL-STACK WEB DEVELOPER
            </p>
          </div>

          <div className="flex w-full litems-start justify-evenly flex-wrap gap-10 max-md:flex-col items-cente">
            <div className="max-lg:flex-1 flex items-start">
              {" "}
              <DiscordActivity activities={activities} status={status} />
            </div>
            <div className="w-full max-w-md  overflow-auto acti  flex flex-col gap-2 flex-1">
              <h1 className="md:text-2xl text-xl font-semibold">My Lore</h1>
              <div className="flex gap-1 flex-col text-lg md:text-xl">
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
              <a
                style={{ padding: "6px" }}
                href="/Resume.pdf"
                target="_blank"
                className=" skillCard h-10 bg-[#5B2333] dark:bg-[#F7F4F3] dark:text-[#5B2333] text-[#F7F4F3] text-xl rounded-lg text-center"
              >
                Look At CV
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <section
        ref={ProjectSection}
        className="w-full h-fit flex flex-col justify-center gap-7  "
      >
        <div className="w-full flex items-center justify-center">
          <motion.h2
            whileInView={{ opacity: 1, scale: 1.2 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            initial={{ opacity: 0, scale: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-center"
          >
            Work
          </motion.h2>
        </div>
        <div className="h-fit w-full md:hidden">
          <div className="flex flex-col items-center  w-full">
            <div className="flex flex-col items-center gap-2 ">
              {cards.map(
                (card) =>
                  card.liveLink && (
                    <div
                      key={card.id}
                      className={`   border-t dark:border-t-[#F7F4F3] border-t-[#5B2333] padd-6 flex items-center justify-center`}
                    >
                      <div className=" flex flex-col  lg:flex-row justify-evenly max-lg:justify-center max-lg:gap-4 items-center lg:w-full h-full w-[90%] ">
                        <div className="flex flex-col h-fit justify-center  text-center  w-[35%] max-lg:w-full gap-5">
                          <div className="flex flex-col items-start justify-center gap-5">
                            <h1
                              style={{ padding: "6px 4px" }}
                              className="lg:text-6xl sm:text-5xl text-3xl bg-white/30 rounded-md "
                            >
                              {card.title}
                            </h1>
                            <p className="lg:text-xl sm:text-lg text-start text-[1rem] ">
                              {card.description}
                            </p>
                          </div>
                          <a
                            target="_blank"
                            style={{ padding: "0.5rem" }}
                            href={`${card.gitlink}/blob/main/README.md`}
                            className="max-h-10 flex-1 rounded-lg  dark:bg-[#F7F4F3]/20 bg-[#5B2333]/20 backdrop-blur-3xl flex items-center justify-center "
                          >
                            Read More
                          </a>
                        </div>

                        <div className="lg:h-96 h-64 w-[35%] max-lg:w-full flex flex-col gap-2 items-center ">
                          <div className=" h-full w-full rounded-lg relative group ">
                            <Image
                              src={card.image || "/non.png"}
                              alt={card.title}
                              fill
                              loading="lazy"
                              className="object-cover object-center rounded-lg z-10 group-hover:opa0 transition-all duration-150 ease-in group-focus:opacity-0"
                            />
                          </div>
                          <div className="flex items-center justify-between gap-3 w-full">
                            <a
                              target="_blank"
                              href={card.gitlink || ""}
                              className="h-12 flex-1 rounded-lg dark:bg-[#F7F4F3]/20 bg-[#5B2333]/20 backdrop-blur-3xl flex items-center justify-center new group"
                            >
                              <FaGithub className="w-8 h-8 rotate dark:text-[#F7F4F3] text-[#5B2333] " />
                            </a>
                            <a
                              target="_blank"
                              href={card.liveLink || ""}
                              className="h-12 flex-1 rounded-lg dark:bg-[#F7F4F3]/20 bg-[#5B2333]/20  backdrop-blur-2xl flex items-center justify-center  "
                            >
                              <FaExternalLinkAlt className="w-6 h-6  dark:text-[#F7F4F3] text-[#5B2333] rotate" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
        <div className="w-full h-full">
          <div className="relative w-full flex items-center justify-center max-md:hidden">
            <HorizontalScrollCarousel />
          </div>
        </div>
      </section>

      <section
        ref={SkillSection}
        className="flex h-fit items-center justify-center w-full"
      >
        <div className="w-full h-full check sm:grid-cols-[1fr_0.8fr] grid grid-rows-[auto] gap-x-20 gap-y-16 items-center ">
          <div className="max-sm:hidden ">
            <Image
              src={"/skills.png"}
              alt="faltu"
              height={200}
              width={300}
              className="aspect-[3/2] rounded-2xl w-full h-full "
              loading="lazy"
            />
          </div>

          <div className=" flex flex-col gap-2 w-full ">
            <h1 className="text-xl lg:text-3xl font-bold tracking-tight">
              Building the Web, One Innovation at a Time
            </h1>

            <div className="flex flex-col gap-2 items-start">
              <p className="text-sm lg:text-lg">
                I&#39;m a full-stack web developer who loves turning ideas into
                fast, clean, and real-time web apps.
              </p>

              <p className="text-sm lg:text-lg">
                From building group music apps with Spotify to crafting secure
                backends with Prisma and MongoDB — I focus on making the web
                more useful and fun.
              </p>

              <p className="text-sm lg:text-lg">
                I work with tools like Next.js, React, Tailwind, Docker, and Git
                to create apps that don&#39;t just work — they feel right.
              </p>
            </div>

            <div className="flex items-start justify-around ">
              {skills.map(({ image, name }) => (
                <div key={image} className="group relative">
                  <Image
                    src={image}
                    alt={name}
                    height={40}
                    width={40}
                    className="object-center rounded-md aspect-[1/1]  max-sm:w-10 max-sm:h-10  "
                  />
                  <span
                    style={{ padding: "5px" }}
                    className="max-md:hidden absolute -bottom-10 w-fit -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-[#5B2333] dark:bg-[#F7F4F3] dark:text-[#5B2333] text-[#F7F4F3] text-xs rounded-md text-nowrap "
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={ConnectSection}
        className="flex h-fit items-center justify-evenly w-full flex-col gap-6 py-8"
      >
        <p className="text-sm italic flex-1 max-sm:text-center">
          Well, since you&#39;ve made it this far... might as well take a look.
        </p>

        <div className="h-full flex  gap-10 flex-col md:flex-row flex-1 lg:w-96  justify-around">
          <div className="flex gap-5 items-center flex-1">
            {contact.map((item, index: number) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                className="relative group"
              >
                {item.icon}

                <span
                  style={{ padding: "5px" }}
                  className="absolute -top-6 -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-[#5B2333] dark:bg-[#F7F4F3] dark:text-[#5B2333] text-[#F7F4F3]   text-xs rounded-md"
                >
                  {item.name}
                </span>
              </a>
            ))}
          </div>
          <a
            style={{ padding: "6px" }}
            href="/Resume.pdf"
            target="_blank"
            className=" skillCard h-10 bg-[#5B2333] dark:bg-[#F7F4F3] dark:text-[#5B2333] text-[#F7F4F3] text-xl rounded-lg text-center flex-1"
          >
            {" "}
            Resume
          </a>
        </div>

        <div className="flex items-center justify-center ">
          <p className="text-lg text-center">Made with ❤️ by Vipin Tiwari</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
