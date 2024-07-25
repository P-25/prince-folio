import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "@/components/Loader";

import Island from "./../models/island";
import Sky from "@/models/sky";
import PirateFlagPopup from "@/components/PirateFlagPopup";

{
  /* <div className="absolute top-28 right-0 left-0 z-10 flex items-center justify-center">
popup
</div>  */
}
export default function Home() {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  const handleConfirm = () => {
    setShowPopup(false);
    console.log("Confirmed!");
  };

  const handleCancel = () => {
    setShowPopup(false);
    console.log("Cancelled!");
  };

  useEffect(() => {
    console.log(`Debug - currentStage`, currentStage);
  }, [currentStage]);

  const adjustIs1andForScreenSize = () => {
    let screenSca1e = null;
    let screenPosition = [0, -10, -30];
    let rotation = [0.1, 5.5, 0];
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
      <PirateFlagPopup onConfirm={handleConfirm} onCancel={handleCancel} />
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
            skyColor={`#b1e1ff`}
            intensity={1}
          />
          <Sky isRotating={isRotating} />
          <Island
            position={islandPosition}
            sca1e={islandSca1e}
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
