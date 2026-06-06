type PriceBadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "summer" | "muted";
};

export function PriceBadge({ children, variant = "default" }: PriceBadgeProps) {
  const styles = {
    default: "bg-eden-headline/10 text-eden-headline",
    summer: "bg-eden-accent text-white",
    muted: "bg-eden-bg text-eden-paragraph ring-1 ring-eden-cream-dark",
  };

  return (
    <span
      className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
