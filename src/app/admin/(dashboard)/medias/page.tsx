import Link from "next/link";
import { AdminBody, AdminHeader, EmptyState } from "@/components/admin/admin-ui";
import { MediaPreview } from "@/components/admin/admin-hints";
import { RowActions } from "@/components/admin/row-actions";
import { formatDate } from "@/lib/format";
import { getDb } from "@/lib/db";

export default async function Page() {
  const db = await getDb();
  const media = [...db.media].sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));

  // Ce qui se sert d'un fichier : la première chose à savoir avant de le
  // remplacer ou de le supprimer.
  const usage = (url: string): string[] => [
    ...db.pages.filter((p) => p.image?.url === url).map((p) => p.title),
    ...db.news.filter((n) => n.image === url).map((n) => n.title),
    ...db.events.filter((e) => e.image === url).map((e) => e.title),
    ...db.venues.filter((v) => v.images.includes(url)).map((v) => v.name),
  ];

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Médiathèque" }]}
        title="Médiathèque"
        description="Images référencées pour les contenus du site. Déposez les fichiers dans public/media, puis référencez-les ici avec leur texte alternatif. Survolez une fiche pour voir l'image, son poids et les contenus qui s'en servent."
        action={{ label: "Référencer un média", href: "/admin/medias/nouveau" }}
      />
      <AdminBody>
        {media.length === 0 ? (
          <EmptyState
            title="Aucun média"
            description="Référencez une première image pour l'utiliser dans les contenus."
            action={{ label: "Référencer un média", href: "/admin/medias/nouveau" }}
          />
        ) : (
          <ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {media.map((item) => {
              const usedIn = usage(item.url);
              return (
                <li key={item.id} className="relative bg-background">
                  <div className="absolute top-4 right-4 z-10">
                    <RowActions
                      kind="media"
                      recordId={item.id}
                      label={item.name}
                      editHref={`/admin/medias/${item.id}`}
                    />
                  </div>
                  <MediaPreview
                    url={item.url}
                    name={item.name}
                    alt={item.alt}
                    credit={item.credit}
                    usedIn={usedIn}
                  >
                    <div className="flex h-full flex-col p-5 transition-colors hover:bg-secondary/50">
                      <div className="pr-24">
                        <Link
                          href={`/admin/medias/${item.id}`}
                          className="block truncate font-medium underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current focus-visible:decoration-current"
                        >
                          {item.name}
                        </Link>
                        <p className="eyebrow mt-1.5 truncate text-muted-foreground">{item.url}</p>
                      </div>
                      <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">{item.alt}</p>
                      <p className="eyebrow mt-auto pt-5 text-muted-foreground">
                        {usedIn.length === 0
                          ? "Inutilisée"
                          : `${usedIn.length} contenu${usedIn.length > 1 ? "s" : ""}`}
                        {" · "}
                        {item.credit ? `${item.credit} · ` : ""}
                        {formatDate(item.uploadedAt)}
                      </p>
                    </div>
                  </MediaPreview>
                </li>
              );
            })}
          </ul>
        )}
      </AdminBody>
    </>
  );
}
