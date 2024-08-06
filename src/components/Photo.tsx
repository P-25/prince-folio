import Image from "next/image";

const Photo: React.FC = () => {
  return (
    <div className="w-full h-full relative">
      {/* image */}
      <div className="w-[300px] h-[300px] xl:w-[400px] xl:h-[400px] mix-blend-lighten">
        <Image
          src="/assets/photo.png"
          priority
          quality={100}
          fill
          alt=""
          sizes="(max-width: 400px) 100vw, (max-width: 1200px) 50vw, 300px"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Photo;
