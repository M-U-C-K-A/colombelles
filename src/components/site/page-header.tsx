import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { themeStyle, type ThemeKey } from "@/lib/themes";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * En-tête de page : un bandeau de couleur annonce le thème, puis le fil
 * d'Ariane, le titre en grande échelle et le chapô. La hiérarchie tient dans
 * l'échelle ; la couleur, elle, dit où l'on se trouve.
 */
export function PageHeader({
  theme,
  crumbs = [],
  eyebrow,
  title,
  lead,
  aside,
}: {
  theme?: ThemeKey;
  crumbs?: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: string;
  aside?: React.ReactNode;
}) {
  return (
    <header
      style={theme ? themeStyle(theme) : undefined}
      className="rule-bottom border-t-[6px] border-t-theme pt-8 pb-12 md:pt-10 md:pb-16"
    >
      <div className="swiss-container">
        {crumbs.length > 0 && (
          <nav aria-label="Fil d'Ariane" className="mb-9">
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
                      <span
                        className="eyebrow text-theme"
                        aria-current={last ? "page" : undefined}
                      >
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
            {eyebrow && (
              <p className="eyebrow theme-bg mb-6 inline-block px-2 py-1">{eyebrow}</p>
            )}
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

/** Titre de section interne, numéroté façon grille suisse. */
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
    <div className="rule-strong flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4 pb-5">
      <h2 className="flex items-baseline gap-4 text-xl font-medium tracking-[-0.02em] sm:text-2xl">
        {index && <span className="numeral text-sm font-normal text-theme">{index}</span>}
        {title}
      </h2>
      {action}
    </div>
  );
}
