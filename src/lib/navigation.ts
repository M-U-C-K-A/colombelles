import type { ThemeKey } from "@/lib/themes";
import type { SectionKey } from "@/lib/types";

export interface SectionMeta {
  key: SectionKey;
  label: string;
  href: string;
  description: string;
  /** Couleur de la rubrique, reprise dans la navigation et les fils d'Ariane. */
  theme: ThemeKey;
  /** Liens fixes ajoutés en tête du groupe correspondant du méga-menu. */
  extras: { group: string; label: string; href: string }[];
}

export const SECTIONS: SectionMeta[] = [
  {
    key: "votre-mairie",
    theme: "mairie",
    label: "Votre mairie",
    href: "/votre-mairie",
    description:
      "L'équipe municipale, les services, le budget, les instances et les élections.",
    extras: [
      { group: "Équipe et instances", label: "Équipe municipale", href: "/votre-mairie/equipe-municipale" },
      { group: "Équipe et instances", label: "Conseil municipal", href: "/votre-mairie/conseil-municipal" },
      { group: "Équipe et instances", label: "Services de la ville", href: "/votre-mairie/services" },
      { group: "Publications", label: "Journal municipal", href: "/publications?categorie=Journal+municipal" },
      { group: "Publications", label: "Comptes rendus du conseil", href: "/publications?categorie=Conseil+municipal" },
      { group: "Publications", label: "Toutes les publications", href: "/publications" },
    ],
  },
  {
    key: "demarches",
    theme: "contact",
    label: "Démarches pratiques",
    href: "/demarches",
    description:
      "État civil, titres d'identité, urbanisme, déchets, sécurité, transports et emploi.",
    extras: [
      { group: "En un clic", label: "Contacter la mairie", href: "/contact" },
      { group: "En un clic", label: "Signaler un problème", href: "/signalement" },
      { group: "En un clic", label: "Offres d'emploi", href: "/emploi" },
      { group: "En un clic", label: "Annuaire et commerces", href: "/annuaire" },
    ],
  },
  {
    key: "vivre-a-colombelles",
    theme: "famille",
    label: "Vivre à Colombelles",
    href: "/vivre-a-colombelles",
    description:
      "Solidarité, petite enfance, écoles, jeunesse, sport, seniors et environnement.",
    extras: [
      { group: "Vie associative", label: "Annuaire des associations", href: "/annuaire?type=association" },
      { group: "Vie associative", label: "Guide des associations", href: "/publications?categorie=Vie+associative" },
    ],
  },
  {
    key: "sortir-et-decouvrir",
    theme: "culture",
    label: "Sortir et découvrir",
    href: "/sortir-et-decouvrir",
    description:
      "Patrimoine industriel, équipements culturels, sport, nature et lieux de vie.",
    extras: [
      { group: "Agenda", label: "Tous les événements", href: "/agenda" },
      { group: "Agenda", label: "Actualités", href: "/actualites" },
      { group: "Agenda", label: "Équipements et lieux", href: "/annuaire?type=equipement" },
    ],
  },
];

export const SECTION_BY_KEY = Object.fromEntries(
  SECTIONS.map((s) => [s.key, s]),
) as Record<SectionKey, SectionMeta>;

/** Raccourcis mis en avant sur la page d'accueil et dans le pied de page. */
export const QUICK_ACCESS: {
  label: string;
  href: string;
  hint: string;
  theme: ThemeKey;
}[] = [
  { label: "Démarches en ligne", href: "/demarches", hint: "État civil, identité, urbanisme", theme: "contact" },
  { label: "Portail famille", href: "/demarches/portail-famille", hint: "Inscriptions et réservations", theme: "famille" },
  { label: "Menus scolaires", href: "/demarches/portail-famille", hint: "Restauration scolaire", theme: "famille" },
  { label: "Écoles et jeunesse", href: "/vivre-a-colombelles/ecoles-maternelles-et-elementaires", hint: "Inscriptions, périscolaire", theme: "ecole" },
  { label: "Déchets et tri", href: "/demarches/dechets-et-proprete", hint: "Calendrier de collecte", theme: "nature" },
  { label: "Offres d'emploi", href: "/emploi", hint: "Recrutement municipal", theme: "emploi" },
  { label: "Horaires et contact", href: "/contact", hint: "Nous joindre", theme: "contact" },
  { label: "Signaler un problème", href: "/signalement", hint: "Espace public", theme: "actu" },
];

export const FOOTER_LINKS = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Données personnelles", href: "/donnees-personnelles" },
  { label: "Accessibilité : non conforme", href: "/accessibilite" },
  { label: "Plan du site", href: "/plan-du-site" },
  { label: "Contact", href: "/contact" },
];
