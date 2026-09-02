"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import type { SearchResult } from "@/lib/queries";

const SHORTCUTS = [
  { title: "Actualités", href: "/actualites" },
  { title: "Agenda", href: "/agenda" },
  { title: "Démarches pratiques", href: "/demarches" },
  { title: "Publications et comptes rendus", href: "/publications" },
  { title: "Annuaire des associations", href: "/annuaire" },
  { title: "Offres d'emploi", href: "/emploi" },
  { title: "Signaler un problème", href: "/signalement" },
  { title: "Contact et horaires", href: "/contact" },
];

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [pending, startTransition] = useTransition();

  const term = query.trim();
  // Les résultats obsolètes restent en mémoire mais ne sont jamais affichés :
  // c'est la requête courante qui décide de ce qui est rendu.
  const shown = term.length >= 2 ? results : [];

  useEffect(() => {
    if (query.trim().length < 2) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: controller.signal })
        .then((r) => r.json())
        .then((data: { results: SearchResult[] }) => setResults(data.results ?? []))
        .catch(() => undefined);
    }, 180);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const go = (href: string) => {
    onOpenChange(false);
    setQuery("");
    startTransition(() => router.push(href));
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Rechercher sur le site"
      description="Actualités, démarches, publications, associations"
    >
      <Command shouldFilter={false} className="p-0">
      <CommandInput
        placeholder="Rechercher une démarche, une actualité, un lieu…"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="max-h-[24rem]">
        {term.length >= 2 && shown.length === 0 && !pending && (
          <CommandEmpty>Aucun résultat pour « {query} ».</CommandEmpty>
        )}

        {term.length < 2 && (
          <CommandGroup heading="Accès rapide">
            {SHORTCUTS.map((item) => (
              <CommandItem key={item.href} value={item.title} onSelect={() => go(item.href)}>
                <ArrowRight className="size-3.5 text-muted-foreground" aria-hidden="true" />
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {shown.length > 0 && (
          <CommandGroup heading={`${shown.length} résultat${shown.length > 1 ? "s" : ""}`}>
            {shown.map((result) => (
              <CommandItem
                key={`${result.type}-${result.href}-${result.title}`}
                value={`${result.title}-${result.href}`}
                onSelect={() => go(result.href)}
                className="flex-col items-start gap-1 py-2.5"
              >
                <div className="flex w-full items-center gap-2">
                  <Search className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="font-medium">{result.title}</span>
                  <span className="eyebrow ml-auto shrink-0 text-muted-foreground">
                    {result.type}
                  </span>
                </div>
                {result.excerpt && (
                  <p className="line-clamp-1 pl-5 text-xs text-muted-foreground">
                    {result.excerpt}
                  </p>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {term.length >= 2 && (
          <CommandGroup>
            <CommandItem
              value="recherche-complete"
              onSelect={() => go(`/recherche?q=${encodeURIComponent(query)}`)}
            >
              <ArrowRight className="size-3.5" aria-hidden="true" />
              Voir tous les résultats pour « {query} »
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>
      </Command>
    </CommandDialog>
  );
}
