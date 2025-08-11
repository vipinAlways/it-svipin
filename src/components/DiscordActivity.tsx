"use client";
import { Activity } from "@/constans";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function LiveElapsedTimer({ start }: { start: number }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const elapsed = now - start;
  const totalSeconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <p className="font-mono text-sm">
      {minutes}:{seconds.toString().padStart(2, "0")}
    </p>
  );
}

export default function DiscordActivity({status,activities}:{status:string,activities:Activity[]}) {
 
  const containerRef = useRef<HTMLDivElement>(null);
 

  if (!status) {
    return (
      <div
        ref={containerRef}
        className="rounded-xl w-full max-w-md max-h-80 h-fit overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 relative flex flex-col gap-4 "
      >
        <div className="sticky top-0 z-10  w-full h-14">
          <h2 className="md:text-2xl text-xl font-semibold">
            Current Activities
          </h2>
          <p className="text-lg  mb-2">Offlie</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center mb-3 gap-4">
            <div
              className="flex items-center gap-6"
              style={{ padding: "10px" }}
            >
              <Image
                src={"/non2.png"}
                alt={"chill"}
                className="object-cover rounded-tl-lg rounded-br-lg border border-[#F7F4F3] "
                height={56}
                width={96}
                loading="lazy"
              />

              <div className="text-xl">
                <p className="font-bold break-words">Just Chilling</p>
                <p className="text-lg w-full"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="rounded-xl w-full max-w-md max-h-80 h-fit overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 relative flex flex-col gap-4 "
    >
      <div className="sticky top-0 z-10  w-full h-14">
        <h2 className="md:text-2xl text-xl font-semibold">
          Current Activities
        </h2>
        <p className="text-lg  mb-2">{status}</p>
      </div>

      {status !== "offline" ? (
        <div className="flex flex-col gap-3 overflow-hidden">
          {activities.length > 0 ? (
            activities.map((activity, index) => {
              const imageUrl = activity.assets?.large_image
                ? activity.assets.large_image.startsWith("spotify:")
                  ? `https://i.scdn.co/image/${
                      activity.assets.large_image.split(":")[1]
                    }`
                  : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
                : "/non.png";

              const isSpotify = activity.name === "Spotify";
              const start = activity.timestamps?.start;

              return (
                <div key={index} className="flex items-center mb-3 gap-4 ">
                  {isSpotify ? (
                    <Link
                      href={`https://open.spotify.com/track/${activity.sync_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-6 w-full"
                    >
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={activity.assets?.large_text || activity.name}
                          className="h-20 w-20 rounded-full object-cover spin"
                          height={56}
                          width={56}
                          loading="lazy"
                        />
                      )}
                      <div className="text-lg">
                        <p className="font-bold break-words">
                          {activity.details}
                        </p>
                        <p className="text-lg ">{activity.state}</p>
                        {start && <LiveElapsedTimer start={start} />}
                      </div>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-6 ">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={activity.assets?.large_text || activity.name}
                          className="object-cover rounded-tl-lg rounded-br-lg "
                          height={56}
                          width={96}
                          loading="lazy"
                        />
                      )}
                      <div className="text-xl">
                        <p className="font-bold break-words">
                          {activity.details || activity.name}
                        </p>
                        <p className="text-lg  w-full">{activity.state}</p>
                        {start && <LiveElapsedTimer start={start} />}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-center mb-3 gap-4">
                <div
                  className="flex items-center gap-6"
                  style={{ padding: "10px" }}
                >
                  <Image
                    src={"/non2.png"}
                    alt={"chill"}
                    className="object-cover rounded-tl-lg rounded-br-lg border border-[#F7F4F3] "
                    height={56}
                    width={96}
                    loading="lazy"
                  />

                  <div className="text-xl">
                    <p className="font-bold break-words">Observing</p>
                    <p className="text-lg w-full"></p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center mb-3 gap-4">
            <div className="flex items-center gap-6">
              <Image
                src={"/non.png"}
                alt={"chill"}
                className="w-20 h-20 rounded-md object-cover"
                height={56}
                width={96}
                loading="lazy"
              />

              <div className="text-xl">
                <p className="font-bold break-words">Just Dreaming</p>
                <p className="text-lg  w-full"></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
