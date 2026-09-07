import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  /** Small uppercase label above the section. */
  label?: string;
  /** Optional link shown opposite the label. */
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  id,
  label,
  action,
  className,
  children,
}) => (
  <section id={id} className={cn("border-t border-line", className)}>
    <div className="shell py-10 md:py-14">
      {(label || action) && (
        <div className="mb-4 flex items-baseline justify-between gap-6">
          {label ? <h2 className="label">{label}</h2> : <span />}
          {action}
        </div>
      )}
      {children}
    </div>
  </section>
);

export default Section;
