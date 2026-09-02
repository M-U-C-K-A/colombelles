import { SignJWT, jwtVerify } from "jose";

/**
 * Jetons de session — module compatible runtime Edge : il est importé aussi
 * bien par le proxy que par les composants serveur.
 */

export const SESSION_COOKIE = "colombelles_session";

export interface SessionPayload {
  sub: string;
  username: string;
  name: string;
  role: "administrateur" | "editeur";
}

/** Clé de développement, publique par nature : jamais utilisée en production. */
const DEV_KEY = "colombelles-cle-de-developpement-jamais-utilisee-en-production";

export type KeySource = "configuree" | "deploiement" | "developpement" | "absente";

/**
 * Provenance de la clé de signature.
 *
 * Une clé de repli inscrite dans le dépôt et appliquée en production
 * reviendrait à publier le mot de passe de l'administration : n'importe qui
 * pourrait forger un cookie de session. En production, on n'utilise donc
 * jamais `DEV_KEY` — à défaut d'`AUTH_SECRET`, on dérive une clé propre au
 * déploiement, stable entre les instances (proxy et serveur doivent obtenir
 * la même) mais différente à chaque livraison. Si rien de stable n'est
 * disponible, les sessions sont refusées plutôt que devinables.
 */
export function keySource(): KeySource {
  if (process.env.AUTH_SECRET) return "configuree";
  if (process.env.NODE_ENV !== "production") return "developpement";
  return deploymentId() ? "deploiement" : "absente";
}

function deploymentId(): string | undefined {
  return (
    process.env.VERCEL_DEPLOYMENT_ID ??
    process.env.VERCEL_GIT_COMMIT_SHA ??
    process.env.RAILWAY_DEPLOYMENT_ID ??
    process.env.RENDER_GIT_COMMIT ??
    process.env.SOURCE_VERSION
  );
}

function secret(): Uint8Array | null {
  switch (keySource()) {
    case "configuree":
      return new TextEncoder().encode(process.env.AUTH_SECRET);
    case "deploiement":
      return new TextEncoder().encode(`colombelles:${deploymentId()}`);
    case "developpement":
      return new TextEncoder().encode(DEV_KEY);
    case "absente":
      return null;
  }
}

export class MissingAuthSecretError extends Error {
  constructor() {
    super(
      "AUTH_SECRET n'est pas défini et aucune identité de déploiement stable n'a été trouvée : " +
        "l'espace d'administration est désactivé. Définissez AUTH_SECRET dans les variables " +
        "d'environnement (openssl rand -base64 48).",
    );
    this.name = "MissingAuthSecretError";
  }
}

export async function signSession(payload: SessionPayload): Promise<string> {
  const key = secret();
  if (!key) throw new MissingAuthSecretError();

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(key);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  const key = secret();
  if (!key) return null;

  try {
    const { payload } = await jwtVerify(token, key);
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
