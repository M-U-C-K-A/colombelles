import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Offres d'emploi — Ville de Colombelles";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Recrutement municipal",
    title: "Offres d'emploi",
    theme: "emploi",
    meta: "Ville de Colombelles",
  });
}
