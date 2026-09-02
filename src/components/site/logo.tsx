import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logo officiel de la Ville de Colombelles — le C ouvert, sa roue de couleurs
 * et la silhouette de la ville, avec la devise « Les couleurs de l'horizon ».
 *
 * Le fichier n'existant qu'en version pour fond clair, les emplacements sombres
 * (pied de page, administration) le posent sur une réserve blanche : le blanc
 * tournant est la manière habituelle d'y placer un logo polychrome sans en
 * altérer les couleurs.
 */

const SOURCE_WIDTH = 288;
const SOURCE_HEIGHT = 100;

export function SiteLogo({
  height = 44,
  plate = false,
  priority = false,
  className,
}: {
  height?: number;
  /** Réserve blanche, pour les fonds sombres. */
  plate?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const width = Math.round((SOURCE_WIDTH / SOURCE_HEIGHT) * height);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center",
        plate && "bg-white px-3 py-2",
        className,
      )}
    >
      <Image
        src="/logo-colombelles.png"
        alt="Ville de Colombelles — les couleurs de l'horizon"
        width={width}
        height={height}
        priority={priority}
        className="h-auto w-auto"
        style={{ height, width }}
      />
    </span>
  );
}

/**
 * Pictogramme seul : le carré de gauche du logo, recadré par la fenêtre.
 * Utilisé là où la place manque pour le bloc-marque complet.
 */
export function LogoMark({
  size = 36,
  plate = false,
  className,
}: {
  size?: number;
  plate?: boolean;
  className?: string;
}) {
  const scale = size / SOURCE_HEIGHT;

  return (
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden",
        plate && "bg-white",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Image
        src="/logo-colombelles.png"
        alt=""
        width={Math.round(SOURCE_WIDTH * scale)}
        height={size}
        className="max-w-none"
        style={{ width: Math.round(SOURCE_WIDTH * scale), height: size }}
      />
    </span>
  );
}
