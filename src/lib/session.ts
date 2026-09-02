import { SignJWT, jwtVerify } from "jose";

/**
 * Jetons de session — module compatible runtime Edge : il est importé aussi
 * bien par le middleware que par les composants serveur.
 */

export const SESSION_COOKIE = "colombelles_session";

export interface SessionPayload {
  sub: string;
  username: string;
  name: string;
  role: "administrateur" | "editeur";
}

function secret(): Uint8Array {
  const value =
    process.env.AUTH_SECRET ??
    "colombelles-cle-de-developpement-a-remplacer-en-production-32c";
  return new TextEncoder().encode(value);
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret());
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    if (typeof payload.username !== "string" || typeof payload.sub !== "string") return null;
    return {
      sub: payload.sub,
      username: payload.username,
      name: typeof payload.name === "string" ? payload.name : payload.username,
      role: payload.role === "administrateur" ? "administrateur" : "editeur",
    };
  } catch {
    return null;
  }
}
