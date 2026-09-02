import type { Metadata } from "next";
import { EventCard } from "@/components/site/cards";
import { PageHeader, SectionTitle } from "@/components/site/page-header";
import { getPastEvents, getUpcomingEvents } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "Tous les rendez-vous de Colombelles : culture, sport, vie municipale, patrimoine, environnement.",
};

const MONTHS = new Intl.DateTimeFormat("fr-FR", {
  month: "long",
  year: "numeric",
  timeZone: "Europe/Paris",
});

export default async function Page() {
  const [upcoming, past] = await Promise.all([getUpcomingEvents(), getPastEvents(6)]);

  // Regroupement par mois, dans l'ordre chronologique.
  const byMonth = new Map<string, typeof upcoming>();
  for (const event of upcoming) {
    const key = MONTHS.format(new Date(event.startsAt));
    byMonth.set(key, [...(byMonth.get(key) ?? []), event]);
  }

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Agenda" }]}
        eyebrow={`${upcoming.length} rendez-vous à venir`}
        title="Agenda"
        lead="Spectacles, réunions publiques, visites, animations : les prochains rendez-vous de la commune."
      />

      <div className="swiss-container py-12 md:py-16">
        {upcoming.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            Aucun événement programmé pour le moment.
          </p>
        ) : (
          <div className="space-y-16">
            {[...byMonth.entries()].map(([month, events]) => (
              <section key={month}>
                <div className="swiss-grid">
                  <div className="col-span-4 md:col-span-8 lg:col-span-3">
                    <h2 className="rule-strong pt-4 text-xl font-medium tracking-[-0.02em] capitalize lg:sticky lg:top-28">
                      {month}
                    </h2>
                  </div>
                  <div className="col-span-4 md:col-span-8 lg:col-span-9">
                    <div className="rule-top">
                      {events.map((event) => (
                        <EventCard key={event.id} item={event} />
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}

        {past.length > 0 && (
          <section className="mt-24">
            <SectionTitle title="Rendez-vous passés" />
            <div className="mt-6 opacity-60">
              {past.map((event) => (
                <EventCard key={event.id} item={event} compact />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
