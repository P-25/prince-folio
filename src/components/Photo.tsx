import Image from "next/image";

const Photo: React.FC = () => {
  return (
    <div className="w-full h-full relative">
      {/* image */}
      <div className="w-[300px] h-[300px] xl:w-[300px] xl:h-[300px] mix-blend-lighten relative">
        <Image
          src="/assets/profile.webp"
          priority
          quality={100}
          fill
          alt="Prince Sharma - React and WordPress Expert"
          sizes="(max-width: 400px) 100vw, (max-width: 1200px) 50vw, 300px"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Photo;
