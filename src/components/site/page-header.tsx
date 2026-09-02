import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * En-tête de page : fil d'Ariane, indicatif de rubrique, titre en grande
 * échelle et chapô. Toute la hiérarchie tient dans la taille, pas dans la
 * décoration.
 */
export function PageHeader({
  crumbs = [],
  eyebrow,
  title,
  lead,
  aside,
}: {
  crumbs?: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: string;
  aside?: React.ReactNode;
}) {
  return (
    <header className="rule-bottom pt-8 pb-12 md:pt-12 md:pb-16">
      <div className="swiss-container">
        {crumbs.length > 0 && (
          <nav aria-label="Fil d'Ariane" className="mb-10">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li className="flex items-center gap-2">
                <Link href="/" className="eyebrow text-muted-foreground hover:text-foreground">
                  Accueil
                </Link>
                <ChevronRight className="size-3 text-muted-foreground" aria-hidden="true" />
              </li>
              {crumbs.map((crumb, index) => {
                const last = index === crumbs.length - 1;
                return (
                  <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                    {crumb.href && !last ? (
                      <Link
                        href={crumb.href}
                        className="eyebrow text-muted-foreground hover:text-foreground"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="eyebrow text-foreground" aria-current={last ? "page" : undefined}>
                        {crumb.label}
                      </span>
                    )}
                    {!last && (
                      <ChevronRight className="size-3 text-muted-foreground" aria-hidden="true" />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        <div className="swiss-grid items-end">
          <div className="col-span-4 md:col-span-8 lg:col-span-8">
            {eyebrow && <p className="eyebrow mb-5 text-rouge">{eyebrow}</p>}
            <h1 className="display text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem]">{title}</h1>
            {lead && (
              <p className="mt-7 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
                {lead}
              </p>
            )}
          </div>
          {aside && <div className="col-span-4 mt-8 md:col-span-8 lg:col-span-4 lg:mt-0">{aside}</div>}
        </div>
      </div>
    </header>
  );
}

/** Titre de section interne, avec numérotation façon grille suisse. */
export function SectionTitle({
  index,
  title,
  action,
}: {
  index?: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rule-strong flex items-baseline justify-between gap-6 pt-4 pb-5">
      <h2 className="flex items-baseline gap-4 text-xl font-medium tracking-[-0.02em] sm:text-2xl">
        {index && <span className="numeral text-sm font-normal text-rouge">{index}</span>}
        {title}
      </h2>
      {action}
    </div>
  );
}
