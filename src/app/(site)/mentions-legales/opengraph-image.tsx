import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Mentions légales — Ville de Colombelles";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Informations légales",
    title: "Mentions légales",
    theme: "mairie",
    meta: "Ville de Colombelles",
  });
}
