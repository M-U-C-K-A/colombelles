import { cn } from "@/lib/utils";
import { THEME_KEYS } from "@/lib/themes";

/**
 * Marque de la ville — reprise du principe du logo municipal : un C ouvert
 * qui enferme un éventail de couleurs posé sur la ligne d'horizon.
 *
 * Les huit rayons reprennent exactement les couleurs thématiques du site : le
 * code couleur de la navigation est donc annoncé dès le logo.
 */

/** Ordre spectral des rayons, de gauche à droite. */
const RAYS = [
  "actu",
  "emploi",
  "sport",
  "nature",
  "famille",
  "ecole",
  "contact",
  "culture",
] as const satisfies readonly (typeof THEME_KEYS)[number][];

const CX = 32;
const CY = 32;
/** Le disque intérieur ; l'horizon passe par son centre. */
const DISC = 20.5;

/** Secteur angulaire [from, to] en degrés, mesurés depuis l'horizontale gauche. */
function ray(from: number, to: number) {
  const point = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return `${(CX + DISC * Math.cos(rad)).toFixed(2)} ${(CY + DISC * Math.sin(rad)).toFixed(2)}`;
  };
  return `M ${CX} ${CY} L ${point(from)} A ${DISC} ${DISC} 0 0 1 ${point(to)} Z`;
}

export function LogoMark({ className, title }: { className?: string; title?: string }) {
  const step = 180 / RAYS.length;

  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("size-9 shrink-0", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {/* Le soleil levant : demi-disque de couleurs posé sur l'horizon */}
      {RAYS.map((theme, index) => (
        <path
          key={theme}
          d={ray(180 + index * step, 180 + (index + 1) * step)}
          fill={`var(--t-${theme})`}
        />
      ))}

      {/* La ligne d'horizon */}
      <rect x={CX - DISC - 3} y={CY - 1} width={(DISC + 3) * 2} height="2.2" fill="currentColor" />

      {/* Le C : anneau ouvert vers la droite */}
      <path
        d="M 47 13 A 24.5 24.5 0 1 0 47 51"
        fill="none"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="butt"
      />
    </svg>
  );
}

export function Wordmark({
  className,
  tagline = true,
}: {
  className?: string;
  tagline?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className="size-10" />
      <span className="flex flex-col leading-none">
        <span className="text-[0.625rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
          Ville de
        </span>
        <span className="mt-1 text-[1.125rem] leading-none font-semibold tracking-[-0.025em]">
          Colombelles
        </span>
        {tagline && (
          <span className="mt-1.5 text-[0.6875rem] tracking-[0.02em] text-muted-foreground">
            Les couleurs de l&apos;horizon
          </span>
        )}
      </span>
    </span>
  );
}
