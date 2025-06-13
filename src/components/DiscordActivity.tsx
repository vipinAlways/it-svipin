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

export default function DiscordActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const isScrollable = container.scrollHeight > container.clientHeight;

      if (isScrollable) {
        const atTop = container.scrollTop === 0;
        const atBottom =
          container.scrollTop + container.clientHeight >=
          container.scrollHeight;

        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
          e.stopPropagation();
        }
      } else {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
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
          setStatus(data.discord_status);
          setActivities(data.activities || []);
        }
      } catch (error) {
        console.error("Failed to fetch presence:", error);
      }
    };

    fetchPresence();
    const interval = setInterval(fetchPresence, 10000);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  if (!status) {
  return (  <div
      ref={containerRef}
      className="text-white rounded-xl w-full max-w-md max-h-80 h-fit overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 relative flex flex-col gap-4 "
    >
      <div className="sticky top-0 z-10  bg-black p-2 w-full h-14">
        <h2 className="text-2xl font-semibold">Current Activities</h2>
        <p className="text-lg text-gray-400 mb-2">Offline</p>
      </div>

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
              <p className="text-lg text-gray-300 w-full"></p>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }

  return (
    <div
      ref={containerRef}
      className="text-white rounded-xl w-full max-w-md max-h-80 h-fit overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 relative flex flex-col gap-4 "
    >
      <div className="sticky top-0 z-10 backdrop-blur-sm bg-[#06060644] p-2 w-full h-14">
        <h2 className="text-2xl font-semibold">Current Activities</h2>
        <p className="text-lg text-gray-400 mb-2">{status}</p>
      </div>

      {status !== "offline" ? (
        <div className="flex flex-col gap-3 overflow-hidden">
          {activities.map((activity, index) => {
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
              <div key={index} className="flex items-center mb-3 gap-4">
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
                        className="w-20 h-20 rounded-full object-cover spin"
                        height={56}
                        width={56}
                        loading="lazy"
                      />
                    )}
                    <div className="text-lg">
                      <p className="font-bold break-words">
                        {activity.details}
                      </p>
                      <p className="text-lg text-gray-300">{activity.state}</p>
                      {start && <LiveElapsedTimer start={start} />}
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-center gap-6">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={activity.assets?.large_text || activity.name}
                        className="w-20 h-20 rounded-md object-cover"
                        height={56}
                        width={96}
                        loading="lazy"
                      />
                    )}
                    <div className="text-xl">
                      <p className="font-bold break-words">
                        {activity.details || activity.name}
                      </p>
                      <p className="text-lg text-gray-300 w-full">
                        {activity.state}
                      </p>
                      {start && <LiveElapsedTimer start={start} />}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
                <p className="text-lg text-gray-300 w-full"></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
