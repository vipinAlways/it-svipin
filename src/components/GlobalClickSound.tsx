"use client";
import { useEffect } from "react";

const GlobalClickSound = () => {
  useEffect(() => {
    const handleClick = () => {
      const sound = new Audio("/sounds/mouse-click.mp3");
      sound.play().catch(() => {
       
      });
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null; // This component renders nothing
};

export default GlobalClickSound;
