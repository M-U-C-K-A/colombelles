import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "L'équipe municipale — Ville de Colombelles";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Conseil municipal",
    title: "L'équipe municipale",
    theme: "mairie",
    meta: "Ville de Colombelles",
  });
}
