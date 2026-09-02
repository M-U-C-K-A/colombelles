import { AdminBody, AdminHeader, EmptyState } from "@/components/admin/admin-ui";
import { RowActions } from "@/components/admin/row-actions";
import { formatDate } from "@/lib/format";
import { read } from "@/lib/db";

export default async function Page() {
  const media = (await read("media")).sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Médiathèque" }]}
        title="Médiathèque"
        description="Images référencées pour les contenus du site. Déposez les fichiers dans public/media, puis référencez-les ici avec leur texte alternatif."
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
            {media.map((item) => (
              <li key={item.id} className="flex flex-col bg-background p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{item.name}</p>
                    <p className="eyebrow mt-1.5 truncate text-muted-foreground">{item.url}</p>
                  </div>
                  <RowActions
                    kind="media"
                    recordId={item.id}
                    label={item.name}
                    editHref={`/admin/medias/${item.id}`}
                  />
                </div>
                <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">{item.alt}</p>
                <p className="eyebrow mt-auto pt-5 text-muted-foreground">
                  {item.credit ? `${item.credit} · ` : ""}
                  {formatDate(item.uploadedAt)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </AdminBody>
    </>
  );
}
