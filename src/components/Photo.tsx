import Image from "next/image";
import { site } from "@/lib/site";

/**
 * The source portrait is a 300x300 transparent circular cutout, so it is
 * framed as a disc rather than boxed — anything larger would soften it.
 */
const Photo: React.FC = () => (
  <div className="relative mx-auto w-[220px] sm:w-[260px] lg:w-[288px]">
    <div className="relative aspect-square overflow-hidden rounded-full border border-line bg-surface">
      <Image
        src={site.portrait}
        alt={`Portrait of ${site.name}`}
        fill
        priority
        quality={92}
        sizes="288px"
        className="object-cover"
      />
    </div>
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-4 rounded-full border border-line"
    />
  </div>
);

export default Photo;
