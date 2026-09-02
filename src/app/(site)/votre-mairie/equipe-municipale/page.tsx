import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { PageHeader, SectionTitle } from "@/components/site/page-header";
import { telHref } from "@/lib/format";
import { getElus, getSettings } from "@/lib/queries";
import { themeStyle } from "@/lib/themes";

export const metadata: Metadata = {
  title: "Équipe municipale",
  description:
    "Le maire, les adjoints et les conseillers municipaux de Colombelles, présentés par pôle de délégation.",
};

export default async function Page() {
  const [elus, settings] = await Promise.all([getElus(), getSettings()]);
  const maire = elus.find((e) => e.role === "Maire");
  const others = elus.filter((e) => e.role !== "Maire");

  // Regroupement par pôle, dans l'ordre protocolaire.
  const poles = new Map<string, typeof others>();
  for (const elu of others) {
    poles.set(elu.pole, [...(poles.get(elu.pole) ?? []), elu]);
  }

  return (
    <>
      <PageHeader
        theme="mairie"
        crumbs={[{ label: "Votre mairie", href: "/votre-mairie" }, { label: "Équipe municipale" }]}
        eyebrow="Conseil municipal"
        title="L'équipe municipale"
        lead={`L'équipe municipale compte ${elus.length} élus : le maire, huit adjoints et vingt conseillers municipaux. Le conseil est élu pour six ans au suffrage universel direct et règle par ses délibérations les affaires de la commune.`}
      />

      <div className="swiss-container py-14 md:py-20">
        {/* --- Le maire --- */}
        {maire && (
          <section style={themeStyle(maire.theme)}>
            <SectionTitle index="01" title="Le maire" />
            <div className="swiss-grid mt-10">
              <div className="col-span-4 md:col-span-5 lg:col-span-4">
                <div className="theme-tint flex aspect-[4/5] w-full max-w-xs items-end p-7">
                  <span className="numeral text-[4.5rem] leading-none font-medium tracking-[-0.04em] text-theme">
                    {maire.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                </div>
              </div>
              <div className="col-span-4 mt-8 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
                <p className="eyebrow theme-bg inline-block px-2 py-1">{maire.role}</p>
                <h2 className="display mt-5 text-4xl">{maire.name}</h2>
                <p className="mt-6 max-w-[46ch] leading-relaxed text-muted-foreground">
                  Délégations : {maire.delegation.toLowerCase()}.
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Le maire reçoit sur rendez-vous, comme les adjoints et les conseillers
                  municipaux, à l&apos;hôtel de ville et hors périodes scolaires.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`tel:${telHref(settings.phone)}`}
                    className="inline-flex items-center gap-2 border border-foreground px-5 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    <span className="numeral">{settings.phone}</span>
                  </a>
                  <a
                    href={`mailto:${settings.email}`}
                    className="inline-flex items-center gap-2 border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-foreground"
                  >
                    <Mail className="size-4" aria-hidden="true" />
                    {settings.email}
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- Les pôles de délégation --- */}
        <section className="mt-20">
          <SectionTitle index="02" title="Adjoints et conseillers, par délégation" />
          <div className="mt-10 space-y-14">
            {[...poles.entries()].map(([pole, membres]) => (
              <div key={pole} style={themeStyle(membres[0].theme)} className="swiss-grid">
                <div className="col-span-4 md:col-span-8 lg:col-span-3">
                  <h3 className="theme-rule pt-4 text-lg leading-snug font-medium tracking-[-0.02em] lg:sticky lg:top-28">
                    {pole}
                    <span className="numeral eyebrow mt-2 block text-muted-foreground">
                      {membres.length} élu{membres.length > 1 ? "s" : ""}
                    </span>
                  </h3>
                </div>
                <ul className="col-span-4 grid border-t border-l border-border md:col-span-8 md:grid-cols-2 lg:col-span-9">
                  {membres.map((elu) => (
                    <li key={elu.id} className="border-r border-b border-border p-5">
                      <p className="eyebrow text-theme">{elu.role}</p>
                      <p className="mt-2.5 text-lg leading-snug font-medium">{elu.name}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {elu.delegation}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-16 max-w-[74ch] text-xs leading-relaxed text-muted-foreground">
          Les adjoints et les conseillers municipaux reçoivent sur rendez-vous à l&apos;hôtel de
          ville, en dehors des périodes de vacances scolaires. Les demandes sont à adresser à
          l&apos;accueil, au{" "}
          <a href={`tel:${telHref(settings.phone)}`} className="link-underline numeral">
            {settings.phone}
          </a>
          .
        </p>
      </div>
    </>
  );
}
