"use client";

import Link from "next/link";
import { useActionState, useId } from "react";
import { AlertCircle, Save } from "lucide-react";
import { saveUser } from "@/app/admin/actions/resources";
import { idleState, type ActionState } from "@/lib/form-state";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserItem } from "@/lib/types";

const INPUT =
  "w-full border border-input bg-background px-3.5 py-2.5 text-sm transition-colors focus:border-foreground focus:outline-none";

export function UserForm({ user }: { user?: UserItem }) {
  const bound = saveUser.bind(null, user?.id ?? null);
  const [state, action, pending] = useActionState<ActionState, FormData>(bound, idleState);

  const usernameId = useId();
  const nameId = useId();
  const emailId = useId();
  const roleId = useId();
  const passwordId = useId();

  return (
    <form action={action} className="max-w-2xl space-y-6" noValidate>
      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="flex items-center gap-2 border-l-2 border-rouge bg-rouge/5 py-3 pl-4 text-sm text-rouge"
        >
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          {state.message}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={usernameId} className="eyebrow mb-2.5 block text-muted-foreground">
            Identifiant de connexion <span className="text-rouge">*</span>
          </label>
          <input
            id={usernameId}
            name="username"
            defaultValue={user?.username}
            autoComplete="off"
            className={cn(INPUT, state.errors?.username && "border-rouge")}
          />
          {state.errors?.username && <FieldError>{state.errors.username}</FieldError>}
        </div>

        <div>
          <label htmlFor={nameId} className="eyebrow mb-2.5 block text-muted-foreground">
            Nom affiché <span className="text-rouge">*</span>
          </label>
          <input
            id={nameId}
            name="name"
            defaultValue={user?.name}
            className={cn(INPUT, state.errors?.name && "border-rouge")}
          />
          {state.errors?.name && <FieldError>{state.errors.name}</FieldError>}
        </div>

        <div>
          <label htmlFor={emailId} className="eyebrow mb-2.5 block text-muted-foreground">
            Courriel <span className="text-rouge">*</span>
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            defaultValue={user?.email}
            className={cn(INPUT, state.errors?.email && "border-rouge")}
          />
          {state.errors?.email && <FieldError>{state.errors.email}</FieldError>}
        </div>

        <div>
          <label htmlFor={roleId} className="eyebrow mb-2.5 block text-muted-foreground">
            Rôle <span className="text-rouge">*</span>
          </label>
          <select id={roleId} name="role" defaultValue={user?.role ?? "editeur"} className={INPUT}>
            <option value="editeur">Éditeur — contenus uniquement</option>
            <option value="administrateur">Administrateur — accès complet</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={passwordId} className="eyebrow mb-2.5 block text-muted-foreground">
            Mot de passe {!user && <span className="text-rouge">*</span>}
          </label>
          <input
            id={passwordId}
            name="password"
            type="password"
            autoComplete="new-password"
            className={cn(INPUT, state.errors?.password && "border-rouge")}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            {user
              ? "Laisser vide pour conserver le mot de passe actuel."
              : "Au moins 10 caractères. À transmettre à l'agent par un canal sûr."}
          </p>
          {state.errors?.password && <FieldError>{state.errors.password}</FieldError>}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
        <Button type="submit" size="lg" disabled={pending} className="rounded-none">
          <Save className="size-4" aria-hidden="true" />
          {pending ? "Enregistrement…" : user ? "Enregistrer" : "Créer le compte"}
        </Button>
        <Link
          href="/admin/utilisateurs"
          className="border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:border-foreground"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-rouge">
      <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}
