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

/**
 * « Les couleurs de l'horizon » — l'éventail du logo à grande échelle, avec en
 * découpe la silhouette du site sidérurgique : tour de refroidissement, cuve du
 * haut fourneau et halle des soufflantes. Aplats géométriques, aucun relief.
 */
export function HorizonPanel({ className }: { className?: string }) {
  const cx = 240;
  const horizon = 236;
  const radius = 236;
  const step = 180 / SPECTRUM.length;

  const point = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return `${(cx + radius * Math.cos(rad)).toFixed(1)} ${(horizon + radius * Math.sin(rad)).toFixed(1)}`;
  };

  return (
    <div className={cn("relative overflow-hidden bg-secondary", className)}>
      <svg
        viewBox="0 0 480 300"
        role="img"
        aria-label="Éventail des couleurs de la ville se levant derrière la silhouette de l'ancien site sidérurgique : tour de refroidissement, haut fourneau et halle des soufflantes"
        className="size-full"
      >
        <clipPath id="horizon-frame">
          <rect x="0" y="0" width="480" height="300" />
        </clipPath>

        <g clipPath="url(#horizon-frame)">
          {SPECTRUM.map((theme, index) => (
            <path
              key={theme}
              d={`M ${cx} ${horizon} L ${point(180 + index * step)} A ${radius} ${radius} 0 0 1 ${point(
                180 + (index + 1) * step,
              )} Z`}
              fill={`var(--t-${theme})`}
            />
          ))}

          {/* Silhouette industrielle, posée sur l'horizon */}
          <g fill="var(--foreground)">
            {/* Tour de refroidissement */}
            <path d="M74 236 84 118q3-16 20-22 17 6 20 22l10 118Z" />
            {/* Cuve du haut fourneau et sa cheminée */}
            <rect x="196" y="126" width="46" height="110" />
            <rect x="208" y="86" width="22" height="44" />
            <rect x="160" y="164" width="36" height="72" />
            {/* Passerelle */}
            <rect x="124" y="150" width="38" height="9" />
            {/* Halle des soufflantes */}
            <path d="M262 236v-56h96v56Z" />
            <path d="M262 180l48-22 48 22Z" />
            {/* Cheminées secondaires */}
            <rect x="378" y="140" width="14" height="96" />
            <rect x="404" y="168" width="10" height="68" />
            {/* Sol */}
            <rect x="0" y="236" width="480" height="64" />
          </g>
        </g>
      </svg>
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
