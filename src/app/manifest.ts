import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ville de Colombelles",
    short_name: "Colombelles",
    description:
      "Site officiel de la Ville de Colombelles — démarches, actualités, agenda et services municipaux.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f6",
    theme_color: "#d92b1f",
    lang: "fr-FR",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
