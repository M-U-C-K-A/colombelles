"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AlertCircle, Loader2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Aide à la saisie d'une adresse, sur les voies réellement existantes de la
 * commune. Les suggestions viennent de la Base Adresse Nationale
 * (api-adresse.data.gouv.fr), restreinte au code INSEE de Colombelles.
 *
 * Le champ reste un champ libre : un lieu-dit, un repère ou un point sans
 * adresse doivent pouvoir être décrits. Les suggestions accélèrent la saisie,
 * elles ne la contraignent pas — et si le service est indisponible, le champ
 * fonctionne exactement comme avant.
 *
 * Motif ARIA « combobox » : navigation aux flèches, validation par Entrée,
 * fermeture par Échap, et l'option active est annoncée aux lecteurs d'écran.
 */

const INSEE_COLOMBELLES = "14167";

interface Suggestion {
  label: string;
  context: string;
}

export function AddressField({
  name,
  label,
  required,
  defaultValue,
  error,
  hint,
}: {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
  error?: string;
  hint?: string;
}) {
  const fieldId = useId();
  const listId = `${fieldId}-liste`;
  const hintId = `${fieldId}-aide`;
  const errorId = `${fieldId}-erreur`;

  const [value, setValue] = useState(defaultValue ?? "");
  const term = value.trim();
  // Sous trois caractères, la liste est simplement masquée : on ne vide pas
  // l'état depuis l'effet, ce qui provoquerait un rendu en cascade.
  const canSuggest = term.length >= 3;
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [unavailable, setUnavailable] = useState(false);
  const justPicked = useRef(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (justPicked.current) {
      justPicked.current = false;
      return;
    }
    if (term.length < 3) return;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const url =
          "https://api-adresse.data.gouv.fr/search/?q=" +
          encodeURIComponent(term) +
          `&citycode=${INSEE_COLOMBELLES}&limit=6&autocomplete=1`;
        const data = await fetch(url, { signal: controller.signal }).then((r) => r.json());
        const items: Suggestion[] = (data?.features ?? []).map(
          (f: { properties: { label: string; context: string } }) => ({
            label: f.properties.label,
            context: f.properties.context,
          }),
        );
        setSuggestions(items);
        setOpen(items.length > 0);
        setActiveIndex(-1);
        setUnavailable(false);
      } catch (e) {
        if ((e as Error)?.name !== "AbortError") setUnavailable(true);
      } finally {
        setLoading(false);
      }
    }, 220);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [term]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const pick = (suggestion: Suggestion) => {
    justPicked.current = true;
    setValue(suggestion.label);
    setOpen(false);
    setActiveIndex(-1);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || !canSuggest || suggestions.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      pick(suggestions[activeIndex]);
    } else if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  const describedBy = [hint || !unavailable ? hintId : null, error ? errorId : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={box} className="relative">
      <label htmlFor={fieldId} className="eyebrow mb-2.5 block text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-theme">*</span>}
      </label>

      <div className="relative">
        <MapPin
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          id={fieldId}
          name={name}
          type="text"
          role="combobox"
          autoComplete="off"
          aria-expanded={open && canSuggest && suggestions.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          required={required}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => canSuggest && suggestions.length > 0 && setOpen(true)}
          placeholder="Rue, numéro ou point de repère"
          className={cn(
            "w-full border bg-background py-3 pr-10 pl-10 text-sm transition-colors placeholder:text-muted-foreground focus:border-foreground focus:outline-none",
            error ? "border-theme" : "border-input",
          )}
        />
        {loading && (
          <Loader2
            className="absolute top-1/2 right-3.5 size-4 -translate-y-1/2 animate-spin text-muted-foreground"
            aria-hidden="true"
          />
        )}
      </div>

      {open && canSuggest && suggestions.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Adresses proposées"
          className="absolute inset-x-0 top-full z-20 max-h-64 overflow-y-auto border border-foreground bg-background shadow-[0_16px_32px_-24px_rgba(0,0,0,0.5)]"
        >
          {suggestions.map((suggestion, index) => (
            <li key={suggestion.label} id={`${listId}-${index}`} role="option" aria-selected={index === activeIndex}>
              <button
                type="button"
                tabIndex={-1}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(suggestion)}
                onMouseEnter={() => setActiveIndex(index)}
                className={cn(
                  "flex w-full items-start gap-2.5 px-3.5 py-2.5 text-left text-sm",
                  index === activeIndex ? "bg-foreground text-background" : "hover:bg-secondary",
                )}
              >
                <MapPin className="mt-0.5 size-3.5 shrink-0 opacity-60" aria-hidden="true" />
                {suggestion.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      <p id={hintId} className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {unavailable ? (
          <span className="inline-flex items-center gap-1.5">
            <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
            Les suggestions d&apos;adresse sont momentanément indisponibles — décrivez le lieu
            librement, cela suffit.
          </span>
        ) : (
          (hint ??
            "Saisissez trois caractères pour voir les voies de la commune. Vous pouvez aussi décrire un repère : « devant l'école », « au pied du pont ».")
        )}
      </p>

      {error && (
        <p id={errorId} role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-theme">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
