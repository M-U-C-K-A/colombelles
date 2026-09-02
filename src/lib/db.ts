import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { Database } from "@/lib/types";
import { seedDatabase } from "@/lib/seed";

/**
 * Persistance sur fichier JSON, tolérante à un système de fichiers en lecture
 * seule.
 *
 * Le site est prévu pour tourner sur un serveur Node classique, où le contenu
 * est écrit dans `data/`. Sur un hébergement sans disque inscriptible (Vercel
 * et les plateformes sans état en général), l'écriture échoue : on bascule
 * alors sur le dossier temporaire, puis, à défaut, sur la mémoire du
 * processus. Le site reste consultable et l'administration utilisable, mais
 * les modifications ne survivent pas au redémarrage — `storageMode()` permet
 * de le signaler clairement à l'agent connecté.
 */

export type StorageMode = "disque" | "temporaire" | "memoire";

const FILE_NAME = "colombelles.json";

/** Emplacements candidats, par ordre de préférence. */
function candidates(): string[] {
  const list = [
    process.env.DATA_DIR,
    path.join(process.cwd(), "data"),
    path.join(os.tmpdir(), "colombelles"),
  ];
  return list.filter((value): value is string => Boolean(value));
}

let cache: Database | null = null;
let writeDir: string | null = null;
let mode: StorageMode = "disque";
let resolving: Promise<void> | null = null;
let writeQueue: Promise<unknown> = Promise.resolve();

/** Vrai si le dossier accepte l'écriture. */
async function isWritable(dir: string): Promise<boolean> {
  const probe = path.join(dir, `.probe-${process.pid}`);
  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(probe, "ok", "utf8");
    await fs.rm(probe, { force: true });
    return true;
  } catch {
    return false;
  }
}

/** Détermine une fois pour toutes où lire et où écrire. */
async function resolveStorage(): Promise<void> {
  const dirs = candidates();

  // Lecture : le premier fichier exploitable l'emporte, même en lecture seule.
  let loaded: Database | null = null;
  for (const dir of dirs) {
    try {
      const raw = await fs.readFile(path.join(dir, FILE_NAME), "utf8");
      const parsed = JSON.parse(raw) as Partial<Database>;
      const seed = seedDatabase();
      loaded = { ...seed, ...parsed, settings: { ...seed.settings, ...parsed.settings } };
      break;
    } catch {
      // dossier suivant
    }
  }

  // Écriture : le premier dossier inscriptible.
  for (const dir of dirs) {
    if (await isWritable(dir)) {
      writeDir = dir;
      mode = dir.startsWith(os.tmpdir()) ? "temporaire" : "disque";
      break;
    }
  }
  if (!writeDir) mode = "memoire";

  cache = loaded ?? seedDatabase();

  // Première initialisation : on dépose le jeu de données si on le peut.
  if (!loaded && writeDir) await persist();
}

async function persist(): Promise<void> {
  if (!writeDir || !cache) return;
  const target = path.join(writeDir, FILE_NAME);
  const tmp = `${target}.${process.pid}.tmp`;
  try {
    await fs.mkdir(writeDir, { recursive: true });
    await purgeTemporaires(writeDir);
    await fs.writeFile(tmp, JSON.stringify(cache, null, 2), "utf8");
    await fs.rename(tmp, target);
  } catch (error) {
    // Le disque est devenu inaccessible : on continue en mémoire plutôt que
    // de faire échouer la requête de l'utilisateur.
    console.error("Écriture impossible, bascule en mémoire :", error);
    writeDir = null;
    mode = "memoire";
  }
}

/** Une écriture interrompue laisse un fichier temporaire : on le balaie. */
async function purgeTemporaires(dir: string): Promise<void> {
  try {
    const restes = (await fs.readdir(dir)).filter(
      (f) => f.startsWith(FILE_NAME) && f.endsWith(".tmp"),
    );
    await Promise.all(restes.map((f) => fs.rm(path.join(dir, f), { force: true })));
  } catch {
    // Sans conséquence : la persistance ne dépend pas de ce nettoyage.
  }
}

export async function getDb(): Promise<Database> {
  if (!cache) {
    resolving ??= resolveStorage();
    await resolving;
  }
  return cache as Database;
}

/** Où les données sont écrites — sert à avertir dans l'administration. */
export async function storageMode(): Promise<StorageMode> {
  await getDb();
  return mode;
}

/** Lit une collection (copie défensive). */
export async function read<K extends keyof Database>(key: K): Promise<Database[K]> {
  const db = await getDb();
  return structuredClone(db[key]);
}

/** Applique une mutation puis persiste, si l'hébergement le permet. */
export async function mutate<T>(fn: (db: Database) => T | Promise<T>): Promise<T> {
  const run = async () => {
    const db = await getDb();
    const result = await fn(db);
    await persist();
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

export async function logAudit(user: string, action: string, target: string) {
  await mutate((db) => {
    db.audit.unshift({ id: id(), at: new Date().toISOString(), user, action, target });
    db.audit = db.audit.slice(0, 200);
  });
}
