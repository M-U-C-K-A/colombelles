import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Sortir et découvrir — Ville de Colombelles";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Rubrique",
    title: "Sortir et découvrir",
    theme: "culture",
    meta: "Ville de Colombelles",
  });
}
