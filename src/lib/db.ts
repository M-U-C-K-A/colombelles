import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { cache as perRequest } from "react";
import type { Database } from "@/lib/types";
import { seedDatabase } from "@/lib/seed";
import { blobConfigured, readBlob, writeBlob } from "@/lib/blob-store";

/**
 * Persistance du contenu, adaptée à l'hébergement rencontré.
 *
 * Trois situations, par ordre de préférence :
 *
 * 1. un magasin **Vercel Blob** privé est configuré : le contenu y est déposé
 *    et relu à chaque requête. C'est le seul mode qui survive sur un
 *    hébergement sans état, où chaque requête peut atterrir sur une instance
 *    différente — sans lui, une modification enregistrée par une instance
 *    reste invisible partout ailleurs ;
 * 2. un dossier inscriptible existe (serveur Node classique) : le contenu est
 *    écrit dans `data/`, ou dans `DATA_DIR` ;
 * 3. rien n'est inscriptible : le site reste consultable et l'administration
 *    utilisable, mais les modifications ne survivent pas au redémarrage.
 *
 * `storageMode()` permet de le signaler franchement à l'agent connecté.
 */

export type StorageMode = "blob" | "disque" | "temporaire" | "memoire";

const FILE_NAME = "colombelles.json";

/** Pendant la construction, le contenu est figé : inutile de relire. */
const BUILDING = process.env.NEXT_PHASE === "phase-production-build";

/** Emplacements candidats sur disque, par ordre de préférence. */
function candidates(): string[] {
  const list = [
    process.env.DATA_DIR,
    path.join(process.cwd(), "data"),
    path.join(os.tmpdir(), "colombelles"),
  ];
  return list.filter((value): value is string => Boolean(value));
}

let snapshot: Database | null = null;
let writeDir: string | null = null;
let mode: StorageMode = "disque";
let resolving: Promise<void> | null = null;
let writeQueue: Promise<unknown> = Promise.resolve();

/**
 * Le document enregistré complète le jeu de données initial : une collection
 * ajoutée depuis la dernière sauvegarde reste ainsi disponible.
 */
function hydrate(raw: string): Database {
  const parsed = JSON.parse(raw) as Partial<Database>;
  const seed = seedDatabase();
  return { ...seed, ...parsed, settings: { ...seed.settings, ...parsed.settings } };
}

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
  if (blobConfigured() && (await resolveBlob())) return;

  const dirs = candidates();

  // Lecture : le premier fichier exploitable l'emporte, même en lecture seule.
  let loaded: Database | null = null;
  for (const dir of dirs) {
    try {
      loaded = hydrate(await fs.readFile(path.join(dir, FILE_NAME), "utf8"));
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

  snapshot = loaded ?? seedDatabase();

  // Première initialisation : on dépose le jeu de données si on le peut.
  if (!loaded && writeDir) await persist();
}

/** Tente le magasin Blob ; retourne faux pour laisser la main au disque. */
async function resolveBlob(): Promise<boolean> {
  try {
    const raw = await readBlob();
    snapshot = raw ? hydrate(raw) : seedDatabase();
    mode = "blob";
    if (!raw) await writeBlob(JSON.stringify(snapshot));
    return true;
  } catch (error) {
    // Cause la plus probable : le magasin est public, et l'application ne
    // veut pas y déposer d'empreintes de mots de passe ni de messages
    // d'habitants. On le dit, et on retombe sur le disque.
    console.error(
      "Magasin Blob inutilisable — vérifiez qu'il est privé et relié au projet. Repli sur le disque :",
      error,
    );
    return false;
  }
}

/**
 * Relit l'état partagé. `perRequest` déduplique : un rendu de page interroge
 * plusieurs collections, cela ne doit faire qu'un aller-retour.
 */
const readShared = perRequest(async (): Promise<Database | null> => {
  try {
    const raw = await readBlob();
    return raw ? hydrate(raw) : null;
  } catch (error) {
    console.error("Lecture du magasin Blob impossible :", error);
    return null;
  }
});

async function persist(): Promise<void> {
  if (!snapshot) return;

  if (mode === "blob") {
    try {
      await writeBlob(JSON.stringify(snapshot));
    } catch (error) {
      console.error("Écriture dans le magasin Blob impossible :", error);
      mode = "memoire";
    }
    return;
  }

  if (!writeDir) return;
  const target = path.join(writeDir, FILE_NAME);
  const tmp = `${target}.${process.pid}.tmp`;
  try {
    await fs.mkdir(writeDir, { recursive: true });
    await purgeTemporaires(writeDir);
    await fs.writeFile(tmp, JSON.stringify(snapshot, null, 2), "utf8");
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
  resolving ??= resolveStorage();
  await resolving;

  // Le magasin est partagé : l'instance qui répond n'est pas forcément celle
  // qui a enregistré la dernière modification.
  if (mode === "blob" && !BUILDING) {
    try {
      const fresh = await readShared();
      if (fresh) snapshot = fresh;
    } catch {
      // Hors du champ d'une requête, la déduplication n'a pas cours : le
      // dernier état connu fait l'affaire.
    }
  }

  return snapshot as Database;
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
