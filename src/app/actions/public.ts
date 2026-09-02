"use server";

import { z } from "zod";
import { id, mutate, read } from "@/lib/db";
import type { FormState } from "@/lib/form-state";

/** Formulaires publics : contact et signalement d'incident sur l'espace public. */

const required = (label: string) => `${label} est obligatoire.`;

/**
 * Case à cocher obligatoire. Décochée, elle n'est pas transmise du tout : on
 * la ramène à `false` avant validation, sans quoi un champ « optionnel »
 * laisserait passer un envoi sans consentement.
 */
const consent = z.literal(true, {
  message: "Vous devez accepter le traitement de vos données.",
});

/**
 * Normalise le FormData avant validation :
 * — les cases décochées, absentes du formulaire, deviennent `false` ;
 * — les champs attendus mais absents (un `select` laissé sur son intitulé)
 *   deviennent une chaîne vide, ce qui produit un message lisible plutôt
 *   qu'une erreur de type.
 */
function toInput(formData: FormData, fields: readonly string[]) {
  const raw = Object.fromEntries(formData) as Record<string, unknown>;
  for (const key of fields) raw[key] ??= "";
  raw.consent = raw.consent === "on" || raw.consent === "true";
  return raw;
}

/** Saisie à renvoyer au formulaire pour la réafficher après une erreur. */
function keptValues(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && key !== "consent") values[key] = value;
  }
  return values;
}

const contactSchema = z.object({
  name: z.string().trim().min(2, required("Le nom")).max(120),
  email: z.string().trim().email("Adresse électronique invalide."),
  service: z.string().trim().min(1, required("Le service destinataire")),
  subject: z.string().trim().min(3, required("L'objet")).max(180),
  message: z.string().trim().min(10, "Le message doit comporter au moins 10 caractères.").max(4000),
  consent,
});

const reportSchema = z.object({
  category: z.string().trim().min(1, required("La catégorie")),
  location: z.string().trim().min(3, required("Le lieu")).max(200),
  description: z
    .string()
    .trim()
    .min(10, "La description doit comporter au moins 10 caractères.")
    .max(2000),
  name: z.string().trim().min(2, required("Le nom")).max(120),
  email: z.string().trim().email("Adresse électronique invalide."),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  consent,
});

function collectErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    errors[key] ??= issue.message;
  }
  return errors;
}

export async function submitContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = contactSchema.safeParse(toInput(formData, Object.keys(contactSchema.shape)));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Certains champs doivent être corrigés.",
      errors: collectErrors(parsed.error),
      values: keptValues(formData),
    };
  }

  const { name, email, service, subject, message } = parsed.data;
  await mutate((db) => {
    db.messages.unshift({
      id: id(),
      name,
      email,
      service,
      subject,
      message,
      read: false,
      createdAt: new Date().toISOString(),
    });
  });

  return {
    status: "success",
    message:
      "Votre message a bien été transmis. Le service concerné vous répondra sous cinq jours ouvrés.",
  };
}

export async function submitReport(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = reportSchema.safeParse(toInput(formData, Object.keys(reportSchema.shape)));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Certains champs doivent être corrigés.",
      errors: collectErrors(parsed.error),
      values: keptValues(formData),
    };
  }

  const { category, location, description, name, email, phone } = parsed.data;
  const existing = await read("reports");
  const year = new Date().getFullYear();
  const reference = `SIG-${year}-${String(existing.length + 150).padStart(4, "0")}`;

  await mutate((db) => {
    db.reports.unshift({
      id: id(),
      reference,
      category,
      location,
      description,
      name,
      email,
      phone: phone || undefined,
      status: "nouveau",
      createdAt: new Date().toISOString(),
    });
  });

  return {
    status: "success",
    message: "Votre signalement a été enregistré et transmis aux services techniques.",
    reference,
  };
}
