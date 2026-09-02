import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Contact et horaires — Ville de Colombelles";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Nous joindre",
    title: "Contact et horaires",
    theme: "contact",
    meta: "Ville de Colombelles",
  });
}
