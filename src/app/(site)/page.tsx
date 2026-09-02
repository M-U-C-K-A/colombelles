import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { EventCard, NewsCard } from "@/components/site/cards";
import { SectionTitle } from "@/components/site/page-header";
import { QUICK_ACCESS } from "@/lib/navigation";
import { telHref } from "@/lib/format";
import {
  getNews,
  getSettings,
  getUpcomingEvents,
  getDocuments,
  getPageBySlug,
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
      <section className="rule-bottom">
        <div className="swiss-container py-14 md:py-20 lg:py-24">
          <div className="swiss-grid items-end">
            <div className="col-span-4 md:col-span-8 lg:col-span-7">
              <p className="eyebrow text-rouge">
                {settings.postalCode} · {settings.intercommunalite}
              </p>
              <h1 className="display mt-7 text-[3rem] sm:text-[4.5rem] lg:text-[6rem]">
                Colombelles
              </h1>
              <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
                Une ville née de l&apos;acier, devenue laboratoire de sa propre
                reconversion. {settings.population} habitants sur la rive droite de l&apos;Orne,
                à cinq kilomètres de Caen.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/demarches"
                  className="inline-flex items-center gap-2 bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
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
              <div className="rule-strong pt-4">
                <p className="eyebrow text-muted-foreground">Hôtel de ville</p>
                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex gap-3">
                    <dt className="sr-only">Adresse</dt>
                    <MapPin className="mt-0.5 size-4 shrink-0 text-rouge" aria-hidden="true" />
                    <dd>
                      {settings.address}
                      <br />
                      {settings.postalCode} {settings.city}
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="sr-only">Téléphone</dt>
                    <Phone className="mt-0.5 size-4 shrink-0 text-rouge" aria-hidden="true" />
                    <dd>
                      <a href={`tel:${telHref(settings.phone)}`} className="link-underline numeral">
                        {settings.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="sr-only">Horaires</dt>
                    <Clock className="mt-0.5 size-4 shrink-0 text-rouge" aria-hidden="true" />
                    <dd className="w-full">
                      <ul className="space-y-1">
                        {settings.hours.slice(0, 5).map((slot) => (
                          <li key={slot.day} className="flex justify-between gap-4">
                            <span className="text-muted-foreground">{slot.day}</span>
                            <span className="numeral text-right">{slot.value}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href="/contact" className="eyebrow mt-3 inline-block text-rouge">
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

      {/* ================= Accès rapide ================= */}
      <section className="rule-bottom bg-secondary/60">
        <div className="swiss-container py-12">
          <p className="eyebrow mb-7 text-muted-foreground">Accès rapide</p>
          <ul className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
            {QUICK_ACCESS.map((item) => (
              <li key={item.label + item.href}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col justify-between gap-6 bg-background p-5 transition-colors hover:bg-foreground hover:text-background"
                >
                  <span className="text-[0.9375rem] leading-snug font-medium">{item.label}</span>
                  <span className="flex items-end justify-between gap-2">
                    <span className="text-xs text-muted-foreground group-hover:text-background/70">
                      {item.hint}
                    </span>
                    <ArrowUpRight
                      className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
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
          <SectionTitle
            index="01"
            title="Actualités"
            action={
              <Link href="/actualites" className="eyebrow inline-flex items-center gap-1.5 text-rouge">
                Toutes les actualités
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            }
          />
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
              <SectionTitle
                index="02"
                title="Agenda"
                action={
                  <Link href="/agenda" className="eyebrow inline-flex items-center gap-1.5 text-rouge">
                    Tout l&apos;agenda
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                }
              />
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

            <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:mt-0">
              <SectionTitle index="03" title="Publications" />
              <ul className="mt-4">
                {documents.slice(0, 6).map((doc) => (
                  <li key={doc.id} className="rule-bottom">
                    <a
                      href={doc.url}
                      className="group flex items-start justify-between gap-4 py-4"
                    >
                      <span>
                        <span className="block text-sm leading-snug font-medium transition-colors group-hover:text-rouge">
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
              <Link href="/publications" className="eyebrow mt-5 inline-flex items-center gap-1.5 text-rouge">
                Toutes les publications
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Mémoire industrielle (claymorphisme) ================= */}
      <section className="swiss-container py-20 md:py-28">
        <div className="swiss-grid items-center">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <p className="eyebrow text-fonte">Patrimoine · 1909 — 1993</p>
            <h2 className="display mt-6 text-[2.25rem] sm:text-[3rem]">
              La ville que l&apos;acier a bâtie
            </h2>
            <p className="mt-7 max-w-[46ch] leading-relaxed text-muted-foreground">
              {smn?.summary ??
                "De 1909 à 1993, la Société métallurgique de Normandie a façonné la ville, son paysage et sa population."}
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-6">
              {[
                { value: "300", unit: "hectares reconvertis" },
                { value: "6 000", unit: "salariés en 1974" },
                { value: "66", unit: "mètres de haut" },
              ].map((stat) => (
                <div key={stat.unit} className="rule-strong pt-3">
                  <dt className="sr-only">{stat.unit}</dt>
                  <dd>
                    <span className="numeral block text-3xl leading-none font-medium">
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
              className="eyebrow mt-10 inline-flex items-center gap-2 border-b-2 border-fonte pb-1 text-fonte"
            >
              Découvrir l&apos;histoire de la SMN
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="col-span-4 mt-14 md:col-span-8 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <BlastFurnace />
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Le haut fourneau en volumes de terre : seule entorse assumée à la rigueur
 * suisse de l'ensemble. Les formes restent géométriques, seule la matière
 * change — modelée plutôt que tracée.
 */
function BlastFurnace() {
  return (
    <div className="clay-deep relative aspect-[4/3] overflow-hidden bg-[oklch(0.94_0.022_60)] p-8 dark:bg-[oklch(0.24_0.03_45)]">
      <svg
        viewBox="0 0 320 240"
        role="img"
        aria-label="Silhouette stylisée du haut fourneau et de la tour de refroidissement de l'ancienne Société métallurgique de Normandie"
        className="size-full"
      >
        <defs>
          <linearGradient id="clay-tower" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.13 46)" />
            <stop offset="100%" stopColor="oklch(0.52 0.14 40)" />
          </linearGradient>
          <linearGradient id="clay-stack" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.68 0.10 50)" />
            <stop offset="100%" stopColor="oklch(0.46 0.11 38)" />
          </linearGradient>
          <linearGradient id="clay-hall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.66 0.05 250)" />
            <stop offset="100%" stopColor="oklch(0.44 0.06 248)" />
          </linearGradient>
          <filter id="clay-soft" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="7" stdDeviation="7" floodOpacity="0.28" floodColor="oklch(0.3 0.08 40)" />
          </filter>
        </defs>

        <g filter="url(#clay-soft)">
          {/* Tour de refroidissement — hyperboloïde simplifié */}
          <path
            d="M46 208 L60 96 Q64 74 84 66 Q104 74 108 96 L122 208 Q84 216 46 208 Z"
            fill="url(#clay-tower)"
            rx="12"
          />
          <ellipse cx="84" cy="68" rx="24" ry="7" fill="oklch(0.80 0.09 50)" />

          {/* Cuve du haut fourneau */}
          <rect x="146" y="104" width="56" height="104" rx="16" fill="url(#clay-stack)" />
          <rect x="158" y="58" width="32" height="54" rx="14" fill="oklch(0.62 0.12 42)" />
          <circle cx="174" cy="52" r="13" fill="oklch(0.74 0.13 48)" />

          {/* Halle des soufflantes */}
          <rect x="212" y="146" width="68" height="62" rx="14" fill="url(#clay-hall)" />
          <rect x="226" y="162" width="14" height="14" rx="4" fill="oklch(0.86 0.03 250)" opacity="0.75" />
          <rect x="250" y="162" width="14" height="14" rx="4" fill="oklch(0.86 0.03 250)" opacity="0.75" />

          {/* Passerelle */}
          <rect x="118" y="132" width="34" height="11" rx="5" fill="oklch(0.56 0.09 44)" />

          {/* Sol */}
          <rect x="24" y="204" width="272" height="16" rx="8" fill="oklch(0.58 0.045 250)" opacity="0.35" />
        </g>
      </svg>
      <span className="eyebrow absolute right-8 bottom-6 text-muted-foreground">
        Le Plateau · ancien site SMN
      </span>
    </div>
  );
}
