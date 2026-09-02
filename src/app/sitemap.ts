import type { MetadataRoute } from "next";
import { SECTIONS } from "@/lib/navigation";
import { getEvents, getJobs, getNews, getPages } from "@/lib/queries";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.colombelles.fr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, news, events, jobs] = await Promise.all([
    getPages(),
    getNews(),
    getEvents(),
    getJobs(),
  ]);

  const staticRoutes = [
    "",
    "/actualites",
    "/agenda",
    "/publications",
    "/annuaire",
    "/emploi",
    "/contact",
    "/signalement",
    "/plan",
    "/plan-du-site",
    "/mentions-legales",
    "/donnees-personnelles",
    "/accessibilite",
    ...SECTIONS.map((s) => s.href),
    "/votre-mairie/equipe-municipale",
    "/votre-mairie/conseil-municipal",
    "/votre-mairie/services",
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  for (const page of pages) {
    const section = SECTIONS.find((s) => s.key === page.section);
    if (!section) continue;
    entries.push({
      url: `${BASE}${section.href}/${page.slug}`,
      lastModified: new Date(page.updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const item of news) {
    entries.push({
      url: `${BASE}/actualites/${item.slug}`,
      lastModified: new Date(item.publishedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const item of events) {
    entries.push({
      url: `${BASE}/agenda/${item.slug}`,
      lastModified: new Date(item.startsAt),
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  for (const item of jobs) {
    entries.push({
      url: `${BASE}/emploi/${item.slug}`,
      lastModified: new Date(item.publishedAt),
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  return entries;
}
