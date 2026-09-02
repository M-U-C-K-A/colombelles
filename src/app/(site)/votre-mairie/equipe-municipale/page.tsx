import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { themeStyle } from "@/lib/themes";
import { PageHeader, SectionTitle } from "@/components/site/page-header";
import { SPECTRUM } from "@/components/site/horizon";
import { getElus } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Équipe municipale",
  description:
    "La maire, les adjoints et les conseillers municipaux délégués de la Ville de Colombelles, avec leurs délégations.",
};

export default async function Page() {
  const elus = await getElus();
  const maire = elus.find((e) => e.role === "Maire");
  const adjoints = elus.filter((e) => e.role.includes("adjoint"));
  const delegues = elus.filter((e) => e.role.includes("délégué"));

  return (
    <>
      <PageHeader
        theme={"mairie"}
        crumbs={[{ label: "Votre mairie", href: "/votre-mairie" }, { label: "Équipe municipale" }]}
        eyebrow="Mandat 2026 — 2032"
        title="L'équipe municipale"
        lead="Le conseil municipal compte 27 élus. La maire et les sept adjoints exercent les délégations décidées lors du conseil d'installation."
      />

      <div style={themeStyle("mairie")} className="swiss-container py-14 md:py-20">
        {maire && (
          <section>
            <SectionTitle index="01" title="La maire" />
            <div className="swiss-grid mt-10">
              <div className="col-span-4 md:col-span-5 lg:col-span-5">
                <div className="theme-tint flex aspect-[4/5] w-full max-w-sm items-end p-7">
                  <span className="numeral text-[5rem] leading-none font-medium tracking-[-0.04em] text-theme">
                    {maire.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                </div>
              </div>
              <div className="col-span-4 mt-8 md:col-span-8 lg:col-span-6 lg:col-start-7 lg:mt-0">
                <p className="eyebrow text-theme">{maire.role}</p>
                <h2 className="display mt-4 text-4xl">{maire.name}</h2>
                <p className="mt-6 max-w-[46ch] leading-relaxed text-muted-foreground">
                  Délégations : {maire.delegation.toLowerCase()}.
                </p>
                {maire.permanence && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Permanence : {maire.permanence.toLowerCase()}.
                  </p>
                )}
                {maire.email && (
                  <a
                    href={`mailto:${maire.email}`}
                    className="mt-8 inline-flex items-center gap-2 border border-foreground px-5 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
                  >
                    <Mail className="size-4" aria-hidden="true" />
                    {maire.email}
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

        <section className="mt-20">
          <SectionTitle index="02" title="Les adjoints" />
          <ul className="mt-10 grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
            {adjoints.map((elu, index) => (
              <li key={elu.id} style={themeStyle(SPECTRUM[index % SPECTRUM.length])} className="border-r border-b border-border p-6">
                <span className="theme-bg mb-4 block h-1.5 w-9" aria-hidden="true" />
                <p className="eyebrow text-theme">{elu.role}</p>
                <p className="mt-3 text-lg leading-snug font-medium">{elu.name}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {elu.delegation}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20">
          <SectionTitle index="03" title="Conseillers municipaux délégués" />
          <ul className="mt-10 grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">
            {delegues.map((elu) => (
              <li key={elu.id} className="border-r border-b border-border p-6">
                <p className="text-lg leading-snug font-medium">{elu.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {elu.delegation}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-16 max-w-[70ch] text-xs leading-relaxed text-muted-foreground">
          Pour joindre un élu, adressez votre demande à l&apos;accueil de la mairie, qui la
          transmettra. Les demandes de rendez-vous avec la maire sont instruites par le
          secrétariat général.
        </p>
      </div>
    </>
  );
}
