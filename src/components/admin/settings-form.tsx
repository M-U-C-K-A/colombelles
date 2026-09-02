"use client";

import { useActionState, useId } from "react";
import { AlertCircle, Save } from "lucide-react";
import { saveSettings } from "@/app/admin/actions/resources";
import { idleState, type ActionState } from "@/lib/form-state";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Settings } from "@/lib/types";

const INPUT =
  "w-full border border-input bg-background px-3.5 py-2.5 text-sm transition-colors focus:border-foreground focus:outline-none";

export function SettingsForm({ settings }: { settings: Settings }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(
    saveSettings,
    idleState,
  );

  const hours = settings.hours.map((h) => `${h.day} | ${h.value}`).join("\n");
  const social = settings.social.map((s) => `${s.label} | ${s.url}`).join("\n");

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

      <Group title="Identité du site">
        <Text name="siteName" label="Nom" defaultValue={settings.siteName} error={state.errors?.siteName} />
        <Text name="tagline" label="Signature" defaultValue={settings.tagline} error={state.errors?.tagline} />
        <Area
          name="description"
          label="Description (référencement)"
          rows={3}
          full
          defaultValue={settings.description}
          hint="Utilisée par les moteurs de recherche et lors du partage sur les réseaux sociaux."
          error={state.errors?.description}
        />
      </Group>

      <Group title="Coordonnées">
        <Text name="address" label="Adresse" full defaultValue={settings.address} error={state.errors?.address} />
        <Text name="postalCode" label="Code postal" defaultValue={settings.postalCode} error={state.errors?.postalCode} />
        <Text name="city" label="Commune" defaultValue={settings.city} error={state.errors?.city} />
        <Text name="phone" label="Téléphone" defaultValue={settings.phone} error={state.errors?.phone} />
        <Text name="email" label="Courriel" type="email" defaultValue={settings.email} error={state.errors?.email} />
        <Area
          name="hours"
          label="Horaires d'ouverture"
          rows={8}
          full
          defaultValue={hours}
          hint="Une ligne par jour, au format « Lundi | 8h30 – 12h30 · 13h30 – 18h00 »."
          error={state.errors?.hours}
        />
        <Area
          name="social"
          label="Réseaux sociaux"
          rows={4}
          full
          defaultValue={social}
          hint="Une ligne par réseau, au format « Facebook | https://… ». Laisser vide pour n'en afficher aucun."
          error={state.errors?.social}
        />
      </Group>

      <Group title="Repères de la commune">
        <Text name="population" label="Population" defaultValue={settings.population} error={state.errors?.population} />
        <Text name="area" label="Superficie" defaultValue={settings.area} error={state.errors?.area} />
        <Text
          name="intercommunalite"
          label="Intercommunalité"
          full
          defaultValue={settings.intercommunalite}
          error={state.errors?.intercommunalite}
        />
      </Group>

      <Group
        title="Bandeau d'information"
        description="Affiché en haut de toutes les pages du site public. À réserver aux informations utiles à tous."
      >
        <Check
          name="bannerEnabled"
          label="Afficher le bandeau"
          defaultChecked={settings.banner.enabled}
          full
        />
        <Select
          name="bannerLevel"
          label="Niveau"
          defaultValue={settings.banner.level}
          options={[
            { value: "info", label: "Information (bleu)" },
            { value: "vigilance", label: "Vigilance (orange)" },
            { value: "alerte", label: "Alerte (rouge)" },
          ]}
        />
        <Text name="bannerTitle" label="Intitulé" defaultValue={settings.banner.title} />
        <Area name="bannerText" label="Message" rows={2} full defaultValue={settings.banner.text} />
        <Text
          name="bannerHref"
          label="Lien « en savoir plus »"
          full
          defaultValue={settings.banner.href}
          hint="Adresse interne (/demarches/…) ou externe. Laisser vide pour masquer le lien."
        />
      </Group>

      <Group
        title="Maintenance"
        description="Ce réglage est journalisé et destiné aux opérations de maintenance planifiées."
      >
        <Check
          name="maintenance"
          label="Signaler une maintenance en cours"
          defaultChecked={settings.maintenance}
          full
          hint="Affiche un bandeau d'avertissement dans l'espace d'administration."
        />
      </Group>

      <div className="sticky bottom-0 flex items-center gap-3 border-t border-border bg-background/95 py-5 backdrop-blur">
        <Button type="submit" size="lg" disabled={pending} className="rounded-none">
          <Save className="size-4" aria-hidden="true" />
          {pending ? "Enregistrement…" : "Enregistrer les paramètres"}
        </Button>
      </div>
    </form>
  );
}

function Group({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="sr-only">{title}</legend>
      <div className="border-t-2 border-foreground pt-4 pb-6">
        <h2 className="text-base font-medium">{title}</h2>
        {description && (
          <p className="mt-2 max-w-[70ch] text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="eyebrow mb-2.5 block text-muted-foreground">
      {children}
    </label>
  );
}

function Error({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-rouge">
      <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

function Text({
  name,
  label,
  type = "text",
  defaultValue,
  full,
  hint,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  defaultValue?: string;
  full?: boolean;
  hint?: string;
  error?: string;
}) {
  const fieldId = useId();
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <Label htmlFor={fieldId}>{label}</Label>
      <input
        id={fieldId}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className={cn(INPUT, error && "border-rouge")}
      />
      {hint && <p className="mt-2 text-xs text-muted-foreground">{hint}</p>}
      {error && <Error>{error}</Error>}
    </div>
  );
}

function Area({
  name,
  label,
  rows = 4,
  defaultValue,
  full,
  hint,
  error,
}: {
  name: string;
  label: string;
  rows?: number;
  defaultValue?: string;
  full?: boolean;
  hint?: string;
  error?: string;
}) {
  const fieldId = useId();
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <Label htmlFor={fieldId}>{label}</Label>
      <textarea
        id={fieldId}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className={cn(INPUT, "resize-y leading-relaxed", error && "border-rouge")}
      />
      {hint && <p className="mt-2 text-xs text-muted-foreground">{hint}</p>}
      {error && <Error>{error}</Error>}
    </div>
  );
}

function Select({
  name,
  label,
  defaultValue,
  options,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
}) {
  const fieldId = useId();
  return (
    <div>
      <Label htmlFor={fieldId}>{label}</Label>
      <select id={fieldId} name={name} defaultValue={defaultValue} className={INPUT}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Check({
  name,
  label,
  defaultChecked,
  full,
  hint,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
  full?: boolean;
  hint?: string;
}) {
  const fieldId = useId();
  return (
    <div className={cn("flex items-start gap-3", full && "sm:col-span-2")}>
      <input
        id={fieldId}
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="mt-1 size-4 shrink-0 accent-[var(--rouge)]"
      />
      <div>
        <label htmlFor={fieldId} className="text-sm font-medium">
          {label}
        </label>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </div>
    </div>
  );
}
