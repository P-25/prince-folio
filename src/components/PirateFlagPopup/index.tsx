// components/PirateFlagPopup.tsx
import React from "react";

const PirateFlagPopup: React.FC = () => {
  return (
    <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 text-center z-50">
      <div
        className="h-[18em] w-[36em]  text-black font-pirate px-[2.5em] flex justify-center items-left flex-col gap-[0.75em]"
        style={{
          backgroundImage: "url(/assets/parch.png)",
          backgroundSize: "cover",
        }}
      >
        <div>
          <p className="text-[1.5em]">
            Ahoy, matey! Welcome to me pirate isle. Spin the island 'round and
            seek out the hidden booty!
          </p>
        </div>
        <div className="flex justify-center">
          <button className="h-[4em] w-[15em] px-[1em] py-[0.25em] border-[1px] rounded-full flex justify-center items-center gap-[0.5em] overflow-hidden group hover:translate-y-[0.125em] duration-200 backdrop-blur-[12px]">
            <p className="text-[1.5em] font-pirate">Arrr, let's set sail!</p>
            <svg
              className="w-6 h-6 group-hover:translate-x-[10%] duration-300 font-bold"
              stroke="currentColor"
              strokeWidth="1"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PirateFlagPopup;
