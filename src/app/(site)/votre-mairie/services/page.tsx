import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { telHref } from "@/lib/format";
import { getServices } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Services de la ville",
  description:
    "Coordonnées, horaires et missions des services municipaux de Colombelles : état civil, éducation, CCAS, urbanisme, services techniques, police municipale.",
};

export default async function Page() {
  const services = await getServices();

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Votre mairie", href: "/votre-mairie" },
          { label: "Services de la ville" },
        ]}
        eyebrow="Administration municipale"
        title="Les services de la ville"
        lead="Un guichet unique en mairie oriente vers le bon interlocuteur. Voici le détail des services, leurs missions et leurs horaires."
      />

      <div className="swiss-container py-14 md:py-20">
        <ul className="grid gap-px bg-border md:grid-cols-2">
          {services.map((service, index) => (
            <li key={service.id} className="flex flex-col bg-background p-7">
              <span className="numeral eyebrow text-rouge">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-4 text-xl leading-snug font-medium tracking-[-0.02em]">
                {service.name}
              </h2>
              <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <dl className="mt-6 space-y-2.5 border-t border-border pt-5 text-sm">
                <div className="flex gap-3">
                  <dt className="sr-only">Adresse</dt>
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <dd>{service.address}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="sr-only">Horaires</dt>
                  <Clock
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <dd className="text-muted-foreground">{service.hours}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="sr-only">Téléphone</dt>
                  <Phone
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <dd>
                    <a href={`tel:${telHref(service.phone)}`} className="link-underline numeral">
                      {service.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="sr-only">Courriel</dt>
                  <Mail
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <dd>
                    <a href={`mailto:${service.email}`} className="link-underline break-all">
                      {service.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
