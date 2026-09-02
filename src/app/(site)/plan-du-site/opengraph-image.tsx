import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Plan du site — Ville de Colombelles";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Arborescence",
    title: "Plan du site",
    theme: "mairie",
    meta: "Ville de Colombelles",
  });
}
