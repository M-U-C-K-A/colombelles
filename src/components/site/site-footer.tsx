import Link from "next/link";
import { CaenLaMer } from "@/components/site/caen-la-mer";
import { ColorRule } from "@/components/site/horizon";
import { SiteLogo } from "@/components/site/logo";
import { FOOTER_LINKS } from "@/lib/navigation";
import { telHref } from "@/lib/format";
import type { NavSection } from "@/lib/queries";
import type { Settings } from "@/lib/types";

export function SiteFooter({
  sections,
  settings,
}: {
  sections: NavSection[];
  settings: Settings;
}) {
  return (
    <footer className="mt-24 bg-foreground text-background">
      <ColorRule />
      <div className="swiss-container py-16">
        <div className="swiss-grid">
          {/* Identité et contact */}
          <div className="col-span-4 lg:col-span-4">
            <SiteLogo height={52} plate />
            <address className="mt-8 space-y-1 text-sm not-italic opacity-80">
              <p>Hôtel de ville</p>
              <p>{settings.address}</p>
              <p>
                {settings.postalCode} {settings.city}
              </p>
            </address>
            <div className="mt-6 space-y-1 text-sm">
              <p>
                <a href={`tel:${telHref(settings.phone)}`} className="link-underline">
                  {settings.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${settings.email}`} className="link-underline">
                  {settings.email}
                </a>
              </p>
            </div>
            <CaenLaMer variant="footer" className="mt-8" />

            {settings.social.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
                {settings.social.map((item) => (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="eyebrow opacity-70 transition-opacity hover:opacity-100"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Horaires */}
          <div className="col-span-4 lg:col-span-3">
            <p className="eyebrow rule-bottom border-background/25 pb-2 opacity-60">
              Horaires d&apos;ouverture
            </p>
            <dl className="mt-4 space-y-1.5 text-sm">
              {settings.hours.map((slot) => (
                <div key={slot.day} className="flex justify-between gap-4">
                  <dt className="opacity-70">{slot.day}</dt>
                  <dd className="numeral text-right opacity-95">{slot.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Rubriques */}
          <div className="col-span-4 grid grid-cols-2 gap-x-6 gap-y-8 lg:col-span-5 lg:grid-cols-2">
            <div>
              <p className="eyebrow rule-bottom border-background/25 pb-2 opacity-60">
                Rubriques
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {sections.map((section) => (
                  <li key={section.key}>
                    <Link href={section.href} className="opacity-80 hover:opacity-100">
                      {section.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow rule-bottom border-background/25 pb-2 opacity-60">
                Services en ligne
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  { label: "Actualités", href: "/actualites" },
                  { label: "Agenda", href: "/agenda" },
                  { label: "Publications", href: "/publications" },
                  { label: "Annuaire", href: "/annuaire" },
                  { label: "Offres d'emploi", href: "/emploi" },
                  { label: "Signalement", href: "/signalement" },
                  { label: "Plan de la ville", href: "/plan" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="opacity-80 hover:opacity-100">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-background/20">
        <div className="swiss-container flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs opacity-70 hover:opacity-100">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/admin" className="text-xs opacity-70 hover:opacity-100">
                Espace d&apos;administration
              </Link>
            </li>
          </ul>
          <p className="text-xs opacity-50">
            © {new Date().getFullYear()} Ville de Colombelles · {settings.intercommunalite}
          </p>
        </div>
      </div>
    </footer>
  );
}
