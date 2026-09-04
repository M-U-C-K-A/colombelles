import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import { Hint } from "@/components/admin/admin-hints";
import { cn } from "@/lib/utils";

/** En-tête de page d'administration : fil d'Ariane, titre, action principale. */
export function AdminHeader({
  crumbs = [],
  title,
  description,
  action,
}: {
  crumbs?: { label: string; href?: string }[];
  title: string;
  description?: string;
  action?: { label: string; href: string } | React.ReactNode;
}) {
  return (
    <header className="border-b border-border px-6 py-8 lg:px-10 lg:py-10">
      {crumbs.length > 0 && (
        <nav aria-label="Fil d'Ariane" className="mb-5">
          <ol className="flex flex-wrap items-center gap-x-2">
            <li className="flex items-center gap-2">
              <Link href="/admin" className="eyebrow text-muted-foreground hover:text-foreground">
                Administration
              </Link>
              <ChevronRight className="size-3 text-muted-foreground" aria-hidden="true" />
            </li>
            {crumbs.map((crumb, index) => (
              <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                {crumb.href && index < crumbs.length - 1 ? (
                  <Link
                    href={crumb.href}
                    className="eyebrow text-muted-foreground hover:text-foreground"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="eyebrow">{crumb.label}</span>
                )}
                {index < crumbs.length - 1 && (
                  <ChevronRight className="size-3 text-muted-foreground" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-medium tracking-[-0.03em]">{title}</h1>
          {description && (
            <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {action &&
          (typeof action === "object" && action !== null && "href" in action ? (
            <Link
              href={(action as { href: string }).href}
              className="inline-flex shrink-0 items-center gap-2 bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <Plus className="size-4" aria-hidden="true" />
              {(action as { label: string }).label}
            </Link>
          ) : (
            action
          ))}
      </div>
    </header>
  );
}

export function AdminBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-6 py-8 lg:px-10", className)}>{children}</div>;
}

const STATUS_STYLES: Record<string, string> = {
  publie: "border-emerald-600/40 bg-emerald-600/10 text-emerald-700 dark:text-emerald-400",
  brouillon: "border-amber-600/40 bg-amber-600/10 text-amber-700 dark:text-amber-400",
  nouveau: "border-rouge/40 bg-rouge/10 text-rouge",
  en_cours: "border-acier/40 bg-acier/10 text-acier",
  traite: "border-emerald-600/40 bg-emerald-600/10 text-emerald-700 dark:text-emerald-400",
  rejete: "border-border bg-muted text-muted-foreground",
};

const STATUS_LABELS: Record<string, string> = {
  publie: "Publié",
  brouillon: "Brouillon",
  nouveau: "Nouveau",
  en_cours: "En cours",
  traite: "Traité",
  rejete: "Rejeté",
};

/** Ce que chaque état veut dire, une fois le badge survolé. */
const STATUS_HINTS: Record<string, string> = {
  publie: "Visible sur le site public.",
  brouillon: "Enregistré, mais absent du site public.",
  nouveau: "Signalement reçu, pas encore pris en charge.",
  en_cours: "Signalement pris en charge par un service.",
  traite: "Signalement résolu.",
  rejete: "Signalement écarté : hors compétence, doublon ou sans suite.",
};

export function StatusBadge({ status }: { status: string }) {
  const badge = (
    <span
      className={cn(
        "inline-flex shrink-0 items-center border px-2 py-0.5 text-[0.6875rem] font-medium tracking-wide uppercase",
        STATUS_STYLES[status] ?? "border-border bg-muted text-muted-foreground",
      )}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );

  const hint = STATUS_HINTS[status];
  return hint ? <Hint label={hint}>{badge}</Hint> : badge;
}

/** Tuile de statistique du tableau de bord. */
export function StatTile({
  label,
  value,
  hint,
  href,
  accent,
}: {
  label: string;
  value: number | string;
  hint?: string;
  href?: string;
  accent?: boolean;
}) {
  const content = (
    <>
      <p className="eyebrow text-muted-foreground">{label}</p>
      <p
        className={cn(
          "numeral mt-4 text-4xl leading-none font-medium tracking-[-0.03em]",
          accent && "text-rouge",
        )}
      >
        {value}
      </p>
      {hint && <p className="mt-3 text-xs text-muted-foreground">{hint}</p>}
    </>
  );

  const className = "block h-full border border-border p-6 transition-colors";

  return href ? (
    <Link href={href} className={cn(className, "hover:border-foreground")}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="border border-dashed border-border px-8 py-20 text-center">
      <p className="text-lg font-medium">{title}</p>
      <p className="mx-auto mt-3 max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {action && (
        <Link
          href={action.href}
          className="mt-8 inline-flex items-center gap-2 bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" aria-hidden="true" />
          {action.label}
        </Link>
      )}
    </div>
  );
}
