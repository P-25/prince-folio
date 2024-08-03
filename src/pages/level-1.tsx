import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "@/components/Loader";

import Island from "../models/island";
import Sky from "@/models/sky";
// import PirateFlagPopup from "@/components/PirateFlagPopup";
import GoingMerry from "@/models/goingmerry";
import NormalPopup from "@/components/NormalPopup";

{
  /* <div className="absolute top-28 right-0 left-0 z-10 flex items-center justify-center">
popup
</div>  */
}
export default function Home() {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  // const [showPopup, setShowPopup] = useState(false);

  // const handleConfirm = () => {
  //   setShowPopup(false);
  //   console.log("Confirmed!", showPopup);
  // };

  const adjustIs1andForScreenSize = () => {
    let screenSca1e = null;
    const screenPosition = [0, -10, -40];
    const rotation = [0.1, 5.5, 0];
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        screenSca1e = [0.9, 0.9, 0.9];
      } else {
        screenSca1e = [1, 1, 1];
      }
    }
    return [screenSca1e, screenPosition, rotation];
  };

  const [islandSca1e, islandPosition, islandRotation] =
    adjustIs1andForScreenSize();

  return (
    <section className="w-full h-screen relative">
      {/* <PirateFlagPopup onButtonClick={handleConfirm} /> */}

      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <NormalPopup currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            groundColor={`#000000`}
            color={`#b1e1ff`}
            intensity={1}
          />
          <GoingMerry scale={[0.3, 0.3, 0.3]} position={[1, -2.5, 0]} />
          <Sky isRotating={isRotating} />
          <Island
            position={islandPosition}
            scale={islandSca1e}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
        </Suspense>
      </Canvas>
    </section>
  );
}
