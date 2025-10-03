import { skills } from "@/constans";
import Image from "next/image";
import React from "react";

const Skills = () => {
  return (
    <div className="flex h-fit items-center justify-center w-full">
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
              backends with Prisma and MongoDB — I focus on making the web more
              useful and fun.
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
    </div>
  );
};

export default Skills;
