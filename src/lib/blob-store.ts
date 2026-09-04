import "server-only";
import { get, put } from "@vercel/blob";

/**
 * Magasin Vercel Blob — la seule persistance qui tienne sur un hébergement
 * sans état.
 *
 * Le contenu du site tient dans un unique document JSON. Il est déposé dans un
 * magasin **privé** : la base contient des empreintes de mots de passe, les
 * messages envoyés par les habitants et les signalements. Un magasin public
 * servirait ce fichier à quiconque connaît son adresse, aussi l'application
 * refuse-t-elle de s'en servir.
 */

const PATHNAME = "colombelles.json";

/** Vrai si le SDK dispose de quoi s'authentifier auprès du magasin. */
export function blobConfigured(): boolean {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN),
  );
}

/**
 * Relit le document. `useCache: false` court-circuite le cache de diffusion :
 * sans cela une modification mettrait jusqu'à une minute à devenir visible,
 * et l'agent qui vient d'enregistrer croirait son travail perdu.
 */
export async function readBlob(): Promise<string | null> {
  const result = await get(PATHNAME, { access: "private", useCache: false });
  if (!result || result.statusCode !== 200) return null;
  return new Response(result.stream).text();
}

export async function writeBlob(payload: string): Promise<void> {
  await put(PATHNAME, payload, {
    access: "private",
    allowOverwrite: true,
    addRandomSuffix: false,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
}
