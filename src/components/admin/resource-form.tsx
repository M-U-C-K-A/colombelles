"use client";

import Link from "next/link";
import { useActionState, useId } from "react";
import { AlertCircle, Save } from "lucide-react";
import { saveResource, type ResourceKind } from "@/app/admin/actions/resources";
import { idleState, type ActionState } from "@/lib/form-state";
import { Button } from "@/components/ui/button";
import type { FieldGroup, FieldSpec } from "@/lib/admin-fields";
import { cn } from "@/lib/utils";

const INPUT =
  "w-full border border-input bg-background px-3.5 py-2.5 text-sm transition-colors placeholder:text-muted-foreground focus:border-foreground focus:outline-none";

export function ResourceForm({
  kind,
  recordId,
  groups,
  values,
  cancelHref,
  submitLabel = "Enregistrer",
}: {
  kind: ResourceKind;
  recordId: string | null;
  groups: FieldGroup[];
  values: Record<string, string | boolean | number | undefined>;
  cancelHref: string;
  submitLabel?: string;
}) {
  const boundAction = saveResource.bind(null, kind, recordId);
  const [state, action, pending] = useActionState<ActionState, FormData>(boundAction, idleState);

  return (
    <form action={action} className="max-w-4xl space-y-12" noValidate>
      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="flex items-center gap-2 border-l-2 border-rouge bg-rouge/5 py-3 pl-4 text-sm text-rouge"
        >
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          {state.message}
        </p>
      )}

      {groups.map((group) => (
        <fieldset key={group.title}>
          <legend className="sr-only">{group.title}</legend>
          <div className="border-t-2 border-foreground pt-4 pb-6">
            <h2 className="text-base font-medium">{group.title}</h2>
            {group.description && (
              <p className="mt-2 max-w-[70ch] text-sm text-muted-foreground">
                {group.description}
              </p>
            )}
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {group.fields.map((field) => (
              <AdminField
                key={field.name}
                field={field}
                value={values[field.name]}
                error={state.errors?.[field.name]}
              />
            ))}
          </div>
        </fieldset>
      ))}

      <div className="sticky bottom-0 flex flex-wrap items-center gap-3 border-t border-border bg-background/95 py-5 backdrop-blur">
        <Button type="submit" disabled={pending} size="lg" className="rounded-none">
          <Save className="size-4" aria-hidden="true" />
          {pending ? "Enregistrement…" : submitLabel}
        </Button>
        <Link
          href={cancelHref}
          className="border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:border-foreground"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}

function AdminField({
  field,
  value,
  error,
}: {
  field: FieldSpec;
  value: string | boolean | number | undefined;
  error?: string;
}) {
  const fieldId = useId();
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
  const describedBy = [field.hint ? hintId : null, error ? errorId : null]
    .filter(Boolean)
    .join(" ");
  const type = field.type ?? "text";
  const span = field.full || type === "textarea" || type === "markdown" ? "sm:col-span-2" : "";

  if (type === "checkbox") {
    return (
      <div className={cn("flex items-start gap-3", span)}>
        <input
          id={fieldId}
          name={field.name}
          type="checkbox"
          defaultChecked={Boolean(value)}
          className="mt-1 size-4 shrink-0 accent-[var(--rouge)]"
          aria-describedby={describedBy || undefined}
        />
        <div>
          <label htmlFor={fieldId} className="text-sm font-medium">
            {field.label}
          </label>
          {field.hint && (
            <p id={hintId} className="mt-1 text-xs text-muted-foreground">
              {field.hint}
            </p>
          )}
          {error && <FieldError id={errorId}>{error}</FieldError>}
        </div>
      </div>
    );
  }

  return (
    <div className={span}>
      <label htmlFor={fieldId} className="eyebrow mb-2.5 block text-muted-foreground">
        {field.label}
        {field.required && <span className="ml-1 text-rouge">*</span>}
      </label>

      {type === "select" ? (
        <select
          id={fieldId}
          name={field.name}
          defaultValue={value === undefined ? "" : String(value)}
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          className={cn(INPUT, error && "border-rouge")}
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" || type === "markdown" ? (
        <textarea
          id={fieldId}
          name={field.name}
          rows={field.rows ?? (type === "markdown" ? 18 : 4)}
          defaultValue={value === undefined ? "" : String(value)}
          placeholder={field.placeholder}
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          className={cn(
            INPUT,
            "resize-y leading-relaxed",
            type === "markdown" && "font-mono text-[0.8125rem]",
            error && "border-rouge",
          )}
        />
      ) : (
        <input
          id={fieldId}
          name={field.name}
          type={
            type === "datetime"
              ? "datetime-local"
              : type === "number"
                ? "number"
                : type === "date"
                  ? "date"
                  : type
          }
          defaultValue={value === undefined ? "" : String(value)}
          placeholder={field.placeholder}
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          className={cn(INPUT, error && "border-rouge")}
        />
      )}

      {field.hint && (
        <p id={hintId} className="mt-2 text-xs text-muted-foreground">
          {field.hint}
        </p>
      )}
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-rouge">
      <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

/** Aide-mémoire de la syntaxe acceptée dans les champs de contenu. */
export function MarkdownHelp() {
  return (
    <details className="border border-border p-4 text-sm">
      <summary className="cursor-pointer font-medium">Syntaxe de mise en forme</summary>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        {[
          ["## Titre", "Titre de niveau 2"],
          ["### Sous-titre", "Titre de niveau 3"],
          ["**texte**", "Gras"],
          ["*texte*", "Italique"],
          ["- élément", "Liste à puces"],
          ["1. élément", "Liste numérotée"],
          ["> citation", "Citation"],
          ["[libellé](/adresse)", "Lien"],
          ["| a | b |", "Tableau (ligne de séparation : | --- | --- |)"],
        ].map(([syntax, meaning]) => (
          <div key={syntax} className="flex gap-3">
            <dt className="shrink-0 bg-muted px-1.5 py-0.5 font-mono text-xs">{syntax}</dt>
            <dd className="text-xs text-muted-foreground">{meaning}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
