import type { Metadata } from "next";
import { Download } from "lucide-react";
import { CityMap } from "@/components/site/city-map";
import { PageHeader } from "@/components/site/page-header";
import { getPlaces, getSettings } from "@/lib/queries";
import { themeStyle } from "@/lib/themes";

export const metadata: Metadata = {
  title: "Plan de la ville",
  description:
    "Carte interactive des équipements de Colombelles : services municipaux, équipements sportifs, aires de jeux et lieux de vie.",
};

export default async function Page() {
  const [places, settings] = await Promise.all([getPlaces(), getSettings()]);
  const address = `${settings.address}, ${settings.postalCode} ${settings.city}`;

  return (
    <>
      <PageHeader
        theme="mairie"
        crumbs={[{ label: "Plan de la ville" }]}
        eyebrow="Se repérer"
        title="Plan de la ville"
        lead="Situer les équipements publics, les aires de jeux, les salles et les lieux de vie de la commune. Filtrez par catégorie depuis la légende."
      />

      <div style={themeStyle("mairie")} className="swiss-container py-14 md:py-20">
        <CityMap places={places} />

        <section className="mt-16 grid gap-px border-t border-l border-border sm:grid-cols-2">
          <div className="border-r border-b border-border p-6">
            <h2 className="text-lg font-medium tracking-[-0.02em]">Le plan papier</h2>
            <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
              Le plan général de Colombelles, édité par la Ville, est disponible en
              téléchargement et à l&apos;accueil de la mairie.
            </p>
            <a
              href="/documents/plan-de-la-ville.pdf"
              className="mt-6 inline-flex items-center gap-2 border border-foreground px-5 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
            >
              <Download className="size-4" aria-hidden="true" />
              Télécharger le plan (PDF)
            </a>
          </div>
          <div className="border-r border-b border-border p-6">
            <h2 className="text-lg font-medium tracking-[-0.02em]">Venir à la mairie</h2>
            <address className="mt-3 text-sm leading-relaxed text-muted-foreground not-italic">
              {settings.address}
              <br />
              {settings.postalCode} {settings.city}
            </address>
            <a
              href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow mt-6 inline-block border-b-2 border-foreground pb-1"
            >
              Calculer un itinéraire
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
