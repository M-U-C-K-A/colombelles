"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { id as newId, mutate, slugify } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { hashPassword } from "@/lib/auth";
import type { ActionState } from "@/lib/form-state";
import { THEME_KEYS } from "@/lib/themes";
import type { Database } from "@/lib/types";

/* -------------------------------------------------------------------------
   Actions CRUD de l'espace d'administration.

   Chaque ressource déclare un schéma Zod et une clé de collection ; le reste
   du flux (validation, écriture, journalisation, revalidation) est commun.
   ------------------------------------------------------------------------- */

const status = z.enum(["brouillon", "publie"]);
const theme = z.enum(THEME_KEYS as [string, ...string[]]);
const text = (min = 1, max = 500) => z.string().trim().min(min).max(max);
const optionalText = (max = 500) => z.string().trim().max(max).optional().or(z.literal(""));
const checkbox = z.boolean();

/**
 * Une case décochée n'est pas transmise par le navigateur : la clé est
 * simplement absente du FormData. On la ramène donc explicitement à `false`
 * avant validation, plutôt que de s'en remettre au comportement d'un champ
 * optionnel — qui laisserait passer une case obligatoire non cochée.
 */
function toInput(
  formData: FormData,
  fields: readonly string[],
  checkboxes: readonly string[],
) {
  const raw = Object.fromEntries(formData) as Record<string, unknown>;
  // Un champ attendu mais absent (select laissé sur son intitulé) devient une
  // chaîne vide : le message d'erreur reste lisible.
  for (const key of fields) raw[key] ??= "";
  for (const key of checkboxes) raw[key] = raw[key] === "on" || raw[key] === "true";
  return raw;
}

/** Saisie renvoyée au formulaire pour la réafficher après une erreur. */
function keptValues(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") values[key] = value;
  }
  return values;
}
const toIso = (value: string) => (value ? new Date(value).toISOString() : new Date().toISOString());
const splitTags = (value: string) =>
  value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

const SCHEMAS = {
  news: z.object({
    title: text(3, 200),
    slug: optionalText(120),
    theme,
    excerpt: text(0, 400).or(z.literal("")),
    content: text(1, 40000),
    category: text(1, 80),
    author: text(1, 120),
    tags: optionalText(400),
    publishedAt: text(1, 40),
    status,
    featured: checkbox,
  }),
  events: z.object({
    title: text(3, 200),
    slug: optionalText(120),
    theme,
    excerpt: text(0, 400).or(z.literal("")),
    content: text(1, 20000),
    category: text(1, 80),
    location: text(1, 200),
    price: text(1, 120),
    startsAt: text(1, 40),
    endsAt: optionalText(40),
    registration: optionalText(600),
    status,
    featured: checkbox,
  }),
  pages: z.object({
    title: text(3, 200),
    slug: optionalText(120),
    theme,
    block: z.enum(["", "salles", "caen-la-mer"]),
    section: z.enum([
      "votre-mairie",
      "demarches",
      "vivre-a-colombelles",
      "sortir-et-decouvrir",
      "institutionnel",
    ]),
    subsection: optionalText(120),
    summary: text(0, 400).or(z.literal("")),
    content: text(1, 60000),
    order: z.coerce.number().int().min(0).max(999),
    status,
  }),
  places: z.object({
    name: text(2, 150),
    category: text(1, 80),
    theme,
    address: text(1, 250),
    description: optionalText(600),
    phone: optionalText(40),
    email: optionalText(160),
    href: optionalText(300),
    lat: z.coerce.number().min(-90).max(90),
    lon: z.coerce.number().min(-180).max(180),
    status,
  }),
  venues: z.object({
    name: text(2, 150),
    slug: optionalText(120),
    theme,
    capacity: text(1, 120),
    address: text(1, 250),
    description: text(1, 1000),
    equipment: text(1, 500),
    rateResident: text(1, 160),
    rateNonResident: text(1, 160),
    extra: optionalText(300),
    images: z.string().max(2000),
    order: z.coerce.number().int().min(0).max(999),
    status,
  }),
  documents: z.object({
    title: text(3, 250),
    category: text(1, 80),
    url: text(1, 500),
    fileType: text(1, 20),
    size: text(1, 30),
    publishedAt: text(1, 40),
    status,
  }),
  media: z.object({
    name: text(2, 200),
    url: text(1, 500),
    alt: text(1, 300),
    credit: optionalText(200),
  }),
  directory: z.object({
    name: text(2, 200),
    type: z.enum(["association", "commerce", "equipement"]),
    category: text(1, 80),
    description: text(1, 1000),
    address: text(1, 250),
    phone: optionalText(40),
    email: optionalText(160),
    website: optionalText(300),
    status,
  }),
  jobs: z.object({
    title: text(3, 200),
    slug: optionalText(120),
    department: text(1, 150),
    contract: text(1, 150),
    timeframe: text(1, 150),
    deadline: text(1, 20),
    description: text(1, 20000),
    publishedAt: text(1, 40),
    status,
  }),
  elus: z.object({
    name: text(2, 150),
    role: text(1, 120),
    delegation: text(1, 400),
    pole: text(1, 160),
    theme,
    order: z.coerce.number().int().min(0).max(999),
    email: optionalText(160),
    permanence: optionalText(300),
  }),
  services: z.object({
    name: text(2, 150),
    description: text(1, 1000),
    phone: text(1, 40),
    email: text(1, 160),
    hours: text(1, 300),
    address: text(1, 250),
    order: z.coerce.number().int().min(0).max(999),
  }),
} as const;

export type ResourceKind = keyof typeof SCHEMAS;

const CHECKBOXES: Record<ResourceKind, readonly string[]> = {
  news: ["featured"],
  events: ["featured"],
  pages: [],
  places: [],
  venues: [],
  documents: [],
  media: [],
  directory: [],
  jobs: [],
  elus: [],
  services: [],
};

const COLLECTIONS: Record<ResourceKind, keyof Database> = {
  news: "news",
  events: "events",
  pages: "pages",
  places: "places",
  venues: "venues",
  documents: "documents",
  media: "media",
  directory: "directory",
  jobs: "jobs",
  elus: "elus",
  services: "services",
};

const ROUTES: Record<ResourceKind, string> = {
  news: "/admin/actualites",
  events: "/admin/agenda",
  pages: "/admin/pages",
  places: "/admin/lieux",
  venues: "/admin/salles",
  documents: "/admin/publications",
  media: "/admin/medias",
  directory: "/admin/annuaire",
  jobs: "/admin/emploi",
  elus: "/admin/elus",
  services: "/admin/services",
};

const LABELS: Record<ResourceKind, string> = {
  news: "Actualité",
  events: "Événement",
  pages: "Page",
  places: "Lieu de la carte",
  venues: "Salle",
  documents: "Publication",
  media: "Média",
  directory: "Fiche d'annuaire",
  jobs: "Offre d'emploi",
  elus: "Élu",
  services: "Service",
};

function collectErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    errors[key] ??= issue.message;
  }
  return errors;
}

/** Slug unique au sein d'une collection. */
function ensureUniqueSlug(
  items: { id: string; slug?: string }[],
  base: string,
  currentId?: string,
): string {
  const seed = slugify(base) || "sans-titre";
  const taken = new Set(
    items.filter((i) => i.id !== currentId && i.slug).map((i) => i.slug as string),
  );
  if (!taken.has(seed)) return seed;
  let n = 2;
  while (taken.has(`${seed}-${n}`)) n += 1;
  return `${seed}-${n}`;
}

function refresh() {
  revalidatePath("/", "layout");
}

/* --------------------------------- Écriture -------------------------------- */

export async function saveResource(
  kind: ResourceKind,
  recordId: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await requireSession();
  const schema = SCHEMAS[kind];
  const parsed = schema.safeParse(
    toInput(formData, Object.keys(schema.shape), CHECKBOXES[kind]),
  );

  if (!parsed.success) {
    return {
      status: "error",
      message: "Certains champs doivent être corrigés.",
      errors: collectErrors(parsed.error),
      values: keptValues(formData),
    };
  }

  const data = parsed.data as Record<string, unknown>;
  const collection = COLLECTIONS[kind];

  await mutate((db) => {
    const items = db[collection] as unknown as Record<string, unknown>[];
    const existing = recordId
      ? (items.find((i) => i.id === recordId) as Record<string, unknown> | undefined)
      : undefined;

    const record: Record<string, unknown> = existing ?? { id: newId() };
    Object.assign(record, data);

    // Normalisations propres à chaque ressource.
    if (kind === "news") {
      record.slug = ensureUniqueSlug(
        items as { id: string; slug?: string }[],
        (data.slug as string) || (data.title as string),
        record.id as string,
      );
      record.tags = splitTags((data.tags as string) ?? "");
      record.publishedAt = toIso(data.publishedAt as string);
    }
    if (kind === "events") {
      record.slug = ensureUniqueSlug(
        items as { id: string; slug?: string }[],
        (data.slug as string) || (data.title as string),
        record.id as string,
      );
      record.startsAt = toIso(data.startsAt as string);
      record.endsAt = data.endsAt ? toIso(data.endsAt as string) : undefined;
      record.registration = (data.registration as string) || undefined;
    }
    if (kind === "venues") {
      record.slug = ensureUniqueSlug(
        items as { id: string; slug?: string }[],
        (data.slug as string) || (data.name as string),
        record.id as string,
      );
      record.images = ((data.images as string) ?? "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      record.extra = (data.extra as string) || undefined;
    }
    if (kind === "pages") {
      record.slug = ensureUniqueSlug(
        items as { id: string; slug?: string }[],
        (data.slug as string) || (data.title as string),
        record.id as string,
      );
      record.subsection = (data.subsection as string) || undefined;
      record.block = (data.block as string) || undefined;
      record.updatedAt = new Date().toISOString();
    }
    if (kind === "jobs") {
      record.slug = ensureUniqueSlug(
        items as { id: string; slug?: string }[],
        (data.slug as string) || (data.title as string),
        record.id as string,
      );
      record.publishedAt = toIso(data.publishedAt as string);
    }
    if (kind === "documents") {
      record.publishedAt = toIso(data.publishedAt as string);
    }
    if (kind === "media" && !existing) {
      record.uploadedAt = new Date().toISOString();
    }
    if (kind === "places") {
      for (const key of ["description", "phone", "email", "href"]) {
        if (record[key] === "") record[key] = undefined;
      }
    }
    if (kind === "directory" || kind === "elus" || kind === "services") {
      for (const key of ["phone", "email", "website", "permanence"]) {
        if (record[key] === "") record[key] = undefined;
      }
    }

    if (!existing) items.unshift(record);

    db.audit.unshift({
      id: newId(),
      at: new Date().toISOString(),
      user: session.username,
      action: existing ? "Modification" : "Création",
      target: `${LABELS[kind]} — ${(record.title as string) ?? (record.name as string) ?? record.id}`,
    });
    db.audit = db.audit.slice(0, 200);
  });

  refresh();
  redirect(ROUTES[kind]);
}

export async function deleteResource(kind: ResourceKind, recordId: string) {
  const session = await requireSession();
  const collection = COLLECTIONS[kind];

  await mutate((db) => {
    const items = db[collection] as unknown as Record<string, unknown>[];
    const index = items.findIndex((i) => i.id === recordId);
    if (index === -1) return;
    const [removed] = items.splice(index, 1);
    db.audit.unshift({
      id: newId(),
      at: new Date().toISOString(),
      user: session.username,
      action: "Suppression",
      target: `${LABELS[kind]} — ${(removed.title as string) ?? (removed.name as string) ?? recordId}`,
    });
    db.audit = db.audit.slice(0, 200);
  });

  refresh();
  redirect(ROUTES[kind]);
}

/** Bascule brouillon ↔ publié depuis la liste. */
export async function toggleStatus(kind: ResourceKind, recordId: string) {
  const session = await requireSession();
  const collection = COLLECTIONS[kind];

  await mutate((db) => {
    const items = db[collection] as unknown as Record<string, unknown>[];
    const item = items.find((i) => i.id === recordId);
    if (!item || !("status" in item)) return;
    item.status = item.status === "publie" ? "brouillon" : "publie";
    db.audit.unshift({
      id: newId(),
      at: new Date().toISOString(),
      user: session.username,
      action: item.status === "publie" ? "Publication" : "Dépublication",
      target: `${LABELS[kind]} — ${(item.title as string) ?? (item.name as string) ?? recordId}`,
    });
    db.audit = db.audit.slice(0, 200);
  });

  refresh();
  revalidatePath(ROUTES[kind]);
}

/* ------------------------------- Signalements ------------------------------ */

export async function updateReport(formData: FormData) {
  const session = await requireSession();
  const reportId = String(formData.get("id") ?? "");
  const nextStatus = String(formData.get("status") ?? "");
  const note = String(formData.get("note") ?? "");

  if (!["nouveau", "en_cours", "traite", "rejete"].includes(nextStatus)) return;

  await mutate((db) => {
    const report = db.reports.find((r) => r.id === reportId);
    if (!report) return;
    report.status = nextStatus as typeof report.status;
    report.note = note || undefined;
    db.audit.unshift({
      id: newId(),
      at: new Date().toISOString(),
      user: session.username,
      action: "Suivi de signalement",
      target: `${report.reference} → ${nextStatus}`,
    });
    db.audit = db.audit.slice(0, 200);
  });

  revalidatePath("/admin/signalements");
}

export async function deleteReport(reportId: string) {
  await requireSession();
  await mutate((db) => {
    db.reports = db.reports.filter((r) => r.id !== reportId);
  });
  revalidatePath("/admin/signalements");
}

/* --------------------------------- Messages -------------------------------- */

export async function toggleMessageRead(messageId: string) {
  await requireSession();
  await mutate((db) => {
    const message = db.messages.find((m) => m.id === messageId);
    if (message) message.read = !message.read;
  });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(messageId: string) {
  await requireSession();
  await mutate((db) => {
    db.messages = db.messages.filter((m) => m.id !== messageId);
  });
  revalidatePath("/admin/messages");
}

/* -------------------------------- Paramètres ------------------------------- */

const settingsSchema = z.object({
  siteName: text(1, 120),
  tagline: text(1, 200),
  description: text(1, 600),
  address: text(1, 200),
  postalCode: text(1, 10),
  city: text(1, 120),
  phone: text(1, 40),
  email: text(1, 160),
  population: text(1, 30),
  area: text(1, 30),
  intercommunalite: text(1, 160),
  maintenance: checkbox,
  bannerEnabled: checkbox,
  bannerLevel: z.enum(["info", "vigilance", "alerte"]),
  bannerTitle: text(0, 120).or(z.literal("")),
  bannerText: text(0, 400).or(z.literal("")),
  bannerHref: optionalText(300),
  hours: z.string().max(2000),
  social: z.string().max(2000),
});

export async function saveSettings(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const session = await requireSession();
  const parsed = settingsSchema.safeParse(
    toInput(formData, Object.keys(settingsSchema.shape), ["maintenance", "bannerEnabled"]),
  );

  if (!parsed.success) {
    return {
      status: "error",
      message: "Certains champs doivent être corrigés.",
      errors: collectErrors(parsed.error),
      values: keptValues(formData),
    };
  }

  const v = parsed.data;

  // « Lundi | 8h30 – 12h30 » par ligne.
  const hours = v.hours
    .split("\n")
    .map((line) => line.split("|").map((part) => part.trim()))
    .filter((parts) => parts[0])
    .map(([day, value]) => ({ day, value: value ?? "" }));

  const social = v.social
    .split("\n")
    .map((line) => line.split("|").map((part) => part.trim()))
    .filter((parts) => parts[0] && parts[1])
    .map(([label, url]) => ({ label, url }));

  await mutate((db) => {
    db.settings = {
      ...db.settings,
      siteName: v.siteName,
      tagline: v.tagline,
      description: v.description,
      address: v.address,
      postalCode: v.postalCode,
      city: v.city,
      phone: v.phone,
      email: v.email,
      population: v.population,
      area: v.area,
      intercommunalite: v.intercommunalite,
      maintenance: v.maintenance,
      hours: hours.length ? hours : db.settings.hours,
      social,
      banner: {
        enabled: v.bannerEnabled,
        level: v.bannerLevel,
        title: v.bannerTitle,
        text: v.bannerText,
        href: v.bannerHref ?? "",
      },
    };
    db.audit.unshift({
      id: newId(),
      at: new Date().toISOString(),
      user: session.username,
      action: "Modification",
      target: "Paramètres du site",
    });
    db.audit = db.audit.slice(0, 200);
  });

  refresh();
  redirect("/admin/parametres?enregistre=1");
}

/* ------------------------------- Utilisateurs ------------------------------ */

const userSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "L'identifiant doit comporter au moins 3 caractères.")
    .max(40)
    .regex(/^[a-z0-9._-]+$/i, "Lettres, chiffres, point, tiret et souligné uniquement."),
  name: text(2, 120),
  email: z.string().trim().email("Adresse électronique invalide."),
  role: z.enum(["administrateur", "editeur"]),
  password: z
    .string()
    .min(10, "Le mot de passe doit comporter au moins 10 caractères.")
    .max(200)
    .optional()
    .or(z.literal("")),
});

export async function saveUser(
  recordId: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await requireSession();
  if (session.role !== "administrateur") {
    return { status: "error", message: "Action réservée aux administrateurs." };
  }

  const parsed = userSchema.safeParse(
    toInput(formData, Object.keys(userSchema.shape), []),
  );
  if (!parsed.success) {
    return {
      status: "error",
      message: "Certains champs doivent être corrigés.",
      errors: collectErrors(parsed.error),
      values: keptValues(formData),
    };
  }

  const v = parsed.data;
  if (!recordId && !v.password) {
    return {
      status: "error",
      message: "Un mot de passe est requis à la création.",
      errors: { password: "Mot de passe obligatoire." },
    };
  }

  const hash = v.password ? await hashPassword(v.password) : null;
  let conflict = false;

  await mutate((db) => {
    const taken = db.users.some(
      (u) => u.id !== recordId && u.username.toLowerCase() === v.username.toLowerCase(),
    );
    if (taken) {
      conflict = true;
      return;
    }

    const existing = recordId ? db.users.find((u) => u.id === recordId) : undefined;
    if (existing) {
      existing.username = v.username;
      existing.name = v.name;
      existing.email = v.email;
      existing.role = v.role;
      if (hash) existing.passwordHash = hash;
    } else {
      db.users.push({
        id: newId(),
        username: v.username,
        name: v.name,
        email: v.email,
        role: v.role,
        passwordHash: hash as string,
        createdAt: new Date().toISOString(),
      });
    }

    db.audit.unshift({
      id: newId(),
      at: new Date().toISOString(),
      user: session.username,
      action: existing ? "Modification" : "Création",
      target: `Utilisateur — ${v.username}`,
    });
    db.audit = db.audit.slice(0, 200);
  });

  if (conflict) {
    return {
      status: "error",
      message: "Cet identifiant est déjà utilisé.",
      errors: { username: "Identifiant déjà pris." },
    };
  }

  redirect("/admin/utilisateurs");
}

export async function deleteUser(userId: string) {
  const session = await requireSession();
  if (session.role !== "administrateur" || session.sub === userId) return;

  await mutate((db) => {
    // La collectivité doit toujours conserver un administrateur.
    const target = db.users.find((u) => u.id === userId);
    const admins = db.users.filter((u) => u.role === "administrateur");
    if (!target || (target.role === "administrateur" && admins.length <= 1)) return;

    db.users = db.users.filter((u) => u.id !== userId);
    db.audit.unshift({
      id: newId(),
      at: new Date().toISOString(),
      user: session.username,
      action: "Suppression",
      target: `Utilisateur — ${target.username}`,
    });
    db.audit = db.audit.slice(0, 200);
  });

  revalidatePath("/admin/utilisateurs");
}
