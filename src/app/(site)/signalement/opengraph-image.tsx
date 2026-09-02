import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Signaler un problème — Ville de Colombelles";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Espace public",
    title: "Signaler un problème",
    theme: "actu",
    meta: "Ville de Colombelles",
  });
}
