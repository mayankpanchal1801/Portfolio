interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`inline-block font-mono text-label uppercase tracking-[0.15em] text-gold mb-4 ${className}`}
    >
      {children}
    </span>
  )
}
