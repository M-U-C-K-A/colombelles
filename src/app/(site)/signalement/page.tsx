import type { Metadata } from "next";
import { Lightbulb, Recycle, TrafficCone, TreePine } from "lucide-react";
import { themeStyle } from "@/lib/themes";
import { PageHeader, SectionTitle } from "@/components/site/page-header";
import { ReportForm } from "@/components/site/report-form";

export const metadata: Metadata = {
  title: "Signaler un problème",
  description:
    "Signalez un dysfonctionnement sur l'espace public de Colombelles : voirie, éclairage, propreté, espaces verts.",
};

const EXAMPLES = [
  { icon: TrafficCone, label: "Voirie", text: "Nid-de-poule, trottoir dégradé, marquage effacé." },
  { icon: Lightbulb, label: "Éclairage", text: "Lampadaire éteint, allumé en journée ou clignotant." },
  { icon: Recycle, label: "Propreté", text: "Dépôt sauvage, corbeille pleine, tag." },
  { icon: TreePine, label: "Espaces verts", text: "Branche dangereuse, arrosage, mobilier cassé." },
];

export default function Page() {
  return (
    <>
      <PageHeader
        theme={"actu"}
        crumbs={[{ label: "Signaler un problème" }]}
        eyebrow="Espace public"
        title="Signaler un problème"
        lead="Un lampadaire éteint, un nid-de-poule, un dépôt sauvage ? Signalez-le : votre demande est transmise directement au service compétent."
      />

      <div style={themeStyle("actu")} className="swiss-container py-14 md:py-20">
        <div className="swiss-grid">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <SectionTitle index="01" title="Ce que vous pouvez signaler" />
            <ul className="mt-8 space-y-px bg-border">
              {EXAMPLES.map((example) => (
                <li key={example.label} className="flex gap-4 bg-background py-5">
                  <example.icon className="mt-0.5 size-5 shrink-0 text-theme" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium">{example.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{example.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-l-2 border-theme pl-5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Ce formulaire ne remplace pas les numéros d&apos;urgence. En cas de danger
                immédiat, composez le <strong className="text-foreground">17</strong> ou le{" "}
                <strong className="text-foreground">112</strong>.
              </p>
            </div>

            <div className="mt-10">
              <p className="eyebrow rule-strong pt-4 pb-4 text-muted-foreground">Après l&apos;envoi</p>
              <ol className="space-y-4 text-sm">
                {[
                  "Vous recevez une référence de dossier à conserver.",
                  "Le service compétent qualifie la demande sous 48 heures ouvrées.",
                  "L'intervention est programmée selon l'urgence et les moyens disponibles.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="numeral eyebrow shrink-0 pt-0.5 text-theme">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="col-span-4 mt-16 md:col-span-8 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <SectionTitle index="02" title="Votre signalement" />
            <div className="mt-10">
              <ReportForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
