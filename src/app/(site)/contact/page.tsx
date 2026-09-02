import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/site/contact-form";
import { PageHeader, SectionTitle } from "@/components/site/page-header";
import { telHref } from "@/lib/format";
import { getServices, getSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Contact et horaires",
  description:
    "Adresse, téléphone, horaires d'ouverture de la mairie de Colombelles et formulaire de contact des services municipaux.",
};

export default async function Page() {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Contact" }]}
        eyebrow="Nous joindre"
        title="Contact et horaires"
        lead="L'accueil de la mairie vous oriente vers le service compétent, quel que soit votre besoin."
      />

      <div className="swiss-container py-14 md:py-20">
        <div className="swiss-grid">
          {/* Coordonnées */}
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <SectionTitle index="01" title="Hôtel de ville" />
            <dl className="mt-8 space-y-7 text-sm">
              <div className="flex gap-4">
                <dt className="sr-only">Adresse</dt>
                <MapPin className="mt-0.5 size-5 shrink-0 text-rouge" aria-hidden="true" />
                <dd>
                  <address className="not-italic">
                    {settings.address}
                    <br />
                    {settings.postalCode} {settings.city}
                  </address>
                  <a
                    href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(
                      `${settings.address}, ${settings.postalCode} ${settings.city}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="eyebrow mt-3 inline-block text-rouge"
                  >
                    Voir sur une carte →
                  </a>
                </dd>
              </div>

              <div className="flex gap-4">
                <dt className="sr-only">Téléphone</dt>
                <Phone className="mt-0.5 size-5 shrink-0 text-rouge" aria-hidden="true" />
                <dd>
                  <a href={`tel:${telHref(settings.phone)}`} className="link-underline numeral text-base">
                    {settings.phone}
                  </a>
                </dd>
              </div>

              <div className="flex gap-4">
                <dt className="sr-only">Courriel</dt>
                <Mail className="mt-0.5 size-5 shrink-0 text-rouge" aria-hidden="true" />
                <dd>
                  <a href={`mailto:${settings.email}`} className="link-underline break-all">
                    {settings.email}
                  </a>
                </dd>
              </div>

              <div className="flex gap-4">
                <dt className="sr-only">Horaires</dt>
                <Clock className="mt-0.5 size-5 shrink-0 text-rouge" aria-hidden="true" />
                <dd className="w-full">
                  <p className="eyebrow mb-3 text-muted-foreground">Horaires d&apos;ouverture</p>
                  <ul className="space-y-1.5">
                    {settings.hours.map((slot) => (
                      <li key={slot.day} className="flex justify-between gap-6 rule-bottom pb-1.5">
                        <span className="text-muted-foreground">{slot.day}</span>
                        <span className="numeral text-right">{slot.value}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>

            <div className="mt-12 border-2 border-foreground p-6">
              <p className="eyebrow text-rouge">Urgences</p>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  ["Samu", "15"],
                  ["Police secours", "17"],
                  ["Pompiers", "18"],
                  ["Numéro d'urgence européen", "112"],
                  ["Urgence sourds et malentendants", "114"],
                  ["Police municipale", "02 31 35 25 25"],
                ].map(([label, number]) => (
                  <li key={label} className="flex justify-between gap-4">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="numeral font-medium">{number}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Formulaire */}
          <div className="col-span-4 mt-16 md:col-span-8 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <SectionTitle index="02" title="Écrire à un service" />
            <p className="mt-6 mb-10 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
              Les champs suivis d&apos;un astérisque sont obligatoires. Une réponse vous sera
              apportée sous cinq jours ouvrés. Pour une urgence, privilégiez le téléphone.
            </p>
            <ContactForm services={["Accueil général", ...services.map((s) => s.name)]} />
          </div>
        </div>
      </div>
    </>
  );
}
