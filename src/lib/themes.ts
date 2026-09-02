/**
 * Couleurs thématiques — « Les couleurs de l'horizon ».
 *
 * Le logo de la ville place un éventail de couleurs dans le C. Le site reprend
 * ce principe : chaque grand thème porte sa couleur, ce qui permet de savoir
 * d'un coup d'œil où l'on se trouve. Les valeurs sont réglées pour rester
 * lisibles dans les deux sens — texte coloré sur fond clair, et texte blanc sur
 * aplat coloré (contraste AA dans les deux cas).
 */

export type ThemeKey =
  | "actu"
  | "mairie"
  | "contact"
  | "ecole"
  | "famille"
  | "solidarite"
  | "nature"
  | "sport"
  | "emploi"
  | "culture"
  | "patrimoine";

export interface ThemeMeta {
  key: ThemeKey;
  label: string;
  /** Nom de la couleur, affiché dans l'administration. */
  color: string;
}

export const THEMES: Record<ThemeKey, ThemeMeta> = {
  actu: { key: "actu", label: "Actualités et vie municipale", color: "Rouge" },
  mairie: { key: "mairie", label: "Institution, budget, élections", color: "Bleu nuit" },
  contact: { key: "contact", label: "Démarches et prise de contact", color: "Violet" },
  ecole: { key: "ecole", label: "Écoles et jeunesse", color: "Bleu" },
  famille: { key: "famille", label: "Famille, petite enfance, menus", color: "Bleu ciel" },
  solidarite: { key: "solidarite", label: "Solidarité, seniors, santé", color: "Framboise" },
  nature: { key: "nature", label: "Environnement, déchets, nature", color: "Vert" },
  sport: { key: "sport", label: "Sport et loisirs", color: "Vert olive" },
  emploi: { key: "emploi", label: "Emploi, commerce, économie", color: "Orange" },
  culture: { key: "culture", label: "Culture et agenda", color: "Magenta" },
  patrimoine: { key: "patrimoine", label: "Patrimoine et histoire", color: "Rouille" },
};

export const THEME_KEYS = Object.keys(THEMES) as ThemeKey[];

export const THEME_OPTIONS = THEME_KEYS.map((key) => ({
  value: key,
  label: `${THEMES[key].color} — ${THEMES[key].label}`,
}));

export function isThemeKey(value: unknown): value is ThemeKey {
  return typeof value === "string" && value in THEMES;
}

export const asTheme = (value: unknown, fallback: ThemeKey = "mairie"): ThemeKey =>
  isThemeKey(value) ? value : fallback;

/**
 * Style à poser sur un conteneur : tous les descendants peuvent alors utiliser
 * `var(--theme)`, via les utilitaires `theme-text`, `theme-bg`, `theme-rule`,
 * `theme-wash` et `theme-dot`.
 */
export function themeStyle(theme: ThemeKey): React.CSSProperties {
  return { "--theme": `var(--t-${theme})` } as React.CSSProperties;
}

/** Rattachement des catégories rédactionnelles aux couleurs, à défaut de choix explicite. */
const CATEGORY_THEMES: Record<string, ThemeKey> = {
  "vie municipale": "actu",
  "démocratie locale": "actu",
  travaux: "mairie",
  "grands projets": "patrimoine",
  éducation: "ecole",
  jeunesse: "ecole",
  "petite enfance": "famille",
  famille: "famille",
  solidarité: "solidarite",
  seniors: "solidarite",
  santé: "solidarite",
  environnement: "nature",
  nature: "nature",
  propreté: "nature",
  sport: "sport",
  emploi: "emploi",
  commerce: "emploi",
  culture: "culture",
  "vie associative": "culture",
  patrimoine: "patrimoine",
};

export function themeForCategory(category: string, fallback: ThemeKey = "actu"): ThemeKey {
  return CATEGORY_THEMES[category.trim().toLowerCase()] ?? fallback;
}
