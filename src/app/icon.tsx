import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * Favicon : le pictogramme du logo municipal (le C et sa roue de couleurs),
 * recadré à la volée depuis le fichier officiel. Le logo mesure 288 × 100 ;
 * son pictogramme occupe le carré de gauche, ramené ici à 128 × 128.
 */
export const size = { width: 128, height: 128 };
export const contentType = "image/png";

const SOURCE_WIDTH = 288;
const SOURCE_HEIGHT = 100;
const SCALE = size.height / SOURCE_HEIGHT;

export default async function Icon() {
  const file = await readFile(path.join(process.cwd(), "public", "logo-colombelles.png"));
  const src = `data:image/png;base64,${file.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#ffffff",
        }}
      >
        <img
          src={src}
          alt=""
          width={Math.round(SOURCE_WIDTH * SCALE)}
          height={size.height}
        />
      </div>
    ),
    size,
  );
}
