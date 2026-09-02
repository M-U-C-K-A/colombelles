import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Accessibilité — Ville de Colombelles";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Totalement conforme au RGAA",
    title: "Accessibilité",
    theme: "mairie",
    meta: "Ville de Colombelles",
  });
}
