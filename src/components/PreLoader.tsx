import React from "react";

const PreLoader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <style>
        {`
      @keyframes dotFadeIn {
        0% { opacity: 0; transform: translateY(-10px) scale(0); }
        60% { opacity: 1; transform: translateY(-10px) scale(1); }
        80% { opacity: 0.4; transform: translateY(0) scale(1); }
        100% { opacity: 0; transform: translateY(0) scale(0); }
      }
      .dot-animate {
        animation: dotFadeIn 0.4s ease forwards;
      }
    `}
      </style>

      <h1 className="text-xl sm:text-2xl md:text-7xl flex gap-1 text-[#5B2333]  dark:text-[#F7F4F3]">
        {["V", "I", "P", "I", "N", " ", "A", "L", "W", "A", "Y", "S"].map(
          (char, index) => (
            <span key={index} className="relative inline-block">
              {char !== " " && (
                <span
                  className="absolute -top-4 left-1/2 opacity-0 -translate-x-1/2 w-2 h-2 dark:bg-[#F7F4F3] bg-[#5B2333]  rounded-full dot-animate"
                  style={{ animationDelay: `${index * 200}ms` }}
                />
              )}
              <span>{char}</span>
            </span>
          )
        )}
      </h1>
    </div>
  );
};

export default PreLoader;
