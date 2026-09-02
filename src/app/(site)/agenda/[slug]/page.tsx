import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Euro, MapPin, Ticket } from "lucide-react";
import { EventCard } from "@/components/site/cards";
import { themeStyle } from "@/lib/themes";
import { PageHeader, SectionTitle } from "@/components/site/page-header";
import { formatEventRange } from "@/lib/format";
import { Markdown, plainText } from "@/lib/markdown";
import { getEventBySlug, getEvents, getUpcomingEvents } from "@/lib/queries";

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/agenda/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Événement introuvable" };
  return {
    title: event.title,
    description: event.excerpt || plainText(event.content, 160),
    openGraph: { title: event.title, description: event.excerpt },
  };
}

export default async function Page({ params }: PageProps<"/agenda/[slug]">) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const others = (await getUpcomingEvents()).filter((e) => e.id !== event.id).slice(0, 3);

  return (
    <>
      <PageHeader
        theme={event.theme}
        crumbs={[{ label: "Agenda", href: "/agenda" }, { label: event.title }]}
        eyebrow={event.category}
        title={event.title}
        lead={event.excerpt}
      />

      <div style={themeStyle(event.theme)} className="swiss-container py-14 md:py-20">
        <div className="swiss-grid">
          <aside className="col-span-4 md:col-span-8 lg:col-span-4">
            <dl className="rule-strong space-y-6 pt-4 text-sm lg:sticky lg:top-28">
              <div className="flex gap-3">
                <dt className="sr-only">Date</dt>
                <CalendarDays className="mt-0.5 size-4 shrink-0 text-theme" aria-hidden="true" />
                <dd className="numeral">{formatEventRange(event.startsAt, event.endsAt)}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="sr-only">Lieu</dt>
                <MapPin className="mt-0.5 size-4 shrink-0 text-theme" aria-hidden="true" />
                <dd>{event.location}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="sr-only">Tarif</dt>
                <Euro className="mt-0.5 size-4 shrink-0 text-theme" aria-hidden="true" />
                <dd>{event.price}</dd>
              </div>
              {event.registration && (
                <div className="flex gap-3">
                  <dt className="sr-only">Inscription</dt>
                  <Ticket className="mt-0.5 size-4 shrink-0 text-theme" aria-hidden="true" />
                  <dd className="text-muted-foreground">{event.registration}</dd>
                </div>
              )}
            </dl>
          </aside>

          <article className="col-span-4 mt-12 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <Markdown content={event.content} className="prose-swiss" />
            <Link
              href="/agenda"
              className="mt-14 inline-flex items-center gap-2 border-b-2 border-foreground pb-1 text-sm font-medium"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Retour à l&apos;agenda
            </Link>
          </article>
        </div>

        {others.length > 0 && (
          <section className="mt-24">
            <SectionTitle title="Autres rendez-vous" />
            <div className="mt-6">
              {others.map((other) => (
                <EventCard key={other.id} item={other} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
