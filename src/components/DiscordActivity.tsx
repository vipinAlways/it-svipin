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
    <p className=" font-mono text-sm">
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

      // If scrollable, allow normal scrolling inside it
      if (isScrollable) {
        const atTop = container.scrollTop === 0;
        const atBottom =
          container.scrollTop + container.clientHeight >= container.scrollHeight;

        // Prevent page scroll when scrolling inside
        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
          e.stopPropagation();
        }
      } else {
        // Not scrollable — still prevent bubbling to body
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

 

  return (
    <div className="p-2 text-white rounded-xl w-72 h-60  overflow-y-auto acti hover:scroll-auto relative flex flex-col gap-4 shadow-lg ">
      <div className=" sticky top-0 backdrop-blur-sm bg-[#06060644] z-50 p-2 w-72 h-14 px-4 ">
        <h2 className="text-lg font-semibold ">Current Activities</h2>
      <p className="text-sm text-gray-400 mb-2">Status: {status}</p>
      </div>

      <div className="flex flex-col gap-3 ">
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
            <div key={index} className="flex items-center space-x-3 mb-3 gap-4">
              {isSpotify ? (
                <Link
                  href={`https://open.spotify.com/track/${activity.sync_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4"
                >
                  { imageUrl &&(
                    <Image
                      src={imageUrl}
                      alt={activity.assets?.large_text || activity.name}
                      className="w-14 h-14 rounded-full object-cover spin "
                      height={56}
                      width={56}
                      loading="lazy"
                    />
                  )}
                  <div>
                    <p className="font-bold">{activity.details}</p>
                    <p className="text-sm text-gray-300">{activity.state}</p>
                    {start && <LiveElapsedTimer start={start} />}
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-4">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={activity.assets?.large_text || activity.name}
                      className="w-14 h-14 rounded-md object-cover"
                      height={56}
                      width={56}
                      loading="lazy"
                    />
                  )}
                  <div>
                    <p className="font-bold">
                      {activity.details || activity.name}
                    </p>
                    <p className="text-sm text-gray-300">{activity.state}</p>
                    {start && <LiveElapsedTimer start={start} />}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    
    </div>
  );
}
