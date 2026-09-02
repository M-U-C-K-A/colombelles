/**
 * Génère les fichiers de démonstration référencés par la rubrique Publications.
 *
 * Les vrais documents de la Ville ne sont évidemment pas fournis ; sans ces
 * fichiers, tous les liens de téléchargement renvoyaient une 404. Chaque PDF
 * porte l'intitulé de la publication et rappelle qu'il s'agit d'un contenu de
 * démonstration à remplacer.
 *
 *   node scripts/generate-placeholder-documents.mjs
 *
 * La liste des publications est lue dans la base (`data/colombelles.json`),
 * créée au premier démarrage du site.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "documents");

/** Échappement des caractères réservés d'une chaîne PDF. */
const esc = (s) => s.replace(/([\\()])/g, "\\$1");

/** Une ligne de texte : police, corps, position, contenu. */
const line = (font, size, x, y, text) =>
  `BT /${font} ${size} Tf ${x} ${y} Td (${esc(text)}) Tj ET`;

function buildPdf({ title, category, date }) {
  const wrapped = [];
  let current = "";
  for (const word of title.split(" ")) {
    if ((current + " " + word).trim().length > 44) {
      wrapped.push(current.trim());
      current = word;
    } else current += " " + word;
  }
  if (current.trim()) wrapped.push(current.trim());

  let y = 742;
  const content = [
    line("F2", 9, 60, 790, "VILLE DE COLOMBELLES"),
    ...wrapped.map((text) => line("F2", 20, 60, (y -= 26), text)),
    line("F1", 11, 60, (y -= 34), `${category} — publié le ${date}`),
    line("F1", 11, 60, (y -= 44), "Document de démonstration."),
    line("F1", 11, 60, (y -= 18), "Ce fichier accompagne la maquette du site municipal ;"),
    line("F1", 11, 60, (y -= 18), "il tient la place du document réel, non fourni ici."),
    line("F1", 11, 60, (y -= 18), "Remplacez-le depuis l'espace d'administration."),
  ].join("\n");

  const stream = Buffer.from(content, "latin1");
  const objects = [
    "<</Type/Catalog/Pages 2 0 R>>",
    "<</Type/Pages/Kids[3 0 R]/Count 1>>",
    "<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]" +
      "/Resources<</Font<</F1 4 0 R/F2 5 0 R>>>>/Contents 6 0 R>>",
    "<</Type/Font/Subtype/Type1/BaseFont/Helvetica/Encoding/WinAnsiEncoding>>",
    "<</Type/Font/Subtype/Type1/BaseFont/Helvetica-Bold/Encoding/WinAnsiEncoding>>",
    `<</Length ${stream.length}>>\nstream\n${content}\nendstream`,
  ];

  const chunks = [Buffer.from("%PDF-1.4\n", "latin1")];
  const offsets = [];
  let position = chunks[0].length;

  objects.forEach((body, index) => {
    offsets.push(position);
    const chunk = Buffer.from(`${index + 1} 0 obj\n${body}\nendobj\n`, "latin1");
    chunks.push(chunk);
    position += chunk.length;
  });

  const xref =
    `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n` +
    offsets.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("");
  chunks.push(Buffer.from(xref, "latin1"));
  chunks.push(
    Buffer.from(
      `trailer\n<</Size ${objects.length + 1}/Root 1 0 R>>\nstartxref\n${position}\n%%EOF\n`,
      "latin1",
    ),
  );

  return Buffer.concat(chunks);
}

const DB = path.join(process.cwd(), "data", "colombelles.json");

let documents;
try {
  ({ documents } = JSON.parse(await readFile(DB, "utf8")));
} catch {
  console.error(
    `Base introuvable (${DB}).\nDémarrez le site une fois (npm run dev) pour qu'elle se crée, puis relancez ce script.`,
  );
  process.exit(1);
}

const date = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Paris",
});

await mkdir(OUT, { recursive: true });

for (const doc of documents) {
  if (!doc.url.startsWith("/documents/")) continue;
  const name = path.basename(doc.url);
  const bytes = buildPdf({
    title: doc.title,
    category: doc.category,
    date: date.format(new Date(doc.publishedAt)),
  });
  await writeFile(path.join(OUT, name), bytes);
  const size = `${(bytes.length / 1024).toFixed(1).replace(".", ",")} Ko`;
  console.log(`${name.padEnd(38)} ${size.padStart(8)}`);
}

console.log(
  "\nPensez à reporter les tailles dans les fiches (Administration → Publications)",
  "ou dans src/lib/seed.ts si vous régénérez le jeu de données initial.",
);
