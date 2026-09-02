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

export async function getPlaces() {
  const items = published(await read("places"));
  return items.sort((a, b) => a.category.localeCompare(b.category, "fr") || a.name.localeCompare(b.name, "fr"));
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
  /** Pertinence interne, utilisée pour le classement. */
  score?: number;
}

/**
 * Pages fixes du site : elles ne vivent pas dans la collection `pages` mais
 * doivent être trouvables. Sans cela, chercher « signalement » ne renvoyait
 * rien, alors que la page existe.
 */
const STATIC_PAGES: { title: string; href: string; type: string; excerpt: string; keywords: string }[] = [
  { title: "Signaler un problème", href: "/signalement", type: "Démarche", excerpt: "Voirie, éclairage public, propreté, espaces verts : signalez un dysfonctionnement sur l'espace public.", keywords: "signalement signaler incident dysfonctionnement nid de poule lampadaire dépôt sauvage tag encombrant" },
  { title: "Contact et horaires", href: "/contact", type: "Démarche", excerpt: "Adresse, téléphone, horaires d'ouverture de la mairie et formulaire de contact des services.", keywords: "contact contacter joindre horaires ouverture téléphone adresse courriel écrire mairie urgence" },
  { title: "Plan de la ville", href: "/plan", type: "Se repérer", excerpt: "Carte interactive des équipements, aires de jeux, salles et lieux de vie.", keywords: "plan carte interactive localiser situer itinéraire équipements" },
  { title: "Actualités", href: "/actualites", type: "Rubrique", excerpt: "Toute l'actualité de la vie municipale, des services et des équipements.", keywords: "actualités actualité nouvelles infos informations journal" },
  { title: "Agenda", href: "/agenda", type: "Rubrique", excerpt: "Les prochains rendez-vous : spectacles, réunions publiques, visites, animations.", keywords: "agenda événements evenements sortir rendez-vous programme animations" },
  { title: "Publications", href: "/publications", type: "Rubrique", excerpt: "Journal municipal, comptes rendus du conseil, budget, guides et documents réglementaires.", keywords: "publications documents télécharger pdf magazine comptes rendus procès-verbaux budget" },
  { title: "Annuaire", href: "/annuaire", type: "Rubrique", excerpt: "Associations, commerces et équipements de la commune.", keywords: "annuaire associations commerces équipements coordonnées" },
  { title: "Offres d'emploi", href: "/emploi", type: "Rubrique", excerpt: "Les postes à pourvoir à la Ville de Colombelles et la candidature spontanée.", keywords: "emploi offres recrutement postuler candidature travail job recrute" },
  { title: "Équipe municipale", href: "/votre-mairie/equipe-municipale", type: "Votre mairie", excerpt: "Le maire, les adjoints et les conseillers municipaux, par pôle de délégation.", keywords: "élus élu maire adjoints conseillers équipe municipale délégations Pottier" },
  { title: "Conseil municipal", href: "/votre-mairie/conseil-municipal", type: "Votre mairie", excerpt: "Composition, fonctionnement, séances publiques et procès-verbaux.", keywords: "conseil municipal séance délibération procès-verbal ordre du jour" },
  { title: "Services de la ville", href: "/votre-mairie/services", type: "Votre mairie", excerpt: "Coordonnées, horaires et missions des services municipaux.", keywords: "services service coordonnées horaires état civil urbanisme technique police" },
  { title: "Plan du site", href: "/plan-du-site", type: "Institutionnel", excerpt: "L'arborescence complète du site.", keywords: "plan du site arborescence sommaire" },
  { title: "Mentions légales", href: "/mentions-legales", type: "Institutionnel", excerpt: "Éditeur, directeur de publication, hébergement et propriété intellectuelle.", keywords: "mentions légales éditeur hébergeur copyright" },
  { title: "Données personnelles", href: "/donnees-personnelles", type: "Institutionnel", excerpt: "Traitements, bases légales, durées de conservation et exercice des droits.", keywords: "données personnelles rgpd cnil cookies vie privée dpo" },
  { title: "Accessibilité", href: "/accessibilite", type: "Institutionnel", excerpt: "Déclaration d'accessibilité au titre du RGAA.", keywords: "accessibilité rgaa handicap conformité lecteur écran" },
];

/**
 * Radical approximatif d'un mot français : on retire les terminaisons les plus
 * courantes, sans descendre sous quatre caractères. Grossier, mais suffisant
 * pour que « signaler » retrouve « signalement », ou « inscrire » « inscription ».
 */
const SUFFIXES = [
  "issements", "issement", "ications", "ication", "ations", "ation", "ements", "ement",
  "atrices", "atrice", "ateurs", "ateur", "ances", "ance", "ences", "ence",
  "ives", "ive", "aux", "ales", "ale", "ants", "ant", "ents", "ent",
  "ions", "ion", "ers", "er", "ez", "es", "s", "e",
];

function stem(word: string): string {
  for (const suffix of SUFFIXES) {
    if (word.length - suffix.length >= 4 && word.endsWith(suffix)) {
      return word.slice(0, -suffix.length);
    }
  }
  return word;
}

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export async function search(query: string): Promise<SearchResult[]> {
  const terms = normalize(query).split(" ").filter(Boolean);
  if (terms.length === 0 || normalize(query).length < 2) return [];

  const stems = terms.map(stem);

  /** Un document correspond si chaque terme retrouve un mot de même radical. */
  const matches = (...fields: (string | undefined)[]) => {
    const haystack = ` ${normalize(fields.filter(Boolean).join(" "))} `;
    return stems.every((s) => haystack.includes(` ${s}`));
  };

  /**
   * Pertinence : un terme trouvé dans le titre pèse bien plus que dans le
   * corps du texte, sans quoi une page longue qui mentionne le mot une fois
   * passe devant la page qui porte ce mot en titre.
   */
  const score = (title: string, summary?: string, body?: string) => {
    const inTitle = ` ${normalize(title)} `;
    const inSummary = ` ${normalize(summary ?? "")} `;
    let total = 0;
    for (const s of stems) {
      if (inTitle.includes(` ${s}`)) total += 100;
      if (inSummary.includes(` ${s}`)) total += 12;
      if (body && ` ${normalize(body)} `.includes(` ${s}`)) total += 1;
    }
    // Un titre entièrement couvert par la requête passe devant.
    if (stems.every((s) => inTitle.includes(` ${s}`))) total += 60;
    return total;
  };

  const [news, events, pages, documents, directory, jobs, venues, places] = await Promise.all([
    getNews(),
    getEvents(),
    getPages(),
    getDocuments(),
    getDirectory(),
    getJobs(),
    getVenues(),
    getPlaces(),
  ]);

  const results: SearchResult[] = [];

  for (const item of STATIC_PAGES) {
    if (matches(item.title, item.excerpt, item.keywords)) {
      results.push({
        title: item.title,
        href: item.href,
        type: item.type,
        excerpt: item.excerpt,
        score: score(item.title, item.excerpt, item.keywords) + 25,
      });
    }
  }
  for (const item of pages) {
    if (matches(item.title, item.summary, item.content, item.subsection)) {
      const base = SECTIONS.find((s) => s.key === item.section);
      results.push({
        title: item.title,
        href: base ? `${base.href}/${item.slug}` : `/${item.slug}`,
        type: base?.label ?? "Page",
        excerpt: item.summary || plainText(item.content, 160),
        score: score(item.title, item.summary, item.content),
      });
    }
  }
  for (const item of news) {
    if (matches(item.title, item.excerpt, item.content, item.tags.join(" "), item.category)) {
      results.push({
        title: item.title,
        href: `/actualites/${item.slug}`,
        type: "Actualité",
        excerpt: item.excerpt,
        date: item.publishedAt,
        score: score(item.title, item.excerpt, item.content),
      });
    }
  }
  for (const item of events) {
    if (matches(item.title, item.excerpt, item.content, item.location, item.category)) {
      results.push({
        title: item.title,
        href: `/agenda/${item.slug}`,
        type: "Agenda",
        excerpt: item.excerpt,
        date: item.startsAt,
        score: score(item.title, item.excerpt, item.content),
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
        score: score(item.title, item.category),
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
        score: score(item.name, item.description, item.category),
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
        score: score(item.title, item.department, item.description),
      });
    }
  }
  for (const item of venues) {
    if (matches(item.name, item.description, item.address)) {
      results.push({
        title: item.name,
        href: "/demarches/location-de-salles",
        type: "Salle à louer",
        excerpt: `${item.capacity} · ${item.address}`,
        score: score(item.name, item.description, item.address),
      });
    }
  }
  for (const item of places) {
    if (matches(item.name, item.category, item.address, item.description)) {
      results.push({
        title: item.name,
        href: item.href ?? "/plan",
        type: "Lieu",
        excerpt: `${item.category} · ${item.address}`,
        score: score(item.name, `${item.category} ${item.address}`, item.description),
      });
    }
  }

  // Dédoublonnage : un lieu peut aussi être une salle ou une page.
  const seen = new Set<string>();
  return results
    .filter((r) => {
      const key = `${r.href}|${r.title}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0) || a.title.localeCompare(b.title, "fr"));
}
