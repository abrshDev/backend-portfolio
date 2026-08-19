import { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20">
      {/* Vercel-style cross line with + markers */}
      <div className="hidden lg:block relative -mx-5 md:-mx-10 mb-8">
        <div className="relative h-px bg-neutral-200 dark:bg-neutral-800">
          <div className="cross-marker left-0" />
          <div className="cross-marker left-full" />
        </div>
      </div>
      <h2 className="mb-8 flex items-center gap-3 border-b border-neutral-300 pb-5 text-2xl font-bold tracking-tight text-black dark:border-neutral-700 dark:text-white sm:text-3xl">
        <span
          className="h-2.5 w-2.5 shrink-0 bg-black dark:bg-white"
          aria-hidden="true"
        />
        <span>{title}</span>
      </h2>
      {children}
    </section>
  );
}
