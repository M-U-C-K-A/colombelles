/**
 * Adresse absolue du site.
 *
 * Elle sert de base aux métadonnées, au sitemap, à robots.txt et aux images de
 * partage : une adresse erronée les fait pointer vers un domaine qui ne les
 * héberge pas.
 *
 * Ordre de résolution : la variable explicite, puis le poste local en
 * développement, puis le domaine de production de l'hébergeur, et enfin
 * l'adresse canonique ci-dessous.
 */

/** Adresse publique de cette démonstration. */
const CANONICAL = "https://colombelles.vercel.app";

const clean = (value: string) => value.replace(/\/+$/, "");

export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return clean(explicit);

  if (process.env.NODE_ENV !== "production") {
    return `http://localhost:${process.env.PORT ?? 3000}`;
  }

  const host =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  if (host) return `https://${clean(host.replace(/^https?:\/\//, ""))}`;

  return CANONICAL;
}

/** Domaine seul, affiché dans les images de partage. */
export const siteDomain = () => siteUrl().replace(/^https?:\/\//, "");
