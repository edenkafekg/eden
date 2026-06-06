type InfoCardProps = {
  label: string;
  value: string;
  href?: string;
};

export function InfoCard({ label, value, href }: InfoCardProps) {
  const content = (
    <>
      <p className="text-xs font-semibold uppercase tracking-wider text-eden-accent">{label}</p>
      <p className="mt-1 text-base font-bold text-eden-headline sm:text-lg">{value}</p>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-2xl border border-eden-cream-dark bg-white px-5 py-4 transition hover:border-eden-accent/40 hover:shadow-sm"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="rounded-2xl border border-eden-cream-dark bg-white px-5 py-4">{content}</div>
  );
}
