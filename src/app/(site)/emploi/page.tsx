import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarClock } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { formatDate } from "@/lib/format";
import { getJobs } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Offres d'emploi",
  description:
    "Les postes à pourvoir à la Ville de Colombelles : filière technique, animation, administrative, culturelle.",
};

export default async function Page() {
  const jobs = await getJobs();

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Offres d'emploi" }]}
        eyebrow={`${jobs.length} poste${jobs.length > 1 ? "s" : ""} à pourvoir`}
        title="Offres d'emploi"
        lead="La Ville de Colombelles emploie 140 agents dans une vingtaine de métiers. Les candidatures spontanées sont également étudiées."
      />

      <div className="swiss-container py-14 md:py-20">
        {jobs.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            Aucune offre en cours. Les candidatures spontanées restent les bienvenues.
          </p>
        ) : (
          <ul>
            {jobs.map((job, index) => (
              <li key={job.id}>
                <Link
                  href={`/emploi/${job.slug}`}
                  className="group flex flex-col gap-5 rule-bottom py-7 lg:flex-row lg:items-center lg:gap-10"
                >
                  <span className="numeral eyebrow shrink-0 text-rouge lg:w-12">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xl leading-snug font-medium tracking-[-0.02em] transition-colors group-hover:text-rouge">
                      {job.title}
                    </span>
                    <span className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                      <span>{job.department}</span>
                      <span>{job.contract}</span>
                      <span>{job.timeframe}</span>
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-5">
                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarClock className="size-4" aria-hidden="true" />
                      <span className="numeral">
                        Jusqu&apos;au {formatDate(`${job.deadline}T12:00:00.000Z`)}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <section className="mt-16 border-2 border-foreground p-8">
          <h2 className="text-xl font-medium tracking-[-0.02em]">Candidature spontanée</h2>
          <p className="mt-4 max-w-[62ch] leading-relaxed text-muted-foreground">
            Adressez votre CV et votre lettre de motivation à Madame la Maire, en précisant le
            ou les métiers visés. Les candidatures sont conservées un an et réexaminées à
            chaque ouverture de poste.
          </p>
          <a
            href="mailto:recrutement@colombelles.fr"
            className="mt-6 inline-flex items-center gap-2 bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            recrutement@colombelles.fr
          </a>
        </section>
      </div>
    </>
  );
}
