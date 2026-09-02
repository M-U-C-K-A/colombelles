"use client";

import { useId } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  name: string;
  as?: "input" | "textarea" | "select" | "checkbox";
  type?: string;
  rows?: number;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  options?: string[];
  hint?: string;
  error?: string;
};

const BASE =
  "w-full border bg-background px-3.5 py-3 text-sm transition-colors placeholder:text-muted-foreground focus:border-foreground focus:outline-none";

/** Champ de formulaire accessible : libellé lié, erreur annoncée, aide décrite. */
export function Field({
  label,
  name,
  as = "input",
  type = "text",
  rows = 5,
  required,
  placeholder,
  autoComplete,
  defaultValue,
  options = [],
  hint,
  error,
}: FieldProps) {
  const fieldId = useId();
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ");

  if (as === "checkbox") {
    return (
      <div>
        <div className="flex items-start gap-3">
          <input
            id={fieldId}
            name={name}
            type="checkbox"
            required={required}
            aria-describedby={describedBy || undefined}
            aria-invalid={error ? true : undefined}
            className="mt-1 size-4 shrink-0 accent-[var(--rouge)]"
          />
          <label htmlFor={fieldId} className="text-sm leading-relaxed">
            {label}
            {required && <span className="ml-1 text-rouge">*</span>}
          </label>
        </div>
        {hint && (
          <p id={hintId} className="mt-2 pl-7 text-xs text-muted-foreground">
            {hint}
          </p>
        )}
        {error && <FieldError id={errorId}>{error}</FieldError>}
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={fieldId} className="eyebrow mb-2.5 block text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-rouge">*</span>}
      </label>

      {as === "textarea" ? (
        <textarea
          id={fieldId}
          name={name}
          rows={rows}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          className={cn(BASE, "resize-y", error ? "border-rouge" : "border-input")}
        />
      ) : as === "select" ? (
        <select
          id={fieldId}
          name={name}
          required={required}
          defaultValue={defaultValue ?? ""}
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          className={cn(BASE, error ? "border-rouge" : "border-input")}
        >
          <option value="" disabled>
            Sélectionnez…
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={fieldId}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          className={cn(BASE, error ? "border-rouge" : "border-input")}
        />
      )}

      {hint && (
        <p id={hintId} className="mt-2 text-xs text-muted-foreground">
          {hint}
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

export function FormNotice({
  icon,
  title,
  body,
  footer,
}: {
  icon: React.ReactNode;
  title: string;
  body?: string;
  footer?: React.ReactNode;
}) {
  return (
    <div role="status" className="border-2 border-foreground p-8">
      <div className="flex items-center gap-3">
        {icon}
        <h2 className="text-xl font-medium tracking-[-0.02em]">{title}</h2>
      </div>
      {body && <p className="mt-4 max-w-[52ch] leading-relaxed text-muted-foreground">{body}</p>}
      {footer && <div className="mt-6 border-t border-border pt-5">{footer}</div>}
    </div>
  );
}
