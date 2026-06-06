import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

export function ServiceCard({ title, description, href, icon }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border-2 border-eden-cream-dark bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:border-eden-accent/40 hover:shadow-xl hover:rotate-[-1deg]"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-eden-bg text-eden-accent transition group-hover:bg-eden-accent group-hover:text-white">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-eden-headline">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-eden-accent">
        Saznaj više
        <svg className="h-4 w-4 transition group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
