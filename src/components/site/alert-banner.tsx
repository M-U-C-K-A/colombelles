import Link from "next/link";
import { AlertTriangle, ArrowRight, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Settings } from "@/lib/types";

const LEVELS = {
  info: { icon: Info, className: "bg-acier text-white", label: "Information" },
  vigilance: { icon: TriangleAlert, className: "bg-fonte text-white", label: "Vigilance" },
  alerte: { icon: AlertTriangle, className: "bg-rouge text-white", label: "Alerte" },
} as const;

export function AlertBanner({ banner }: { banner: Settings["banner"] }) {
  if (!banner.enabled) return null;
  const level = LEVELS[banner.level] ?? LEVELS.info;
  const Icon = level.icon;

  return (
    <div className={cn("relative z-40", level.className)} role="region" aria-label={level.label}>
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
