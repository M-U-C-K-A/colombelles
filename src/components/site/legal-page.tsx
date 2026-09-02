import { notFound } from "next/navigation";
import { PageHeader } from "@/components/site/page-header";
import { formatDate } from "@/lib/format";
import { Markdown } from "@/lib/markdown";
import { getPage } from "@/lib/queries";
import { themeStyle } from "@/lib/themes";

/** Gabarit commun aux pages institutionnelles (mentions, RGPD, accessibilité). */
export async function LegalPage({ slug }: { slug: string }) {
  const page = await getPage("institutionnel", slug);
  if (!page) notFound();

  return (
    <>
      <PageHeader
        theme="mairie"
        crumbs={[{ label: page.title }]}
        eyebrow="Informations légales"
        title={page.title}
        lead={page.summary}
      />
      <div style={themeStyle("mairie")} className="swiss-container py-14 md:py-20">
        <div className="swiss-grid">
          <article className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-3">
            <Markdown content={page.content} className="prose-swiss" />
            <p className="mt-14 rule-top pt-4 text-xs text-muted-foreground">
              Page mise à jour le {formatDate(page.updatedAt)}
            </p>
          </article>
        </div>
      </div>
    </>
  );
}

export async function legalMetadata(slug: string) {
  const page = await getPage("institutionnel", slug);
  if (!page) return { title: "Page introuvable" };
  return { title: page.title, description: page.summary };
}
