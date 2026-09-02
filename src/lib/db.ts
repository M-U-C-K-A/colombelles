import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { Database } from "@/lib/types";
import { seedDatabase } from "@/lib/seed";

/**
 * Persistance simple sur fichier JSON.
 *
 * Le site est conçu pour tourner sur un serveur Node classique (`next start`)
 * où le disque est inscriptible. Aucun service externe n'est requis : la base
 * se crée et se remplit toute seule au premier démarrage.
 */

const DATA_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "colombelles.json");

let cache: Database | null = null;
let writeQueue: Promise<unknown> = Promise.resolve();

async function readFromDisk(): Promise<Database> {
  try {
    const raw = await fs.readFile(DB_FILE, "utf8");
    const parsed = JSON.parse(raw) as Database;
    // Complète les collections manquantes si le schéma a évolué.
    const seed = seedDatabase();
    return { ...seed, ...parsed, settings: { ...seed.settings, ...parsed.settings } };
  } catch {
    const seed = seedDatabase();
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DB_FILE, JSON.stringify(seed, null, 2), "utf8");
    return seed;
  }
}

export async function getDb(): Promise<Database> {
  if (!cache) cache = await readFromDisk();
  return cache;
}

/** Lit une collection (copie défensive). */
export async function read<K extends keyof Database>(key: K): Promise<Database[K]> {
  const db = await getDb();
  return structuredClone(db[key]);
}

/** Applique une mutation puis persiste atomiquement. */
export async function mutate<T>(fn: (db: Database) => T | Promise<T>): Promise<T> {
  const run = async () => {
    const db = await getDb();
    const result = await fn(db);
    await fs.mkdir(DATA_DIR, { recursive: true });
    const tmp = `${DB_FILE}.${process.pid}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(db, null, 2), "utf8");
    await fs.rename(tmp, DB_FILE);
    return result;
  };
  const next = writeQueue.then(run, run);
  writeQueue = next.catch(() => undefined);
  return next;
}

export function id(): string {
  return randomUUID();
}

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Rend un slug unique au sein d'une collection. */
export function uniqueSlug(base: string, taken: string[], currentId?: string, items?: { id: string; slug: string }[]): string {
  const seed = slugify(base) || "sans-titre";
  const reserved = new Set(
    items ? items.filter((i) => i.id !== currentId).map((i) => i.slug) : taken,
  );
  if (!reserved.has(seed)) return seed;
  let n = 2;
  while (reserved.has(`${seed}-${n}`)) n += 1;
  return `${seed}-${n}`;
}

export async function logAudit(user: string, action: string, target: string) {
  await mutate((db) => {
    db.audit.unshift({ id: id(), at: new Date().toISOString(), user, action, target });
    db.audit = db.audit.slice(0, 200);
  });
}
