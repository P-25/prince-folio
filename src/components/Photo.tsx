import Image from "next/image";

const Photo: React.FC = () => {
  return (
    <div className="w-full h-full relative">
      {/* image */}
      <div className="w-[300px] h-[300px] xl:w-[300px] xl:h-[300px] mix-blend-lighten relative">
        <Image
          src="/assets/profile.webp"
          priority
          quality={85}
          fill
          alt="Prince Sharma - React and WordPress Expert"
          sizes="(max-width: 768px) 300px, (max-width: 1200px) 300px, 300px"
          className="object-contain"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>
    </div>
  );
};

export default Photo;
