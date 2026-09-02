import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteDomain } from "@/lib/site-url";
import type { ThemeKey } from "@/lib/themes";

/**
 * Images de partage (Open Graph).
 *
 * Elles reprennent la composition du site : filet des huit couleurs en tête,
 * bandeau du thème, logo de la Ville, étiquette de rubrique et titre en grande
 * échelle. Satori ne lit pas les variables CSS : les couleurs sont donc
 * dupliquées ici, sous forme hexadécimale.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** Mêmes valeurs que les jetons `--t-*`, converties en sRGB. */
const HEX: Record<ThemeKey, string> = {
  actu: "#cc101a",
  mairie: "#3154b7",
  contact: "#8039bc",
  ecole: "#0065bf",
  famille: "#007ca4",
  solidarite: "#b12b6e",
  nature: "#157e3c",
  sport: "#507c20",
  emploi: "#b15600",
  culture: "#af1a8d",
  patrimoine: "#a64a0d",
};

const SPECTRUM: ThemeKey[] = [
  "actu",
  "emploi",
  "sport",
  "nature",
  "famille",
  "ecole",
  "contact",
  "culture",
];

const PAPER = "#faf9f6";
const INK = "#1b1b1e";
const MUTED = "#5f5f66";

async function logo() {
  const file = await readFile(path.join(process.cwd(), "public", "logo-colombelles.png"));
  return `data:image/png;base64,${file.toString("base64")}`;
}

/** Coupe un titre trop long plutôt que de le laisser déborder du cadre. */
function trim(value: string, max: number) {
  return value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value;
}

export async function ogImage({
  title,
  eyebrow,
  theme = "mairie",
  meta,
}: {
  title: string;
  eyebrow?: string;
  theme?: ThemeKey;
  meta?: string;
}) {
  const color = HEX[theme] ?? HEX.mairie;
  const src = await logo();
  const long = title.length > 46;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
          color: INK,
        }}
      >
        {/* Filet des couleurs de l'horizon */}
        <div style={{ display: "flex", height: 12 }}>
          {SPECTRUM.map((key) => (
            <div key={key} style={{ flex: 1, background: HEX[key] }} />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "56px 72px 48px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" width={274} height={95} />

          <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
            {eyebrow && (
              <div
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  background: color,
                  color: "#fff",
                  fontSize: 20,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  padding: "8px 14px",
                  marginBottom: 26,
                }}
              >
                {trim(eyebrow, 42)}
              </div>
            )}
            <div
              style={{
                display: "flex",
                fontSize: long ? 62 : 78,
                lineHeight: 1.06,
                letterSpacing: -2.5,
                fontWeight: 600,
                maxWidth: 1000,
              }}
            >
              {trim(title, 110)}
            </div>
            {meta && (
              <div style={{ display: "flex", marginTop: 24, fontSize: 26, color: MUTED }}>
                {trim(meta, 90)}
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginTop: 44,
              paddingTop: 22,
              borderTop: `2px solid ${INK}`,
              fontSize: 22,
              color: MUTED,
            }}
          >
            <div style={{ display: "flex" }}>{siteDomain()}</div>
            <div style={{ display: "flex" }}>Les couleurs de l&apos;horizon</div>
          </div>
        </div>

        {/* Bandeau du thème, en pied */}
        <div style={{ display: "flex", height: 14, background: color }} />
      </div>
    ),
    OG_SIZE,
  );
}
