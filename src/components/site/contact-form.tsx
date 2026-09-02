"use client";

import { useActionState, useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { submitContact } from "@/app/actions/public";
import { initialFormState } from "@/lib/form-state";
import { Button } from "@/components/ui/button";
import { Field, FormNotice } from "@/components/site/form-parts";

export function ContactForm({ services }: { services: string[] }) {
  const [state, action, pending] = useActionState(submitContact, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      toast.success("Message envoyé", { description: state.message });
    }
    if (state.status === "error") toast.error(state.message ?? "Le formulaire comporte des erreurs.");
  }, [state]);

  if (state.status === "success") {
    return (
      <FormNotice
        icon={<CheckCircle2 className="size-5 text-rouge" aria-hidden="true" />}
        title="Message transmis"
        body={state.message}
      />
    );
  }

  return (
    <form ref={formRef} action={action} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Nom et prénom"
          name="name"
          required
          autoComplete="name"
          error={state.errors?.name}
        />
        <Field
          label="Adresse électronique"
          name="email"
          type="email"
          required
          autoComplete="email"
          error={state.errors?.email}
        />
      </div>

      <Field
        label="Service destinataire"
        name="service"
        as="select"
        required
        options={services}
        error={state.errors?.service}
      />

      <Field label="Objet" name="subject" required error={state.errors?.subject} />

      <Field
        label="Votre message"
        name="message"
        as="textarea"
        rows={7}
        required
        error={state.errors?.message}
        hint="4 000 caractères maximum."
      />

      <Field
        label="J'accepte que ces informations soient utilisées pour traiter ma demande."
        name="consent"
        as="checkbox"
        required
        error={state.errors?.consent}
        hint="Les données sont conservées 12 mois puis supprimées. Consultez la page « Données personnelles »."
      />

      <Button type="submit" size="lg" disabled={pending} className="rounded-none px-8">
        {pending ? "Envoi en cours…" : "Envoyer le message"}
      </Button>
    </form>
  );
}
