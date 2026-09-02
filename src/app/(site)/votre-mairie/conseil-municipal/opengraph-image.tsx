import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Le conseil municipal — Ville de Colombelles";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Instances municipales",
    title: "Le conseil municipal",
    theme: "mairie",
    meta: "Ville de Colombelles",
  });
}
