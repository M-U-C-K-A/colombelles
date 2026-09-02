"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Users } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { themeStyle } from "@/lib/themes";
import type { VenueItem } from "@/lib/types";

/**
 * Salles municipales. Au survol — ou à la tabulation, la carte s'ouvre aussi
 * au focus — un aperçu montre la salle, son adresse et l'essentiel des
 * conditions, sans quitter la page.
 */
export function Salles({ venues }: { venues: VenueItem[] }) {
  if (venues.length === 0) return null;

  return (
    <ul className="grid border-t border-l border-border sm:grid-cols-2">
      {venues.map((venue) => (
        <li key={venue.id} style={themeStyle(venue.theme)} className="border-r border-b border-border">
          <HoverCard openDelay={120} closeDelay={80}>
            <HoverCardTrigger asChild>
              <button
                type="button"
                className="group flex w-full flex-col items-start p-6 text-left transition-colors hover:theme-wash focus-visible:theme-wash"
                aria-label={`${venue.name} — aperçu, capacité et adresse`}
              >
                <span className="theme-bg mb-5 block h-1.5 w-9" aria-hidden="true" />
                <span className="text-xl leading-snug font-medium tracking-[-0.02em] transition-colors group-hover:text-theme">
                  {venue.name}
                </span>
                <span className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-3.5 shrink-0" aria-hidden="true" />
                    {venue.capacity}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                    {venue.address}
                  </span>
                </span>
                <span className="eyebrow mt-5 text-theme">Voir l&apos;aperçu</span>
              </button>
            </HoverCardTrigger>

            <HoverCardContent
              align="start"
              sideOffset={8}
              className="w-[22rem] rounded-none border-border p-0"
              style={themeStyle(venue.theme)}
            >
              <Carousel images={venue.images} name={venue.name} />
              <div className="p-5">
                <p className="text-base leading-snug font-medium">{venue.name}</p>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {venue.description}
                </p>
                <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                  <div className="flex gap-2.5">
                    <dt className="sr-only">Adresse</dt>
                    <MapPin className="mt-0.5 size-3.5 shrink-0 text-theme" aria-hidden="true" />
                    <dd>{venue.address}</dd>
                  </div>
                  <div className="flex gap-2.5">
                    <dt className="sr-only">Capacité</dt>
                    <Users className="mt-0.5 size-3.5 shrink-0 text-theme" aria-hidden="true" />
                    <dd>{venue.capacity}</dd>
                  </div>
                </dl>
                <p className="eyebrow mt-4 text-muted-foreground">
                  Colombellois · {venue.rateResident}
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </li>
      ))}
    </ul>
  );
}

/** Petit carrousel manuel : pas de défilement automatique, navigation au clavier. */
function Carousel({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0);
  if (images.length === 0) return null;

  const go = (delta: number) => setIndex((i) => (i + delta + images.length) % images.length);

  return (
    <div className="relative aspect-[8/5] w-full overflow-hidden bg-secondary">
      <Image
        src={images[index]}
        alt={`${name} — vue ${index + 1} sur ${images.length}`}
        fill
        sizes="22rem"
        className="object-cover"
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Vue précédente"
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-background/85 p-1.5 transition-colors hover:bg-background"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Vue suivante"
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-background/85 p-1.5 transition-colors hover:bg-background"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
          <ol className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((image, i) => (
              <li key={image}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Vue ${i + 1}`}
                  aria-current={i === index}
                  className={
                    i === index
                      ? "block size-1.5 bg-white"
                      : "block size-1.5 bg-white/45 transition-colors hover:bg-white/80"
                  }
                />
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
