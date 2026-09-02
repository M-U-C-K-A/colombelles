import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { themeStyle } from "@/lib/themes";

const SUGGESTIONS = [
  { label: "Démarches pratiques", href: "/demarches", hint: "État civil, identité, urbanisme", theme: "contact" },
  { label: "Actualités", href: "/actualites", hint: "La vie de la commune", theme: "actu" },
  { label: "Agenda", href: "/agenda", hint: "Les prochains rendez-vous", theme: "culture" },
  { label: "Écoles et famille", href: "/vivre-a-colombelles", hint: "Inscriptions, périscolaire", theme: "ecole" },
  { label: "Déchets et environnement", href: "/demarches/dechets-et-proprete", hint: "Collecte et tri", theme: "nature" },
  { label: "Offres d\u2019emploi", href: "/emploi", hint: "Recrutement municipal", theme: "emploi" },
  { label: "Plan du site", href: "/plan-du-site", hint: "Toutes les pages", theme: "mairie" },
  { label: "Contact", href: "/contact", hint: "Horaires et coordonnées", theme: "solidarite" },
] as const;

/**
 * 404 — le chiffre est traité comme un élément de composition, pas comme un
 * message d'erreur. La page reste utile : elle propose des issues.
 */
export function NotFoundContent() {
  return (
    <div className="swiss-container py-20 md:py-28">
      <div className="swiss-grid items-start">
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <p className="eyebrow text-muted-foreground">Erreur 404</p>
          <p
            aria-hidden="true"
            className="numeral mt-7 text-[7rem] leading-[0.78] font-medium tracking-[-0.05em] sm:text-[10rem]"
          >
            404
          </p>
          <p className="rule-strong mt-8 max-w-[22rem] pt-4 text-sm text-muted-foreground">
            Page non trouvée
          </p>
        </div>

        <div className="col-span-4 mt-10 md:col-span-8 lg:col-span-6 lg:col-start-7 lg:mt-0">
          <h1 className="display text-[2.25rem] sm:text-[3rem]">Cette page n&apos;existe pas</h1>
          <p className="mt-7 max-w-[48ch] leading-relaxed text-muted-foreground">
            L&apos;adresse saisie est peut-être erronée, ou la page a été déplacée lors d&apos;une
            refonte. Voici quelques points d&apos;entrée pour retrouver votre chemin.
          </p>

          <ul className="mt-10 grid gap-px bg-border sm:grid-cols-2">
            {SUGGESTIONS.map((item) => (
              <li key={item.href} style={themeStyle(item.theme)}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col justify-between gap-5 bg-background p-5 transition-colors hover:bg-theme hover:text-white"
                >
                  <span className="theme-bg block h-1.5 w-8 group-hover:bg-white" aria-hidden="true" />
                  <span>
                    <span className="block text-sm font-medium">{item.label}</span>
                    <span className="mt-1.5 flex items-end justify-between gap-2">
                      <span className="text-xs text-muted-foreground group-hover:text-white/75">
                        {item.hint}
                      </span>
                      <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-sm text-muted-foreground">
            Un lien cassé ? Signalez-le à{" "}
            <a href="mailto:webmaster@colombelles.fr" className="link-underline">
              webmaster@colombelles.fr
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
