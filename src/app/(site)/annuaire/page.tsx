import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { themeStyle } from "@/lib/themes";
import { PageHeader } from "@/components/site/page-header";
import { telHref } from "@/lib/format";
import { getDirectory } from "@/lib/queries";
import { cn } from "@/lib/utils";
import type { DirectoryType } from "@/lib/types";

export const metadata: Metadata = {
  title: "Annuaire",
  description:
    "Associations, commerces et équipements de Colombelles : coordonnées, activités et contacts.",
};

const TYPES: { key: DirectoryType | "tous"; label: string }[] = [
  { key: "tous", label: "Tout l'annuaire" },
  { key: "association", label: "Associations" },
  { key: "commerce", label: "Commerces" },
  { key: "equipement", label: "Équipements et services" },
];

export default async function Page({ searchParams }: PageProps<"/annuaire">) {
  const { type } = await searchParams;
  const active = typeof type === "string" ? type : "tous";

  const all = await getDirectory();
  const items = active === "tous" ? all : all.filter((i) => i.type === active);

  const byCategory = new Map<string, typeof items>();
  for (const item of items) {
    byCategory.set(item.category, [...(byCategory.get(item.category) ?? []), item]);
  }
  const categories = [...byCategory.entries()].sort((a, b) => a[0].localeCompare(b[0], "fr"));

  return (
    <>
      <PageHeader
        theme={"culture"}
        crumbs={[{ label: "Annuaire" }]}
        eyebrow={`${all.length} structures référencées`}
        title="Annuaire"
        lead="Les associations, commerces et équipements de la commune. Pour être référencé ou corriger une fiche, écrivez à l'accueil de la mairie."
      />

      <div style={themeStyle("culture")} className="swiss-container py-12 md:py-16">
        <nav aria-label="Filtrer l'annuaire" className="rule-bottom flex flex-wrap gap-2 pb-6">
          {TYPES.map((item) => (
            <Link
              key={item.key}
              href={item.key === "tous" ? "/annuaire" : `/annuaire?type=${item.key}`}
              aria-current={active === item.key ? "true" : undefined}
              className={cn(
                "border px-4 py-2 text-sm transition-colors",
                active === item.key
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-14 space-y-16">
          {categories.map(([category, entries]) => (
            <section key={category}>
              <div className="swiss-grid">
                <div className="col-span-4 md:col-span-8 lg:col-span-3">
                  <h2 className="rule-strong pt-4 text-lg font-medium tracking-[-0.02em] lg:sticky lg:top-28">
                    {category}
                    <span className="numeral eyebrow mt-2 block text-muted-foreground">
                      {entries.length} structure{entries.length > 1 ? "s" : ""}
                    </span>
                  </h2>
                </div>
                <ul className="col-span-4 md:col-span-8 lg:col-span-9">
                  {entries.map((entry) => (
                    <li key={entry.id} id={entry.id} className="rule-bottom py-6 first:pt-0">
                      <h3 className="text-lg leading-snug font-medium">{entry.name}</h3>
                      <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
                        {entry.description}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-2 text-sm">
                        <li className="inline-flex items-center gap-2 text-muted-foreground">
                          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                          {entry.address}
                        </li>
                        {entry.phone && (
                          <li className="inline-flex items-center gap-2">
                            <Phone className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                            <a href={`tel:${telHref(entry.phone)}`} className="link-underline numeral">
                              {entry.phone}
                            </a>
                          </li>
                        )}
                        {entry.email && (
                          <li className="inline-flex items-center gap-2">
                            <Mail className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                            <a href={`mailto:${entry.email}`} className="link-underline break-all">
                              {entry.email}
                            </a>
                          </li>
                        )}
                        {entry.website && (
                          <li className="inline-flex items-center gap-2">
                            <Globe className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                            <a
                              href={entry.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link-underline"
                            >
                              Site internet
                            </a>
                          </li>
                        )}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
