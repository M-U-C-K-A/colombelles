import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Les services de la ville — Ville de Colombelles";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Administration municipale",
    title: "Les services de la ville",
    theme: "mairie",
    meta: "Ville de Colombelles",
  });
}
