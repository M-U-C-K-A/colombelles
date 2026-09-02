import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/page-header";
import { FOOTER_LINKS } from "@/lib/navigation";
import { getNavigation } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Plan du site",
  description: "L'arborescence complète du site de la Ville de Colombelles.",
};

const TRANSVERSAL = [
  { label: "Accueil", href: "/" },
  { label: "Actualités", href: "/actualites" },
  { label: "Agenda", href: "/agenda" },
  { label: "Publications", href: "/publications" },
  { label: "Annuaire", href: "/annuaire" },
  { label: "Offres d'emploi", href: "/emploi" },
  { label: "Signaler un problème", href: "/signalement" },
  { label: "Plan de la ville", href: "/plan" },
  { label: "Recherche", href: "/recherche" },
  { label: "Contact", href: "/contact" },
];

export default async function Page() {
  const sections = await getNavigation();

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Plan du site" }]}
        eyebrow="Arborescence"
        title="Plan du site"
        lead="L'ensemble des pages publiées, organisées par rubrique."
      />

      <div className="swiss-container py-14 md:py-20">
        <div className="space-y-16">
          <section>
            <h2 className="rule-strong pt-4 pb-5 text-xl font-medium tracking-[-0.02em]">
              Pages transversales
            </h2>
            <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
              {TRANSVERSAL.map((link) => (
                <li key={link.href} className="rule-bottom py-2.5">
                  <Link href={link.href} className="text-sm hover:text-rouge">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {sections.map((section) => (
            <section key={section.key}>
              <h2 className="rule-strong pt-4 pb-5 text-xl font-medium tracking-[-0.02em]">
                <Link href={section.href} className="hover:text-rouge">
                  {section.label}
                </Link>
              </h2>
              <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {section.groups.map((group) => (
                  <div key={group.title}>
                    <p className="eyebrow mb-3 text-muted-foreground">{group.title}</p>
                    <ul className="space-y-1">
                      {group.links.map((link) => (
                        <li key={link.href + link.label} className="rule-bottom py-2">
                          <Link href={link.href} className="text-sm hover:text-rouge">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section>
            <h2 className="rule-strong pt-4 pb-5 text-xl font-medium tracking-[-0.02em]">
              Informations légales
            </h2>
            <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href} className="rule-bottom py-2.5">
                  <Link href={link.href} className="text-sm hover:text-rouge">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
