import Link from "next/link";
import { AlertTriangle, ArrowRight, Info, TriangleAlert } from "lucide-react";
import { themeStyle } from "@/lib/themes";
import type { Settings } from "@/lib/types";

/** Le niveau du bandeau choisit sa couleur dans la palette thématique. */
const LEVELS = {
  info: { icon: Info, theme: "ecole", label: "Information" },
  vigilance: { icon: TriangleAlert, theme: "emploi", label: "Vigilance" },
  alerte: { icon: AlertTriangle, theme: "actu", label: "Alerte" },
} as const;

export function AlertBanner({ banner }: { banner: Settings["banner"] }) {
  if (!banner.enabled) return null;
  const level = LEVELS[banner.level] ?? LEVELS.info;
  const Icon = level.icon;

  return (
    <div
      style={themeStyle(level.theme)}
      className="theme-bg relative z-40"
      role="region"
      aria-label={level.label}
    >
      <div className="swiss-container flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:gap-5">
        <span className="eyebrow flex shrink-0 items-center gap-2">
          <Icon className="size-4" aria-hidden="true" />
          {banner.title}
        </span>
        <p className="text-sm leading-snug opacity-95">{banner.text}</p>
        {banner.href && (
          <Link
            href={banner.href}
            className="eyebrow ml-auto inline-flex shrink-0 items-center gap-1.5 border-b border-current pb-0.5"
          >
            En savoir plus
            <ArrowRight className="size-3" aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
}
