import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Plan de la ville — Ville de Colombelles";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Se repérer",
    title: "Plan de la ville",
    theme: "mairie",
    meta: "Ville de Colombelles",
  });
}
