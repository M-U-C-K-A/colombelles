import "server-only";
import { cookies } from "next/headers";
import { scrypt as _scrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { read, mutate } from "@/lib/db";
import type { UserItem } from "@/lib/types";
import { SESSION_COOKIE, signSession, verifySession, type SessionPayload } from "@/lib/session";

const scrypt = promisify(_scrypt) as (
  password: string,
  salt: string,
  keylen: number,
) => Promise<Buffer>;

const KEYLEN = 64;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = await scrypt(password, salt, KEYLEN);
  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = await scrypt(password, salt, KEYLEN);
  const expected = Buffer.from(hash, "hex");
  if (expected.length !== derived.length) return false;
  return timingSafeEqual(derived, expected);
}

export type LoginResult = { ok: true } | { ok: false; error: string };

export async function login(username: string, password: string): Promise<LoginResult> {
  const users = await read("users");
  const user = users.find((u) => u.username.toLowerCase() === username.trim().toLowerCase());

  // Comparaison à vide lorsque l'identifiant est inconnu : le temps de réponse
  // ne doit pas révéler l'existence du compte.
  const stored = user?.passwordHash ?? `${"0".repeat(32)}:${"0".repeat(KEYLEN * 2)}`;
  const valid = await verifyPassword(password, stored);

  if (!user || !valid) {
    return { ok: false, error: "Identifiant ou mot de passe incorrect." };
  }

  const token = await signSession({
    sub: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
  });

  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  await mutate((db) => {
    const target = db.users.find((u) => u.id === user.id);
    if (target) target.lastLogin = new Date().toISOString();
    db.audit.unshift({
      id: `${Date.now()}-login`,
      at: new Date().toISOString(),
      user: user.username,
      action: "Connexion",
      target: "Espace d'administration",
    });
    db.audit = db.audit.slice(0, 200);
  });

  return { ok: true };
}

export async function logout() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

/** Session courante ; lève si absente (les routes /admin sont déjà filtrées par le middleware). */
export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) throw new Error("Session requise");
  return session;
}

export async function currentUser(): Promise<UserItem | null> {
  const session = await getSession();
  if (!session) return null;
  const users = await read("users");
  return users.find((u) => u.id === session.sub) ?? null;
}
