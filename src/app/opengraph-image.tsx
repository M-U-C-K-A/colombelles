import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { getSettings } from "@/lib/queries";

export const alt = "Ville de Colombelles — site officiel";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const settings = await getSettings();
  return ogImage({
    eyebrow: `${settings.postalCode} · Calvados`,
    title: "Ville de Colombelles",
    theme: "mairie",
    meta: settings.tagline === "Ville de Colombelles" ? settings.intercommunalite : settings.tagline,
  });
}
