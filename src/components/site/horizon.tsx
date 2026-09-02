import { THEMES, type ThemeKey } from "@/lib/themes";
import { cn } from "@/lib/utils";

/** Ordre spectral des couleurs, identique à l'éventail du logo. */
export const SPECTRUM: ThemeKey[] = [
  "actu",
  "emploi",
  "sport",
  "nature",
  "famille",
  "ecole",
  "contact",
  "culture",
];

/**
 * Filet composé des huit couleurs thématiques : rappel du logo, utilisé comme
 * séparateur structurant entre les grandes sections de la page d'accueil.
 */
export function ColorRule({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-1.5 w-full", className)} aria-hidden="true">
      {SPECTRUM.map((theme) => (
        <span
          key={theme}
          className="h-full flex-1"
          style={{ backgroundColor: `var(--t-${theme})` }}
        />
      ))}
    </div>
  );
}

/** Légende du code couleur, pour rendre le repérage explicite. */
export function ColorLegend({ themes }: { themes: ThemeKey[] }) {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2">
      {themes.map((theme) => (
        <li key={theme} className="flex items-center gap-2">
          <span
            className="size-2.5 shrink-0"
            style={{ backgroundColor: `var(--t-${theme})` }}
            aria-hidden="true"
          />
          <span className="text-xs text-muted-foreground">{THEMES[theme].label}</span>
        </li>
      ))}
    </ul>
  );
}
