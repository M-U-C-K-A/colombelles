"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Mention permanente rappelant que ce site est une démonstration.
 *
 * Le repère reste discret ; le texte s'ouvre au survol, au clavier et au
 * toucher. Un clic l'épingle : sans cela le panneau se refermerait dès que le
 * pointeur le quitte, et le lien qu'il contient serait hors d'atteinte. Le
 * paragraphe est toujours présent dans le document et rattaché au bouton par
 * `aria-describedby` : il est donc restitué par les lecteurs d'écran même sans
 * ouvrir le panneau, où le survol n'existe pas.
 */
export function DemoNotice() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = () => {
      setOpen(false);
      setPinned(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onPointer = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  return (
    <div
      ref={root}
      className="fixed right-4 bottom-4 z-[60] print:hidden sm:right-6 sm:bottom-6"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => !pinned && setOpen(false)}
    >
      {/* L'espace sous le panneau fait partie de la zone survolée : sans lui,
          traverser les quelques pixels qui le séparent du bouton refermerait
          tout avant d'avoir atteint le lien. */}
      <div
        className={cn(
          "absolute right-0 bottom-full w-[19rem] pb-2.5 transition-all duration-150 sm:w-[23rem]",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible pointer-events-none translate-y-1 opacity-0",
        )}
      >
        <div
          id={panelId}
          role="note"
          className="border border-foreground bg-background p-5 text-left shadow-[0_20px_44px_-24px_rgba(0,0,0,0.55)]"
        >
          <p className="eyebrow text-theme">Site de démonstration</p>
          <p className="mt-3 text-sm leading-relaxed">
            Ceci n&apos;est pas le site officiel de la Ville de Colombelles. Il s&apos;agit
            d&apos;une <strong className="font-medium">proposition de refonte</strong>, réalisée
            de façon indépendante et sans lien avec la commune.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Les informations pratiques — coordonnées, horaires, élus, équipements — reprennent
            celles du site municipal, mais les actualités, l&apos;agenda et les documents sont
            fictifs. Ne vous y fiez pas pour une démarche.
          </p>
          <a
            href="https://www.colombelles.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow mt-4 inline-block border-b-2 border-foreground pb-1"
          >
            Aller sur le site officiel
          </a>
        </div>
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-describedby={panelId}
        onClick={() => {
          setPinned(!pinned);
          setOpen(!pinned);
        }}
        onFocus={() => setOpen(true)}
        className="flex items-center gap-2 border border-foreground bg-background py-2 pr-3 pl-2.5 text-xs font-medium shadow-[0_6px_18px_-10px_rgba(0,0,0,0.5)] transition-colors hover:bg-foreground hover:text-background"
      >
        <Info className="size-4 shrink-0" aria-hidden="true" />
        Site de démonstration
      </button>
    </div>
  );
}
