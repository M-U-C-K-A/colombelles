import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Annuaire — Ville de Colombelles";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Associations et commerces",
    title: "Annuaire",
    theme: "culture",
    meta: "Ville de Colombelles",
  });
}
