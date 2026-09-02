/**
 * Adresse absolue du site.
 *
 * Elle sert de base aux métadonnées : sans elle, les images de partage sont
 * annoncées sur un domaine qui ne les héberge pas — c'était le cas, l'adresse
 * de repli renvoyant vers le site réel de la Ville plutôt que vers le
 * déploiement en cours.
 *
 * Ordre de résolution : la variable explicite, puis le domaine de production
 * de l'hébergeur, puis celui du déploiement courant, puis le poste local.
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const host =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL;
  if (host) return `https://${host.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

/** Domaine affiché dans les images de partage et le pied de page. */
export const siteDomain = () => siteUrl().replace(/^https?:\/\//, "");
