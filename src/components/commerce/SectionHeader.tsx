import type { ReactNode } from "react";

type SectionHeaderProps = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export function SectionHeader({ id, eyebrow, title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="commerce-section-head flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <p className="commerce-eyebrow">{eyebrow}</p>
        <h2 id={id} className="commerce-title">
          {title}
        </h2>
        {subtitle ? <p className="commerce-subtitle">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}
