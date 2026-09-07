import QuietLink from "./QuietLink";

/** Renders a sentence where selected phrases carry emphasis, and optionally
 *  link out without looking like links. */
export interface Segment {
  text: string;
  bold?: boolean;
  href?: string;
}

const RichText: React.FC<{ segments: Segment[] }> = ({ segments }) => (
  <>
    {segments.map((segment, index) => {
      const content = <QuietLink href={segment.href}>{segment.text}</QuietLink>;

      return segment.bold ? (
        <strong key={index} className="font-semibold text-ink">
          {content}
        </strong>
      ) : (
        <span key={index}>{content}</span>
      );
    })}
  </>
);

export default RichText;
