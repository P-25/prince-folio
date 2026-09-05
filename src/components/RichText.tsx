/** Renders a sentence where selected phrases carry emphasis. */
export interface Segment {
  text: string;
  bold?: boolean;
}

const RichText: React.FC<{ segments: Segment[] }> = ({ segments }) => (
  <>
    {segments.map((segment, index) =>
      segment.bold ? (
        <strong key={index} className="font-semibold text-ink">
          {segment.text}
        </strong>
      ) : (
        <span key={index}>{segment.text}</span>
      )
    )}
  </>
);

export default RichText;
