/**
 * Reporte une collection du jeu de données initial vers le magasin Blob.
 *
 * Une fois le magasin alimenté, c'est lui qui fait foi : les corrections
 * apportées à `src/lib/seed.ts` n'apparaissent plus. Remettre le document à
 * zéro effacerait tout le travail éditorial ; ce script ne remplace que la
 * collection nommée, et laisse le reste intact.
 *
 *   node scripts/sync-seed-collection.mjs media
 *   node scripts/sync-seed-collection.mjs pages news --dry-run
 *
 * Le jeton de lecture-écriture est lu dans .env.local (`vercel env pull`).
 */

import { readFileSync } from "node:fs";
import { createJiti } from "jiti";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const collections = args.filter((a) => !a.startsWith("--"));

if (collections.length === 0) {
  console.error("Usage : node scripts/sync-seed-collection.mjs <collection…> [--dry-run]");
  process.exit(1);
}

// .env.local n'est pas chargé hors de Next : on le lit à la main.
try {
  for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split("\n")) {
    const match = /^([A-Z0-9_]+)="?([^"]*)"?$/.exec(line.trim());
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
  }
} catch {
  // Le jeton peut aussi venir de l'environnement.
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("BLOB_READ_WRITE_TOKEN absent. Lancez `vercel env pull .env.local`.");
  process.exit(1);
}

const { get, put } = await import("@vercel/blob");
const jiti = createJiti(import.meta.url, { alias: { "@": new URL("../src", import.meta.url).pathname } });
const { seedDatabase } = await jiti.import("../src/lib/seed.ts");

const PATHNAME = "colombelles.json";
const stored = await get(PATHNAME, { access: "private", useCache: false });
if (!stored || stored.statusCode !== 200) {
  console.error("Aucun document dans le magasin : il sera créé au prochain démarrage du site.");
  process.exit(1);
}

const document = JSON.parse(await new Response(stored.stream).text());
const seed = seedDatabase();

for (const name of collections) {
  if (!(name in seed)) {
    console.error(`Collection inconnue : ${name}`);
    process.exit(1);
  }
  const before = Array.isArray(document[name]) ? document[name].length : "—";
  document[name] = seed[name];
  const after = Array.isArray(seed[name]) ? seed[name].length : "—";
  console.log(`  ${name} : ${before} → ${after}`);
}

if (dryRun) {
  console.log("\n--dry-run : rien n'a été écrit.");
  process.exit(0);
}

await put(PATHNAME, JSON.stringify(document), {
  access: "private",
  allowOverwrite: true,
  addRandomSuffix: false,
  contentType: "application/json",
  cacheControlMaxAge: 60,
});
console.log("\nMagasin mis à jour.");
