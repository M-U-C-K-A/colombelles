"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatBytes } from "@/lib/format";
import { themeStyle, type ThemeKey } from "@/lib/themes";
import { cn } from "@/lib/utils";

/**
 * Repères au survol pour l'administration.
 *
 * Une liste d'administration ne montre qu'une ligne par contenu : de quoi
 * retrouver un élément, pas de quoi le reconnaître. Plutôt que d'ouvrir chaque
 * fiche pour vérifier, le survol — et le focus clavier, la carte s'ouvre aussi
 * à la tabulation — en donne l'essentiel sur place.
 */

/** Repère court : ce qu'un bouton fait, ce qu'un mot veut dire. */
export function Hint({
  label,
  children,
  side = "top",
  asChild = true,
}: {
  label: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  asChild?: boolean;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
      <TooltipContent side={side} className="rounded-none">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

export type Fact = { label: string; value?: string | null };

/**
 * Aperçu d'un contenu. Le déclencheur mène à la fiche : le titre devient
 * cliquable, ce qui évite de viser l'icône de modification.
 */
export function Preview({
  href,
  title,
  subtitle,
  theme,
  eyebrow,
  excerpt,
  facts = [],
  footer,
  image,
  width = "w-[24rem]",
}: {
  href: string;
  title: string;
  subtitle?: string;
  theme?: ThemeKey;
  eyebrow?: string;
  excerpt?: string;
  facts?: Fact[];
  footer?: string;
  image?: { url: string; alt: string };
  width?: string;
}) {
  const shown = facts.filter((fact) => fact.value);

  return (
    <HoverCard openDelay={140} closeDelay={80}>
      <HoverCardTrigger asChild>
        <Link
          href={href}
          className="block max-w-full truncate font-medium underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current focus-visible:decoration-current"
        >
          {title}
        </Link>
      </HoverCardTrigger>

      <HoverCardContent
        align="start"
        sideOffset={8}
        style={theme ? themeStyle(theme) : undefined}
        className={cn("rounded-none border border-border p-0", width)}
      >
        {image && (
          // Aperçu tel qu'il est stocké : l'optimisation masquerait un fichier
          // absent ou hors de proportions.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.url}
            alt={image.alt}
            className="block aspect-[8/5] w-full bg-secondary object-cover"
          />
        )}
        <div className="p-4">
          {eyebrow && <p className="eyebrow text-theme">{eyebrow}</p>}
          <p className={cn("leading-snug font-medium", eyebrow && "mt-2")}>{title}</p>
          {subtitle && <p className="eyebrow mt-1 text-muted-foreground">{subtitle}</p>}
          {excerpt && (
            <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
              {excerpt}
            </p>
          )}
          {shown.length > 0 && (
            <dl className="mt-4 space-y-1.5 border-t border-border pt-3 text-sm">
              {shown.map((fact) => (
                <div key={fact.label} className="flex gap-3">
                  <dt className="eyebrow w-28 shrink-0 pt-0.5 text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="min-w-0 flex-1 break-words">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {footer && <p className="eyebrow mt-4 text-muted-foreground">{footer}</p>}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

type FileMeta = { bytes?: number; width?: number; height?: number; missing?: boolean };

/** Un même fichier est survolé plusieurs fois : on ne le mesure qu'une. */
const measured = new Map<string, FileMeta>();

function useFileMeta(url: string, active: boolean): FileMeta | null {
  const [meta, setMeta] = useState<FileMeta | null>(() => measured.get(url) ?? null);

  useEffect(() => {
    if (!active || measured.has(url)) return;
    let alive = true;

    const measure = async () => {
      const found: FileMeta = {};
      try {
        const head = await fetch(url, { method: "HEAD" });
        if (!head.ok) found.missing = true;
        const length = head.headers.get("content-length");
        if (length) found.bytes = Number(length);
      } catch {
        found.missing = true;
      }
      if (!found.missing) {
        await new Promise<void>((resolve) => {
          const probe = new Image();
          probe.onload = () => {
            found.width = probe.naturalWidth;
            found.height = probe.naturalHeight;
            resolve();
          };
          probe.onerror = () => {
            found.missing = true;
            resolve();
          };
          probe.src = url;
        });
      }
      measured.set(url, found);
      if (alive) setMeta(found);
    };

    void measure();
    return () => {
      alive = false;
    };
  }, [url, active]);

  return meta;
}

/**
 * Aperçu d'un média : l'image, son poids et ses dimensions réels, et les
 * contenus qui s'en servent — de quoi savoir ce qu'on remplace ou supprime.
 */
export function MediaPreview({
  url,
  name,
  alt,
  credit,
  usedIn,
  children,
}: {
  url: string;
  name: string;
  alt: string;
  credit?: string;
  usedIn: string[];
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const meta = useFileMeta(url, open);
  const format = url.split(".").pop()?.toUpperCase() ?? "—";

  return (
    <HoverCard open={open} onOpenChange={setOpen} openDelay={140} closeDelay={80}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent
        align="start"
        sideOffset={8}
        className="w-[24rem] rounded-none border border-border p-0"
      >
        {meta?.missing ? (
          <p className="border-b border-border bg-amber-500/10 px-4 py-3 text-sm">
            Fichier introuvable à cette adresse. Déposez-le dans{" "}
            <code className="bg-muted px-1 font-mono text-xs">public{url}</code>.
          </p>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt={alt}
            className="block max-h-64 w-full bg-secondary object-contain"
          />
        )}

        <div className="p-4">
          <p className="leading-snug font-medium">{name}</p>
          <p className="eyebrow mt-1 break-all text-muted-foreground">{url}</p>

          <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-3 text-sm">
            <div>
              <dt className="eyebrow text-muted-foreground">Poids</dt>
              <dd className="numeral mt-1">
                {meta?.bytes ? formatBytes(meta.bytes) : meta?.missing ? "—" : "…"}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-muted-foreground">Dimensions</dt>
              <dd className="numeral mt-1">
                {meta?.width ? `${meta.width} × ${meta.height}` : meta?.missing ? "—" : "…"}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-muted-foreground">Format</dt>
              <dd className="mt-1">{format}</dd>
            </div>
          </dl>

          <p className="mt-4 border-t border-border pt-3 text-sm">
            <span className="eyebrow block text-muted-foreground">Texte alternatif</span>
            <span className="mt-1 block leading-relaxed">{alt || "— manquant"}</span>
          </p>

          <p className="mt-3 text-sm">
            <span className="eyebrow block text-muted-foreground">Utilisée par</span>
            <span className="mt-1 block leading-relaxed">
              {usedIn.length === 0 ? "Aucun contenu pour l'instant" : usedIn.join(", ")}
            </span>
          </p>

          {credit && <p className="eyebrow mt-4 text-muted-foreground">© {credit}</p>}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
