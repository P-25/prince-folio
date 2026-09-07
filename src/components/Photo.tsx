import Image from "next/image";
import { site } from "@/lib/site";

/**
 * Framed as a disc rather than boxed, with a hairline ring set off from it.
 * The source is a 1200x1200 square, so it is cropped to the circle by CSS.
 */
const Photo: React.FC = () => (
  <div className="relative mx-auto w-[200px] sm:w-[230px] lg:w-[248px]">
    <div className="relative aspect-square overflow-hidden rounded-full border border-line bg-surface">
      <Image
        src={site.portrait}
        alt={`Portrait of ${site.name}`}
        fill
        priority
        quality={92}
        sizes="248px"
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
