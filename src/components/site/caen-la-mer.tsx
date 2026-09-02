import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Rattachement intercommunal. Colombelles est membre de la **communauté
 * urbaine** Caen la mer — une communauté urbaine, et non une communauté de
 * communes : la distinction n'est pas cosmétique, elle détermine l'étendue des
 * compétences transférées (eau, voirie, urbanisme, transports…).
 */
export function CaenLaMer({
  variant = "block",
  className,
}: {
  variant?: "block" | "footer";
  className?: string;
}) {
  const logo = (
    <span className="inline-flex shrink-0 items-center bg-white px-3 py-2">
      <Image
        src="/logo-caen-la-mer.png"
        alt="Communauté urbaine Caen la mer"
        width={106}
        height={78}
        style={{ width: 106, height: 78 }}
      />
    </span>
  );

  if (variant === "footer") {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        {logo}
        <p className="text-xs leading-relaxed opacity-70">
          Colombelles est membre de la
          <br />
          <strong className="font-medium opacity-100">communauté urbaine Caen la mer</strong>
          <br />
          48 communes · 270 000 habitants
        </p>
      </div>
    );
  }

  return (
    <aside className={cn("border border-border p-6", className)}>
      <p className="eyebrow text-muted-foreground">Intercommunalité</p>
      <div className="mt-5 flex flex-wrap items-center gap-5">
        {logo}
        <div className="min-w-0">
          <p className="text-lg leading-snug font-medium tracking-[-0.02em]">
            Communauté urbaine Caen la mer
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            48 communes · environ 270 000 habitants
          </p>
        </div>
      </div>
      <p className="mt-5 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
        Communauté <em>urbaine</em> et non communauté de communes : le statut emporte le
        transfert d&apos;un bloc de compétences plus large — eau et assainissement, voirie,
        collecte des déchets, transports, urbanisme, développement économique.
      </p>
      <a
        href="https://caenlamer.fr"
        target="_blank"
        rel="noopener noreferrer"
        className="eyebrow mt-6 inline-flex items-center gap-1.5 border-b-2 border-foreground pb-1"
      >
        caenlamer.fr
        <ArrowUpRight className="size-3.5" aria-hidden="true" />
      </a>
    </aside>
  );
}
