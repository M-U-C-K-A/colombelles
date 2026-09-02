import { read } from "@/lib/db";
import { SECTIONS, type SectionMeta } from "@/lib/navigation";
import { plainText } from "@/lib/markdown";
import type { ThemeKey } from "@/lib/themes";
import type {
  DirectoryItem,
  DocumentItem,
  EventItem,
  JobItem,
  NewsItem,
  PageItem,
  SectionKey,
} from "@/lib/types";

const published = <T extends { status: string }>(items: T[]) =>
  items.filter((i) => i.status === "publie");

/* ------------------------------ Paramètres ------------------------------ */

export const getSettings = () => read("settings");

/* ------------------------------ Actualités ------------------------------ */

export async function getNews(): Promise<NewsItem[]> {
  const items = published(await read("news"));
  return items.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const items = await getNews();
  return items.find((n) => n.slug === slug) ?? null;
}

export async function getNewsCategories(): Promise<string[]> {
  const items = await getNews();
  return [...new Set(items.map((n) => n.category))].sort((a, b) => a.localeCompare(b, "fr"));
}

/* -------------------------------- Agenda -------------------------------- */

export async function getEvents(): Promise<EventItem[]> {
  const items = published(await read("events"));
  return items.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export async function getUpcomingEvents(limit?: number): Promise<EventItem[]> {
  const now = Date.now();
  const items = (await getEvents()).filter(
    (e) => new Date(e.endsAt ?? e.startsAt).getTime() >= now,
  );
  return limit ? items.slice(0, limit) : items;
}

/** Événements terminés, du plus récent au plus ancien. */
export async function getPastEvents(limit?: number): Promise<EventItem[]> {
  const now = Date.now();
  const items = (await getEvents())
    .filter((e) => new Date(e.endsAt ?? e.startsAt).getTime() < now)
    .reverse();
  return limit ? items.slice(0, limit) : items;
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const items = await getEvents();
  return items.find((e) => e.slug === slug) ?? null;
}

/* --------------------------------- Pages -------------------------------- */

export async function getPages(section?: SectionKey): Promise<PageItem[]> {
  const items = published(await read("pages"));
  const scoped = section ? items.filter((p) => p.section === section) : items;
  return scoped.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, "fr"));
}

export async function getPage(section: SectionKey, slug: string): Promise<PageItem | null> {
  const items = await getPages(section);
  return items.find((p) => p.slug === slug) ?? null;
}

export async function getPageBySlug(slug: string): Promise<PageItem | null> {
  const items = await getPages();
  return items.find((p) => p.slug === slug) ?? null;
}

/** Regroupe les pages d'une rubrique par sous-rubrique, dans l'ordre saisi. */
export async function getSectionGroups(section: SectionKey) {
  const pages = await getPages(section);
  const groups = new Map<string, PageItem[]>();
  for (const page of pages) {
    const key = page.subsection?.trim() || "Toutes les pages";
    const list = groups.get(key) ?? [];
    list.push(page);
    groups.set(key, list);
  }
  return [...groups.entries()].map(([title, items]) => ({ title, items }));
}

/* ------------------------------ Navigation ------------------------------ */

export interface NavLink {
  label: string;
  href: string;
  summary?: string;
  /** Couleur du thème, affichée en pastille dans le méga-menu. */
  theme: ThemeKey;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

export interface NavSection extends SectionMeta {
  groups: NavGroup[];
}

/** Méga-menu construit à partir des pages réellement publiées. */
export async function getNavigation(): Promise<NavSection[]> {
  const pages = await getPages();

  return SECTIONS.map((section) => {
    const groups = new Map<string, NavGroup>();

    for (const extra of section.extras) {
      const group = groups.get(extra.group) ?? { title: extra.group, links: [] };
      group.links.push({ label: extra.label, href: extra.href, theme: section.theme });
      groups.set(extra.group, group);
    }

    for (const page of pages.filter((p) => p.section === section.key)) {
      const title = page.subsection?.trim() || "Autres pages";
      const group = groups.get(title) ?? { title, links: [] };
      group.links.push({
        label: page.title,
        href: `${section.href}/${page.slug}`,
        summary: page.summary,
        theme: page.theme,
      });
      groups.set(title, group);
    }

    return { ...section, groups: [...groups.values()] };
  });
}

/* ------------------------- Publications, annuaire ------------------------ */

export async function getDocuments(): Promise<DocumentItem[]> {
  const items = published(await read("documents"));
  return items.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getDocumentCategories(): Promise<string[]> {
  const items = await getDocuments();
  return [...new Set(items.map((d) => d.category))].sort((a, b) => a.localeCompare(b, "fr"));
}

export async function getVenues() {
  const items = published(await read("venues"));
  return items.sort((a, b) => a.order - b.order);
}

export async function getDirectory(): Promise<DirectoryItem[]> {
  const items = published(await read("directory"));
  return items.sort((a, b) => a.name.localeCompare(b.name, "fr"));
}

export async function getElus() {
  const items = await read("elus");
  return items.sort((a, b) => a.order - b.order);
}

export async function getServices() {
  const items = await read("services");
  return items.sort((a, b) => a.order - b.order);
}

export async function getJobs(): Promise<JobItem[]> {
  const items = published(await read("jobs"));
  return items.sort((a, b) => a.deadline.localeCompare(b.deadline));
}

export async function getJobBySlug(slug: string): Promise<JobItem | null> {
  const items = await getJobs();
  return items.find((j) => j.slug === slug) ?? null;
}

/* ------------------------------- Recherche ------------------------------- */

export interface SearchResult {
  title: string;
  href: string;
  type: string;
  excerpt: string;
  date?: string;
}

export async function search(query: string): Promise<SearchResult[]> {
  const q = query
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
  if (q.length < 2) return [];

  const terms = q.split(/\s+/);
  const normalize = (value: string) =>
    value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const matches = (...fields: string[]) => {
    const haystack = normalize(fields.join(" "));
    return terms.every((term) => haystack.includes(term));
  };

  const [news, events, pages, documents, directory, jobs] = await Promise.all([
    getNews(),
    getEvents(),
    getPages(),
    getDocuments(),
    getDirectory(),
    getJobs(),
  ]);

  const results: SearchResult[] = [];

  for (const item of pages) {
    if (matches(item.title, item.summary, item.content)) {
      const base = SECTIONS.find((s) => s.key === item.section);
      results.push({
        title: item.title,
        href: base ? `${base.href}/${item.slug}` : `/${item.slug}`,
        type: base?.label ?? "Page",
        excerpt: item.summary || plainText(item.content, 160),
      });
    }
  }
  for (const item of news) {
    if (matches(item.title, item.excerpt, item.content, item.tags.join(" "))) {
      results.push({
        title: item.title,
        href: `/actualites/${item.slug}`,
        type: "Actualité",
        excerpt: item.excerpt,
        date: item.publishedAt,
      });
    }
  }
  for (const item of events) {
    if (matches(item.title, item.excerpt, item.content, item.location)) {
      results.push({
        title: item.title,
        href: `/agenda/${item.slug}`,
        type: "Agenda",
        excerpt: item.excerpt,
        date: item.startsAt,
      });
    }
  }
  for (const item of documents) {
    if (matches(item.title, item.category)) {
      results.push({
        title: item.title,
        href: item.url,
        type: "Publication",
        excerpt: `${item.category} · ${item.fileType} · ${item.size}`,
        date: item.publishedAt,
      });
    }
  }
  for (const item of directory) {
    if (matches(item.name, item.description, item.category)) {
      results.push({
        title: item.name,
        href: `/annuaire#${item.id}`,
        type: "Annuaire",
        excerpt: item.description,
      });
    }
  }
  for (const item of jobs) {
    if (matches(item.title, item.department, item.description)) {
      results.push({
        title: item.title,
        href: `/emploi/${item.slug}`,
        type: "Emploi",
        excerpt: `${item.department} · ${item.contract}`,
      });
    }
  }

  return results;
}
