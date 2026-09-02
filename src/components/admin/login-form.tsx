"use client";

import { useActionState } from "react";
import { AlertCircle, LogIn } from "lucide-react";
import { loginAction, type LoginState } from "@/app/admin/actions/auth";
import { Button } from "@/components/ui/button";

const initial: LoginState = {};

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="suite" value={next} />

      <div>
        <label htmlFor="username" className="eyebrow mb-2.5 block text-muted-foreground">
          Identifiant
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          autoFocus
          aria-invalid={state.error ? true : undefined}
          className="w-full border border-input bg-background px-3.5 py-3 text-sm focus:border-foreground focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="password" className="eyebrow mb-2.5 block text-muted-foreground">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          aria-invalid={state.error ? true : undefined}
          className="w-full border border-input bg-background px-3.5 py-3 text-sm focus:border-foreground focus:outline-none"
        />
      </div>

      {state.error && (
        <p role="alert" className="flex items-center gap-2 border-l-2 border-rouge py-2 pl-3 text-sm text-rouge">
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          {state.error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full rounded-none">
        <LogIn className="size-4" aria-hidden="true" />
        {pending ? "Connexion…" : "Se connecter"}
      </Button>
    </form>
  );
}
