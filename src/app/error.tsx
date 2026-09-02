"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Erreur applicative :", error);
  }, [error]);

  return (
    <div className="swiss-container flex flex-1 items-center py-24">
      <div className="swiss-grid w-full items-start">
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <p className="eyebrow text-rouge">Erreur 500</p>
          <p aria-hidden="true" className="display mt-6 text-[7rem] leading-[0.8] text-rouge sm:text-[10rem]">
            500
          </p>
        </div>
        <div className="col-span-4 mt-10 md:col-span-8 lg:col-span-6 lg:col-start-7 lg:mt-0">
          <h1 className="display text-[2.25rem] sm:text-[3rem]">Une erreur est survenue</h1>
          <p className="mt-7 max-w-[50ch] leading-relaxed text-muted-foreground">
            Le service rencontre une difficulté technique. L&apos;incident a été enregistré.
            Vous pouvez réessayer ou revenir à l&apos;accueil.
          </p>
          {error.digest && (
            <p className="numeral eyebrow mt-6 text-muted-foreground">
              Référence technique : {error.digest}
            </p>
          )}
          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              Réessayer
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-foreground px-6 py-3.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            Si le problème persiste, contactez la mairie au{" "}
            <a href="tel:+33231352500" className="link-underline numeral">
              02 31 35 25 00
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
