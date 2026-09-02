"use client";

import { useActionState, useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { submitReport } from "@/app/actions/public";
import { initialFormState } from "@/lib/form-state";
import { Button } from "@/components/ui/button";
import { AddressField } from "@/components/site/address-field";
import { Field, FormNotice } from "@/components/site/form-parts";

const CATEGORIES = [
  "Voirie et chaussée",
  "Éclairage public",
  "Propreté et dépôt sauvage",
  "Espaces verts",
  "Mobilier urbain",
  "Signalisation",
  "Eau et assainissement",
  "Autre",
];

export function ReportForm() {
  const [state, action, pending] = useActionState(submitReport, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      toast.success("Signalement enregistré", { description: state.reference });
    }
    if (state.status === "error") toast.error(state.message ?? "Le formulaire comporte des erreurs.");
  }, [state]);

  if (state.status === "success") {
    return (
      <FormNotice
        icon={<CheckCircle2 className="size-5 text-theme" aria-hidden="true" />}
        title="Signalement enregistré"
        body={state.message}
        footer={
          state.reference ? (
            <>
              <span className="eyebrow text-muted-foreground">Référence du dossier</span>
              <span className="numeral mt-1 block text-lg font-medium">{state.reference}</span>
            </>
          ) : undefined
        }
      />
    );
  }

  return (
    <form ref={formRef} action={action} className="space-y-6" noValidate>
      <Field
        label="Nature du problème"
        name="category"
        as="select"
        required
        options={CATEGORIES}
        defaultValue={state.values?.category}
        error={state.errors?.category}
      />

      <AddressField
        label="Localisation précise"
        name="location"
        required
        defaultValue={state.values?.location}
        error={state.errors?.location}
      />

      <Field
        label="Description"
        name="description"
        as="textarea"
        rows={6}
        required
        defaultValue={state.values?.description}
        error={state.errors?.description}
        hint="Décrivez le problème constaté : nature, ampleur, date d'apparition."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Nom et prénom"
          name="name"
          required
          autoComplete="name"
          defaultValue={state.values?.name}
          error={state.errors?.name}
        />
        <Field
          label="Adresse électronique"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={state.values?.email}
          error={state.errors?.email}
        />
      </div>

      <Field
        label="Téléphone"
        name="phone"
        type="tel"
        autoComplete="tel"
        hint="Facultatif — utile si les services ont besoin d'une précision."
        defaultValue={state.values?.phone}
        error={state.errors?.phone}
      />

      <Field
        label="J'accepte que ces informations soient utilisées pour traiter mon signalement."
        name="consent"
        as="checkbox"
        required
        error={state.errors?.consent}
      />

      <Button type="submit" size="lg" disabled={pending} className="rounded-none px-8">
        {pending ? "Envoi en cours…" : "Envoyer le signalement"}
      </Button>
    </form>
  );
}
