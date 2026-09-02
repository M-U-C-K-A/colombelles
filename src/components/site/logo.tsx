import { cn } from "@/lib/utils";

/**
 * Marque géométrique : la silhouette du haut fourneau réduite à trois volumes
 * — cuve, halle, cheminée. Construite sur une grille de 24 unités.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-8 shrink-0", className)}
      fill="none"
    >
      <rect width="24" height="24" fill="var(--rouge)" />
      <rect x="4" y="4" width="4" height="16" fill="white" />
      <path d="M10 20V10h4v10z" fill="white" />
      <rect x="16" y="4" width="4" height="7" fill="white" />
      <rect x="16" y="13" width="4" height="7" fill="white" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="text-[1.0625rem] font-semibold tracking-[-0.02em] uppercase">
          Colombelles
        </span>
        <span className="eyebrow mt-1 text-muted-foreground">Calvados · Normandie</span>
      </span>
    </span>
  );
}
