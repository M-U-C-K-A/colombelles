import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { themeStyle } from "@/lib/themes";
import { PageHeader } from "@/components/site/page-header";
import { formatDate } from "@/lib/format";
import { getDocumentCategories, getDocuments } from "@/lib/queries";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Journal municipal, procès-verbaux du conseil, budget, guides et documents réglementaires de la Ville de Colombelles.",
};

export default async function Page({ searchParams }: PageProps<"/publications">) {
  const { categorie } = await searchParams;
  const active = typeof categorie === "string" ? categorie : null;

  const [all, categories] = await Promise.all([getDocuments(), getDocumentCategories()]);
  const items = active ? all.filter((d) => d.category === active) : all;

  return (
    <>
      <PageHeader
        theme={"mairie"}
        crumbs={[{ label: "Publications" }]}
        eyebrow={`${all.length} documents en ligne`}
        title="Publications"
        lead="Journal municipal, comptes rendus du conseil, budget, guides pratiques et documents réglementaires."
      />

      <div style={themeStyle("mairie")} className="swiss-container py-12 md:py-16">
        <nav aria-label="Filtrer par catégorie" className="rule-bottom flex flex-wrap gap-2 pb-6">
          <Filter href="/publications" active={!active}>
            Tous les documents
          </Filter>
          {categories.map((category) => (
            <Filter
              key={category}
              href={`/publications?categorie=${encodeURIComponent(category)}`}
              active={active === category}
            >
              {category}
            </Filter>
          ))}
        </nav>

        {items.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            Aucun document dans cette catégorie.
          </p>
        ) : (
          <ul className="mt-10">
            {items.map((doc) => (
              <li key={doc.id}>
                <a
                  href={doc.url}
                  className="group flex flex-col gap-4 rule-bottom py-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="flex min-w-0 items-start gap-4">
                    <FileText
                      className="mt-0.5 size-5 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span className="min-w-0">
                      <span className="block leading-snug font-medium transition-colors group-hover:text-theme">
                        {doc.title}
                      </span>
                      <span className="eyebrow mt-2 block text-muted-foreground">
                        {doc.category} · publié le {formatDate(doc.publishedAt)}
                      </span>
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-4 pl-9 sm:pl-0">
                    <span className="numeral eyebrow text-muted-foreground">
                      {doc.fileType} · {doc.size}
                    </span>
                    <Download className="size-4" aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-12 max-w-[70ch] text-xs leading-relaxed text-muted-foreground">
          Certains documents ne sont pas encore pleinement accessibles aux technologies
          d&apos;assistance. Une version alternative peut être demandée à{" "}
          <a href="mailto:accessibilite@colombelles.fr" className="link-underline">
            accessibilite@colombelles.fr
          </a>
          .
        </p>
      </div>
    </>
  );
}

function Filter({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={cn(
        "border px-4 py-2 text-sm transition-colors",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}
