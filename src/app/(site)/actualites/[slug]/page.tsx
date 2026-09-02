import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { NewsCard } from "@/components/site/cards";
import { themeStyle } from "@/lib/themes";
import { PageHeader, SectionTitle } from "@/components/site/page-header";
import { formatDate } from "@/lib/format";
import { Markdown, plainText } from "@/lib/markdown";
import { getNews, getNewsBySlug } from "@/lib/queries";

export async function generateStaticParams() {
  const news = await getNews();
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/actualites/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return { title: "Article introuvable" };
  return {
    title: item.title,
    description: item.excerpt || plainText(item.content, 160),
    openGraph: {
      type: "article",
      title: item.title,
      description: item.excerpt,
      publishedTime: item.publishedAt,
    },
  };
}

export default async function Page({ params }: PageProps<"/actualites/[slug]">) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) notFound();

  const others = (await getNews()).filter((n) => n.id !== item.id).slice(0, 3);

  return (
    <>
      <PageHeader
        theme={item.theme}
        crumbs={[
          { label: "Actualités", href: "/actualites" },
          { label: item.category, href: `/actualites?categorie=${encodeURIComponent(item.category)}` },
          { label: item.title },
        ]}
        eyebrow={item.category}
        title={item.title}
        lead={item.excerpt}
      />

      <div style={themeStyle(item.theme)} className="swiss-container py-14 md:py-20">
        <div className="swiss-grid">
          <aside className="col-span-4 md:col-span-8 lg:col-span-3">
            <dl className="rule-strong space-y-5 pt-4 text-sm lg:sticky lg:top-28">
              <div>
                <dt className="eyebrow text-muted-foreground">Publié le</dt>
                <dd className="numeral mt-1.5">
                  <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">Rédaction</dt>
                <dd className="mt-1.5">{item.author}</dd>
              </div>
              {item.tags.length > 0 && (
                <div>
                  <dt className="eyebrow text-muted-foreground">Mots-clés</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className="border border-border px-2 py-1 text-xs">
                        {tag}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </aside>

          <article className="col-span-4 mt-12 md:col-span-8 lg:col-span-8 lg:col-start-5 lg:mt-0">
            <Markdown content={item.content} className="prose-swiss" />

            <Link
              href="/actualites"
              className="mt-14 inline-flex items-center gap-2 border-b-2 border-foreground pb-1 text-sm font-medium"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Retour aux actualités
            </Link>
          </article>
        </div>

        {others.length > 0 && (
          <section className="mt-24">
            <SectionTitle title="À lire également" />
            <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-3">
              {others.map((other) => (
                <NewsCard key={other.id} item={other} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
