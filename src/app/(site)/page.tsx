import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { EventCard, NewsCard } from "@/components/site/cards";
import { ColorLegend, ColorRule, SPECTRUM } from "@/components/site/horizon";
import { SectionTitle } from "@/components/site/page-header";
import { QUICK_ACCESS } from "@/lib/navigation";
import { telHref } from "@/lib/format";
import { themeStyle } from "@/lib/themes";
import {
  getDocuments,
  getNews,
  getPageBySlug,
  getSettings,
  getUpcomingEvents,
} from "@/lib/queries";

export default async function HomePage() {
  const [settings, news, events, documents, smn] = await Promise.all([
    getSettings(),
    getNews(),
    getUpcomingEvents(5),
    getDocuments(),
    getPageBySlug("societe-metallurgique-de-normandie"),
  ]);

  const [lead, ...rest] = news;
  const secondary = rest.slice(0, 2);
  const brief = rest.slice(2, 7);

  return (
    <>
      {/* ================= Ouverture ================= */}
      <section>
        <div className="swiss-container py-14 md:py-20">
          <div className="swiss-grid items-end">
            <div className="col-span-4 md:col-span-8 lg:col-span-7">
              <p className="eyebrow text-muted-foreground">
                {settings.postalCode} · {settings.intercommunalite}
              </p>
              <h1 className="display mt-6 text-[3rem] sm:text-[4.5rem] lg:text-[5.75rem]">
                Colombelles
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Les couleurs de l&apos;horizon
              </p>
              <p className="mt-8 max-w-[46ch] leading-relaxed text-muted-foreground md:text-lg">
                Une ville née de la sidérurgie, devenue laboratoire de sa propre
                reconversion. {settings.population} habitants sur la rive droite de l&apos;Orne,
                à cinq kilomètres de Caen.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/demarches"
                  style={themeStyle("contact")}
                  className="theme-bg inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
                >
                  Faire une démarche
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-foreground px-6 py-3.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
                >
                  Contacter la mairie
                </Link>
              </div>
            </div>

            {/* Bloc pratique */}
            <aside className="col-span-4 mt-14 md:col-span-8 lg:col-span-5 lg:mt-0">
              <div style={themeStyle("contact")} className="theme-rule pt-4">
                <p className="eyebrow text-muted-foreground">Hôtel de ville</p>
                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex gap-3">
                    <dt className="sr-only">Adresse</dt>
                    <MapPin className="mt-0.5 size-4 shrink-0 text-theme" aria-hidden="true" />
                    <dd>
                      {settings.address}
                      <br />
                      {settings.postalCode} {settings.city}
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="sr-only">Téléphone</dt>
                    <Phone className="mt-0.5 size-4 shrink-0 text-theme" aria-hidden="true" />
                    <dd>
                      <a href={`tel:${telHref(settings.phone)}`} className="link-underline numeral">
                        {settings.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="sr-only">Horaires</dt>
                    <Clock className="mt-0.5 size-4 shrink-0 text-theme" aria-hidden="true" />
                    <dd className="w-full">
                      <ul className="space-y-1">
                        {settings.hours.slice(0, 5).map((slot) => (
                          <li key={slot.day} className="flex justify-between gap-4">
                            <span className="text-muted-foreground">{slot.day}</span>
                            <span className="numeral text-right">{slot.value}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href="/contact" className="eyebrow mt-3 inline-block text-theme">
                        Tous les horaires →
                      </Link>
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ColorRule />

      {/* ================= Accès rapide ================= */}
      <section className="rule-bottom">
        <div className="swiss-container py-12">
          <div className="mb-7 flex flex-wrap items-baseline justify-between gap-4">
            <p className="eyebrow text-muted-foreground">Accès rapide</p>
            <p className="text-xs text-muted-foreground">
              Chaque couleur signale un domaine : vous savez toujours où vous êtes.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
            {QUICK_ACCESS.map((item) => (
              <li key={item.label + item.href} style={themeStyle(item.theme)}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col justify-between gap-7 bg-background p-5 transition-colors hover:bg-theme hover:text-white"
                >
                  <span className="theme-bg block h-1.5 w-9 transition-all group-hover:w-16 group-hover:bg-white" />
                  <span>
                    <span className="block text-[0.9375rem] leading-snug font-medium">
                      {item.label}
                    </span>
                    <span className="mt-2 flex items-end justify-between gap-2">
                      <span className="text-xs text-muted-foreground group-hover:text-white/75">
                        {item.hint}
                      </span>
                      <ArrowUpRight
                        className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= Actualités ================= */}
      {lead && (
        <section className="swiss-container py-16 md:py-20">
          <div style={themeStyle("actu")}>
            <SectionTitle
              index="01"
              title="Actualités"
              action={
                <Link
                  href="/actualites"
                  className="eyebrow inline-flex items-center gap-1.5 text-theme"
                >
                  Toutes les actualités
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              }
            />
          </div>
          <div className="swiss-grid mt-10">
            <div className="col-span-4 md:col-span-8 lg:col-span-6">
              <NewsCard item={lead} size="large" />
            </div>
            <div className="col-span-4 grid gap-10 md:col-span-8 md:grid-cols-2 lg:col-span-6">
              {secondary.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {brief.length > 0 && (
            <div className="swiss-grid mt-14">
              <div className="col-span-4 md:col-span-8 lg:col-span-3">
                <p className="eyebrow text-muted-foreground">En bref</p>
              </div>
              <div className="col-span-4 md:col-span-8 lg:col-span-9">
                <div className="rule-top">
                  {brief.map((item) => (
                    <NewsCard key={item.id} item={item} size="compact" />
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ================= Agenda + publications ================= */}
      <section className="rule-top bg-secondary/50">
        <div className="swiss-container py-16 md:py-20">
          <div className="swiss-grid">
            <div className="col-span-4 md:col-span-8 lg:col-span-7">
              <div style={themeStyle("culture")}>
                <SectionTitle
                  index="02"
                  title="Agenda"
                  action={
                    <Link
                      href="/agenda"
                      className="eyebrow inline-flex items-center gap-1.5 text-theme"
                    >
                      Tout l&apos;agenda
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  }
                />
              </div>
              <div className="mt-4">
                {events.length > 0 ? (
                  events.map((item) => <EventCard key={item.id} item={item} />)
                ) : (
                  <p className="py-8 text-sm text-muted-foreground">
                    Aucun événement à venir pour le moment.
                  </p>
                )}
              </div>
            </div>

            <div
              style={themeStyle("mairie")}
              className="col-span-4 mt-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:mt-0"
            >
              <SectionTitle index="03" title="Publications" />
              <ul className="mt-4">
                {documents.slice(0, 6).map((doc) => (
                  <li key={doc.id} className="rule-bottom">
                    <a href={doc.url} className="group flex items-start justify-between gap-4 py-4">
                      <span>
                        <span className="block text-sm leading-snug font-medium transition-colors group-hover:text-theme">
                          {doc.title}
                        </span>
                        <span className="eyebrow mt-1.5 block text-muted-foreground">
                          {doc.fileType} · {doc.size}
                        </span>
                      </span>
                      <ArrowUpRight className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <Link
                href="/publications"
                className="eyebrow mt-5 inline-flex items-center gap-1.5 text-theme"
              >
                Toutes les publications
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Mémoire industrielle ================= */}
      <section style={themeStyle("patrimoine")} className="rule-top">
        <div className="swiss-container py-16 md:py-24">
          <div className="swiss-grid">
            <div className="col-span-4 md:col-span-8 lg:col-span-5">
              <p className="eyebrow theme-bg inline-block px-2 py-1">Patrimoine</p>
              <h2 className="display mt-6 text-[2.25rem] sm:text-[3rem]">
                La ville que la sidérurgie a bâtie
              </h2>
              <p className="mt-7 max-w-[44ch] leading-relaxed text-muted-foreground">
                {smn?.summary ??
                  "De 1909 à 1993, la Société métallurgique de Normandie a façonné la ville, son paysage et sa population."}
              </p>
              <dl className="mt-10 grid grid-cols-3 gap-6">
                {[
                  { value: "300", unit: "hectares reconvertis" },
                  { value: "6 000", unit: "salariés en 1974" },
                  { value: "84", unit: "ans d'activité" },
                ].map((stat) => (
                  <div key={stat.unit} className="theme-rule pt-3">
                    <dt className="sr-only">{stat.unit}</dt>
                    <dd>
                      <span className="numeral block text-3xl leading-none font-medium tracking-[-0.03em]">
                        {stat.value}
                      </span>
                      <span className="mt-2 block text-xs leading-snug text-muted-foreground">
                        {stat.unit}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/sortir-et-decouvrir/societe-metallurgique-de-normandie"
                className="eyebrow mt-10 inline-flex items-center gap-2 border-b-2 border-theme pb-1 text-theme"
              >
                Découvrir l&apos;histoire de la SMN
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>

            {/* Chronologie : le récit tient dans les dates, pas dans une image. */}
            <div className="col-span-4 mt-14 md:col-span-8 lg:col-span-6 lg:col-start-7 lg:mt-0">
              <p className="eyebrow rule-strong pt-4 pb-5 text-muted-foreground">
                Repères chronologiques
              </p>
              <ol>
                {[
                  ["1909", "August Thyssen acquiert les terrains au bord de l'Orne."],
                  ["1917", "Première coulée de la Société métallurgique de Normandie."],
                  ["1921", "La population passe de 178 à 2 301 habitants en sept ans."],
                  ["1944", "La commune est détruite à 80 % pendant la bataille de Caen."],
                  ["1974", "L'usine emploie près de 6 000 personnes."],
                  ["1993", "Dernière coulée, le 6 novembre."],
                  ["2026", "300 hectares reconvertis en quartiers et parc d'activités."],
                ].map(([year, text]) => (
                  <li
                    key={year}
                    className="rule-bottom grid grid-cols-[4.5rem_1fr] items-baseline gap-5 py-4"
                  >
                    <span className="numeral text-xl leading-none font-medium tracking-[-0.02em] text-theme">
                      {year}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Légende du code couleur ================= */}
      <section className="rule-top bg-secondary/40">
        <div className="swiss-container py-10">
          <p className="eyebrow mb-5 text-muted-foreground">Le code couleur du site</p>
          <ColorLegend themes={SPECTRUM} />
        </div>
      </section>
    </>
  );
}
