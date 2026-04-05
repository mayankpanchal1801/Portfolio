interface SectionHeadingProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

export default function SectionHeading({
  children,
  className = '',
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <Tag
      className={`font-display font-bold text-display text-chalk leading-tight tracking-tight ${className}`}
    >
      {children}
    </Tag>
  )
}
