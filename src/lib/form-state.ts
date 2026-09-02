/**
 * États de formulaire partagés.
 *
 * Ces valeurs vivent hors des fichiers `"use server"` : ceux-ci ne peuvent
 * exporter que des fonctions asynchrones.
 */

export interface ActionState {
  status: "idle" | "error";
  message?: string;
  errors?: Record<string, string>;
}

export const idleState: ActionState = { status: "idle" };

export interface FormState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  reference?: string;
}

export const initialFormState: FormState = { status: "idle" };
