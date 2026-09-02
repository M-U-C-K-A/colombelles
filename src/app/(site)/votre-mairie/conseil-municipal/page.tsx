import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader, SectionTitle } from "@/components/site/page-header";
import { formatDate } from "@/lib/format";
import { getDocuments, getElus, getUpcomingEvents } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Conseil municipal",
  description:
    "Composition du conseil municipal de Colombelles, groupes politiques, fonctionnement des commissions, prochaines séances et procès-verbaux.",
};

export default async function Page() {
  const [elus, documents, events] = await Promise.all([
    getElus(),
    getDocuments(),
    getUpcomingEvents(),
  ]);

  const groups = [...new Set(elus.map((e) => e.group))];
  const pv = documents.filter((d) => d.category === "Conseil municipal");
  const nextSession = events.find((e) => e.category === "Vie municipale");

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Votre mairie", href: "/votre-mairie" }, { label: "Conseil municipal" }]}
        eyebrow="Instances municipales"
        title="Le conseil municipal"
        lead="Composé de 27 élus, le conseil municipal règle par ses délibérations les affaires de la commune. Ses séances sont publiques."
        aside={
          nextSession ? (
            <div className="rule-strong pt-4">
              <p className="eyebrow text-muted-foreground">Prochaine séance</p>
              <p className="numeral mt-3 text-2xl font-medium">
                {formatDate(nextSession.startsAt)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{nextSession.location}</p>
              <Link
                href={`/agenda/${nextSession.slug}`}
                className="eyebrow mt-4 inline-block text-rouge"
              >
                Ordre du jour →
              </Link>
            </div>
          ) : undefined
        }
      />

      <div className="swiss-container py-14 md:py-20">
        <section>
          <SectionTitle index="01" title="Composition" />
          <div className="mt-10 space-y-12">
            {groups.map((group) => {
              const members = elus.filter((e) => e.group === group);
              return (
                <div key={group} className="swiss-grid">
                  <div className="col-span-4 md:col-span-8 lg:col-span-3">
                    <p className="text-sm font-medium">{group}</p>
                    <p className="numeral eyebrow mt-2 text-muted-foreground">
                      {members.length} élus
                    </p>
                  </div>
                  <ul className="col-span-4 grid gap-x-8 md:col-span-8 md:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
                    {members.map((elu) => (
                      <li key={elu.id} className="rule-bottom py-2.5 text-sm">
                        <span className="font-medium">{elu.name}</span>
                        {!elu.role.startsWith("Conseill") && (
                          <span className="ml-2 text-muted-foreground">— {elu.role}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-20">
          <SectionTitle index="02" title="Fonctionnement" />
          <div className="swiss-grid mt-10">
            <div className="col-span-4 md:col-span-8 lg:col-span-8">
              <div className="prose-swiss">
                <p>
                  Le conseil municipal se réunit au moins une fois par trimestre, sur
                  convocation de la maire. L&apos;ordre du jour est affiché en mairie et publié
                  sur ce site au moins cinq jours francs avant la séance.
                </p>
                <p>
                  Les séances sont publiques, sauf décision de huis clos. Toute personne peut y
                  assister depuis les places réservées au public. Les délibérations sont
                  consultables en mairie et les procès-verbaux publiés après approbation.
                </p>
                <h2>Les commissions</h2>
                <ul>
                  <li>Finances, administration générale et ressources humaines</li>
                  <li>Urbanisme, travaux et cadre de vie</li>
                  <li>Éducation, enfance et jeunesse</li>
                  <li>Solidarité, santé et logement</li>
                  <li>Culture, sport et vie associative</li>
                  <li>Transition écologique et mobilités</li>
                </ul>
                <p>
                  Chaque commission prépare les dossiers soumis au conseil. Elle est présidée
                  par la maire et comprend des élus de chaque groupe, à la représentation
                  proportionnelle.
                </p>
                <h2>Expression des groupes</h2>
                <p>
                  Conformément au code général des collectivités territoriales, chaque groupe
                  dispose d&apos;un espace d&apos;expression dans le journal municipal. Les
                  tribunes sont publiées sans modification de la rédaction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {pv.length > 0 && (
          <section className="mt-20">
            <SectionTitle
              index="03"
              title="Procès-verbaux"
              action={
                <Link
                  href="/publications?categorie=Conseil+municipal"
                  className="eyebrow text-rouge"
                >
                  Tous les documents →
                </Link>
              }
            />
            <ul className="mt-6">
              {pv.map((doc) => (
                <li key={doc.id} className="rule-bottom">
                  <a href={doc.url} className="group flex items-center justify-between gap-6 py-4">
                    <span className="text-sm font-medium transition-colors group-hover:text-rouge">
                      {doc.title}
                    </span>
                    <span className="flex shrink-0 items-center gap-4">
                      <span className="eyebrow text-muted-foreground">
                        {doc.fileType} · {doc.size}
                      </span>
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
