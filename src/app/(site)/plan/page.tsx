import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { themeStyle } from "@/lib/themes";
import { PageHeader } from "@/components/site/page-header";
import { getDirectory, getSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Plan de la ville",
  description:
    "Localiser les équipements publics, les commerces et les services de Colombelles.",
};

export default async function Page() {
  const [settings, directory] = await Promise.all([getSettings(), getDirectory()]);
  const address = `${settings.address}, ${settings.postalCode} ${settings.city}`;
  const equipments = directory.filter((item) => item.type === "equipement");

  return (
    <>
      <PageHeader
        theme={"mairie"}
        crumbs={[{ label: "Plan de la ville" }]}
        eyebrow="Se repérer"
        title="Plan de la ville"
        lead="Situer les équipements publics, les colonnes de tri, les aires de jeux et les commerces de la commune."
      />

      <div style={themeStyle("mairie")} className="swiss-container py-14 md:py-20">
        <div className="swiss-grid">
          <div className="col-span-4 md:col-span-8 lg:col-span-8">
            <div className="border border-border">
              <iframe
                title="Plan de Colombelles"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.3050%2C49.1930%2C-0.2530%2C49.2200&layer=mapnik"
                className="aspect-[4/3] w-full"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Fond cartographique © contributeurs OpenStreetMap, sous licence ODbL. Si la carte
              ne s&apos;affiche pas, consultez l&apos;
              <a
                href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                itinéraire vers la mairie
              </a>
              .
            </p>
          </div>

          <aside className="col-span-4 mt-10 md:col-span-8 lg:col-span-4 lg:mt-0">
            <p className="eyebrow rule-strong pt-4 pb-4 text-muted-foreground">
              Équipements publics
            </p>
            <ul className="space-y-0">
              {equipments.map((item) => (
                <li key={item.id} className="rule-bottom py-4">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="mt-1.5 flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                    {item.address}
                  </p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
}
