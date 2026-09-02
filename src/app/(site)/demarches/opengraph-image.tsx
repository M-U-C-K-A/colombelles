import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Démarches pratiques — Ville de Colombelles";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Rubrique",
    title: "Démarches pratiques",
    theme: "contact",
    meta: "Ville de Colombelles",
  });
}
