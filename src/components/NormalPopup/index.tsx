/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";

interface PopupProps {
  currentStage: number | null;
}

export const PopupText = ({
  text,
  buttonUrl = "",
  buttonText = "Learn More",
}: any) => {
  return (
    <div className="rounded-md mx-5 relative flex text-white flex-col gap-3 max-w-2xl bg-blue-600 pt-8 pb-14 px-8">
      <p className="font-medium sm:text-xl text-center">{text}</p>

      {buttonUrl && (
        <Link
          href={buttonUrl}
          className="rounded-md bg-black text-blue-600 text-center font-semibold -bottom-5 absolute mx-auto right-0 left-0 sm:w-1/2 w-[90%]"
        >
          <span
            className="-translate-x-2 -translate-y-2 rounded-md border-2 border-black bg-white p-2 text-2xl  hover:-translate-y-3 
active:translate-x-0 active:translate-y-0
transition-all flex justify-center items-center gap-3 text-[1.2rem]"
          >
            {buttonText}
            <img
              src={`/assets/icons/arrow.svg`}
              alt="arrow"
              className="w-4 h-4 object-contain"
            />
          </span>
        </Link>
      )}
    </div>
  );
};

const NormalPopup = ({ currentStage }: PopupProps) => {
  if (currentStage === 1)
    return (
      <PopupText
        text={
          <>
            Ahoy! Welcome to Pirate Prince Sharma's isle.
            <br />
            Spin the island 'round and uncover the hidden
          </>
        }
      />
    );

  if (currentStage === 2) {
    return (
      <PopupText
        text={
          <>
            Worked with many companies <br /> and picked up many skills along
            the way
          </>
        }
        buttonUrl="/about"
        buttonText="Behold me skills, matey!"
      />
    );
  }

  if (currentStage === 3) {
    return (
      <PopupText
        text={
          <>
            Led multiple projects to success over the years. <br /> Curious
            about the impact?
          </>
        }
        buttonUrl="/projects"
        buttonText="Visit My Portfolio"
      />
    );
  }

  if (currentStage === 4) {
    return (
      <PopupText
        text={
          <>
            Need a project done or looking for a dev? <br /> I'm just a few
            keystrokes away
          </>
        }
        buttonUrl="/contact"
        buttonText="Let's Sail"
      />
    );
  }

  return null;
};

export default NormalPopup;
