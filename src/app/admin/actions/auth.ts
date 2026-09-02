"use server";

import { redirect } from "next/navigation";
import { login, logout } from "@/lib/auth";

export interface LoginState {
  error?: string;
}

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("suite") ?? "/admin");

  if (!username || !password) {
    return { error: "Renseignez votre identifiant et votre mot de passe." };
  }

  const result = await login(username, password);
  if (!result.ok) return { error: result.error };

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}
