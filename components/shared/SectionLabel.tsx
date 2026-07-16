interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}

export default function SectionLabel({ children, className = "", accent }: SectionLabelProps) {
  return <span className={`eyebrow inline-block ${accent ? "eyebrow--acid" : ""} ${className}`}>{children}</span>;
}
