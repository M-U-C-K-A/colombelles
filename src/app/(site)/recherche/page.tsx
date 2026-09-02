import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { themeStyle } from "@/lib/themes";
import { PageHeader } from "@/components/site/page-header";
import { formatDate } from "@/lib/format";
import { search } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Recherche",
  description: "Rechercher une page, une actualité, un document ou une association.",
  robots: { index: false, follow: true },
};

export default async function Page({ searchParams }: PageProps<"/recherche">) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q : "";
  const results = query.trim().length >= 2 ? await search(query) : [];

  return (
    <>
      <PageHeader
        theme={"mairie"}
        crumbs={[{ label: "Recherche" }]}
        eyebrow={
          query
            ? `${results.length} résultat${results.length > 1 ? "s" : ""}`
            : "Recherche sur le site"
        }
        title={query ? `« ${query} »` : "Rechercher"}
      />

      <div style={themeStyle("mairie")} className="swiss-container py-12 md:py-16">
        <form action="/recherche" method="get" role="search" className="rule-bottom flex gap-3 pb-8">
          <label htmlFor="q" className="sr-only">
            Votre recherche
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Démarche, actualité, association…"
            className="flex-1 border border-input bg-background px-4 py-3 text-base focus:border-foreground focus:outline-none"
          />
          <button
            type="submit"
            className="bg-foreground px-7 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Rechercher
          </button>
        </form>

        {query.trim().length < 2 ? (
          <p className="py-16 text-muted-foreground">
            Saisissez au moins deux caractères pour lancer une recherche.
          </p>
        ) : results.length === 0 ? (
          <div className="py-16">
            <p className="text-lg">Aucun résultat pour « {query} ».</p>
            <p className="mt-4 max-w-[60ch] text-muted-foreground">
              Vérifiez l&apos;orthographe ou essayez un terme plus général. Vous pouvez aussi
              parcourir les rubriques ou{" "}
              <Link href="/contact" className="link-underline">
                contacter la mairie
              </Link>
              .
            </p>
          </div>
        ) : (
          <ul className="mt-8">
            {results.map((result, index) => (
              <li key={`${result.href}-${index}`}>
                <Link
                  href={result.href}
                  className="group flex items-start justify-between gap-8 rule-bottom py-6"
                >
                  <span className="min-w-0">
                    <span className="eyebrow text-theme">{result.type}</span>
                    <span className="mt-2 block text-lg leading-snug font-medium transition-colors group-hover:text-theme">
                      {result.title}
                    </span>
                    {result.excerpt && (
                      <span className="mt-2 block max-w-[70ch] text-sm leading-relaxed text-muted-foreground">
                        {result.excerpt}
                      </span>
                    )}
                    {result.date && (
                      <span className="numeral eyebrow mt-2 block text-muted-foreground">
                        {formatDate(result.date)}
                      </span>
                    )}
                  </span>
                  <ArrowUpRight className="mt-1 size-5 shrink-0" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
