"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FeatureGroup, Map as LeafletMap } from "leaflet";
import { themeStyle, type ThemeKey } from "@/lib/themes";
import { cn } from "@/lib/utils";
import type { PlaceItem } from "@/lib/types";

/**
 * Emprise officielle de la commune (contour IGN, API Découpage administratif).
 * Elle borne le déplacement, mais ne sert pas de cadrage : la commune est
 * étroite et très allongée, si bien que l'ajuster dans un cadre large montre
 * surtout les communes voisines. Le cadrage se fait sur les points eux-mêmes.
 */
const COMMUNE: [[number, number], [number, number]] = [
  [49.17800, -0.31900],
  [49.22100, -0.26500],
];

/**
 * Carte interactive des équipements. Les catégories se filtrent depuis la
 * légende, qui indique le nombre de points — et sert aussi de liste : la carte
 * n'étant pas exploitable au lecteur d'écran, les mêmes lieux sont repris en
 * dessous sous forme de liste, seule version qui fasse foi pour l'accessibilité.
 */
export function CityMap({ places }: { places: PlaceItem[] }) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  // FeatureGroup plutôt que LayerGroup : lui seul sait calculer ses bornes.
  const layer = useRef<FeatureGroup | null>(null);
  const resize = useRef<ResizeObserver | null>(null);
  const fitRef = useRef<(() => void) | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const categories = useMemo(() => {
    const counts = new Map<string, { count: number; theme: ThemeKey }>();
    for (const p of places) {
      const entry = counts.get(p.category) ?? { count: 0, theme: p.theme };
      counts.set(p.category, { count: entry.count + 1, theme: entry.theme });
    }
    return [...counts.entries()].map(([name, v]) => ({ name, ...v }));
  }, [places]);

  const shown = useMemo(
    () => (active ? places.filter((p) => p.category === active) : places),
    [active, places],
  );

  // Initialisation : Leaflet manipule le DOM, il ne peut vivre que côté client.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = await import("leaflet");
      if (cancelled || !container.current || map.current) return;

      const instance = L.map(container.current, {
        scrollWheelZoom: false,
        attributionControl: true,
        maxBounds: COMMUNE,
        maxBoundsViscosity: 0.6,
        minZoom: 12,
      });

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; contributeurs <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(instance);

      layer.current = L.featureGroup().addTo(instance);
      map.current = instance;

      // Leaflet calcule le cadrage à partir de la taille du conteneur. Au
      // premier rendu celle-ci n'est pas encore connue : sans ce recalage, la
      // carte s'ouvre bien trop dézoomée.
      const fit = () => {
        instance.invalidateSize({ animate: false });
        const bounds = layer.current?.getBounds();
        if (bounds?.isValid()) {
          instance.fitBounds(bounds, { padding: [48, 48], maxZoom: 16, animate: false });
        } else {
          instance.fitBounds(COMMUNE, { padding: [16, 16], animate: false });
        }
      };
      fitRef.current = fit;
      fit();

      const observer = new ResizeObserver(() => instance.invalidateSize({ animate: false }));
      observer.observe(container.current);
      resize.current = observer;

      requestAnimationFrame(fit);
      setReady(true);
    })();

    return () => {
      cancelled = true;
      resize.current?.disconnect();
      resize.current = null;
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Mise à jour des repères à chaque changement de filtre.
  useEffect(() => {
    if (!ready || !layer.current) return;
    let cancelled = false;
    (async () => {
      const L = await import("leaflet");
      if (cancelled || !layer.current) return;
      layer.current.clearLayers();

      for (const place of shown) {
        const icon = L.divIcon({
          className: "",
          html: `<span class="map-pin" style="background:var(--t-${place.theme})"></span>`,
          iconSize: [22, 22],
          iconAnchor: [11, 26],
          popupAnchor: [0, -26],
        });

        const lines = [
          `<span style="display:block;font-size:0.6875rem;letter-spacing:.14em;text-transform:uppercase;color:var(--t-${place.theme})">${escapeHtml(place.category)}</span>`,
          `<strong style="display:block;margin-top:.5rem;font-size:0.9375rem;font-weight:500;letter-spacing:-.01em">${escapeHtml(place.name)}</strong>`,
          `<span style="display:block;margin-top:.35rem;color:var(--muted-foreground)">${escapeHtml(place.address)}</span>`,
          place.description
            ? `<span style="display:block;margin-top:.55rem;padding-top:.55rem;border-top:1px solid var(--border)">${escapeHtml(place.description)}</span>`
            : "",
          place.phone ? `<span style="display:block;margin-top:.4rem;font-variant-numeric:tabular-nums">${escapeHtml(place.phone)}</span>` : "",
          place.href ? `<a style="display:inline-block;margin-top:.6rem" href="${place.href}">En savoir plus</a>` : "",
        ].filter(Boolean);

        L.marker([place.lat, place.lon], { icon, title: place.name })
          .bindPopup(`<div style="--theme:var(--t-${place.theme})">${lines.join("")}</div>`)
          .addTo(layer.current);
      }

      // Le cadrage suit la sélection : filtrer une catégorie rapproche la vue.
      fitRef.current?.();
    })();
    return () => {
      cancelled = true;
    };
  }, [ready, shown]);

  return (
    <div>
      <div className="grid gap-px border border-border bg-border lg:grid-cols-[1fr_17rem]">
        <div
          ref={container}
          className="z-0 h-[28rem] w-full bg-secondary lg:h-[36rem]"
          role="application"
          aria-label="Carte des équipements de Colombelles"
        />

        {/* Légende cliquable, qui sert aussi de filtre */}
        <div className="bg-background p-5">
          <p className="eyebrow mb-4 text-muted-foreground">Catégories</p>
          <ul className="space-y-1">
            <li>
              <FilterButton active={active === null} onClick={() => setActive(null)}>
                <span className="size-3 shrink-0 border border-border bg-muted" aria-hidden="true" />
                Tout voir
                <span className="numeral ml-auto text-xs text-muted-foreground">
                  {places.length}
                </span>
              </FilterButton>
            </li>
            {categories.map((category) => (
              <li key={category.name} style={themeStyle(category.theme)}>
                <FilterButton
                  active={active === category.name}
                  onClick={() => setActive(active === category.name ? null : category.name)}
                >
                  <span className="theme-bg size-3 shrink-0" aria-hidden="true" />
                  {category.name}
                  <span className="numeral ml-auto text-xs text-muted-foreground">
                    {category.count}
                  </span>
                </FilterButton>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
            Fond cartographique © contributeurs OpenStreetMap, sous licence ODbL. Faites défiler
            la page normalement : le zoom à la molette est désactivé sur la carte.
          </p>
        </div>
      </div>

      {/* Équivalent accessible : la même information, en liste */}
      <h2 className="rule-strong mt-12 pt-4 pb-5 text-xl font-medium tracking-[-0.02em]">
        Les lieux, en liste
      </h2>
      <ul className="grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((place) => (
          <li key={place.id} style={themeStyle(place.theme)} className="border-r border-b border-border p-5">
            <p className="eyebrow text-theme">{place.category}</p>
            <p className="mt-2.5 leading-snug font-medium">
              {place.href ? (
                <a href={place.href} className="link-underline">
                  {place.name}
                </a>
              ) : (
                place.name
              )}
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">{place.address}</p>
            {place.description && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {place.description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex w-full items-center gap-2.5 px-2 py-2 text-left text-sm transition-colors",
        active ? "bg-foreground text-background" : "hover:bg-secondary",
      )}
    >
      {children}
    </button>
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

