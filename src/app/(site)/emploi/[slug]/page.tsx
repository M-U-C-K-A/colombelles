import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { formatDate } from "@/lib/format";
import { Markdown, plainText } from "@/lib/markdown";
import { getJobBySlug, getJobs } from "@/lib/queries";

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/emploi/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return { title: "Offre introuvable" };
  return {
    title: job.title,
    description: plainText(job.description, 160),
  };
}

export default async function Page({ params }: PageProps<"/emploi/[slug]">) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Offres d'emploi", href: "/emploi" }, { label: job.title }]}
        eyebrow={job.department}
        title={job.title}
      />

      <div className="swiss-container py-14 md:py-20">
        <div className="swiss-grid">
          <aside className="col-span-4 md:col-span-8 lg:col-span-3">
            <dl className="rule-strong space-y-5 pt-4 text-sm lg:sticky lg:top-28">
              {[
                ["Service", job.department],
                ["Statut", job.contract],
                ["Temps de travail", job.timeframe],
                ["Publié le", formatDate(job.publishedAt)],
                ["Candidature avant le", formatDate(`${job.deadline}T12:00:00.000Z`)],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="eyebrow text-muted-foreground">{label}</dt>
                  <dd className="mt-1.5">{value}</dd>
                </div>
              ))}
            </dl>

            <a
              href={`mailto:recrutement@colombelles.fr?subject=${encodeURIComponent(
                `Candidature — ${job.title}`,
              )}`}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Postuler par courriel
            </a>
          </aside>

          <article className="col-span-4 mt-12 md:col-span-8 lg:col-span-8 lg:col-start-5 lg:mt-0">
            <Markdown content={job.description} className="prose-swiss" />
            <Link
              href="/emploi"
              className="mt-14 inline-flex items-center gap-2 border-b-2 border-foreground pb-1 text-sm font-medium"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Toutes les offres
            </Link>
          </article>
        </div>
      </div>
    </>
  );
}
