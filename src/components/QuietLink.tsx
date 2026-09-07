/**
 * A link with no visual affordance whatsoever: it inherits colour and weight,
 * draws no underline, changes nothing on hover or click, and does not even
 * swap the cursor. Only the keyboard focus ring remains, so the link is still
 * reachable by tab without showing up for mouse users.
 *
 * Renders its children as plain text when there is no href, so a company
 * without a URL simply is not a link.
 */
const QuietLink: React.FC<{
  href?: string | null;
  children: React.ReactNode;
}> = ({ href, children }) => {
  if (!href) return <>{children}</>;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-[inherit] text-inherit no-underline hover:text-inherit hover:no-underline"
    >
      {children}
    </a>
  );
};

export default QuietLink;
