import { AdminBody, AdminHeader, EmptyState, StatusBadge } from "@/components/admin/admin-ui";
import { RowActions } from "@/components/admin/row-actions";
import { formatDate } from "@/lib/format";
import { read } from "@/lib/db";

export default async function Page() {
  const documents = (await read("documents")).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Publications" }]}
        title="Publications"
        description="Journal municipal, procès-verbaux, budget, guides et documents réglementaires mis en téléchargement."
        action={{ label: "Nouvelle publication", href: "/admin/publications/nouveau" }}
      />
      <AdminBody>
        {documents.length === 0 ? (
          <EmptyState
            title="Aucune publication"
            description="Référencez un premier document à mettre en téléchargement."
            action={{ label: "Nouvelle publication", href: "/admin/publications/nouveau" }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[52rem] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-foreground">
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Intitulé</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Catégorie</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Fichier</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Publié le</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Statut</th>
                  <th className="eyebrow px-3 py-3 text-right text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((item) => (
                  <tr key={item.id} className="border-b border-border hover:bg-secondary/50">
                    <td className="max-w-sm px-3 py-3.5">
                      <span className="block truncate font-medium">{item.title}</span>
                      <span className="eyebrow mt-1 block truncate text-muted-foreground">
                        {item.url}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-muted-foreground">{item.category}</td>
                    <td className="numeral px-3 py-3.5 text-muted-foreground">
                      {item.fileType} · {item.size}
                    </td>
                    <td className="numeral px-3 py-3.5 text-muted-foreground">
                      {formatDate(item.publishedAt)}
                    </td>
                    <td className="px-3 py-3.5">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-3 py-2">
                      <RowActions
                        kind="documents"
                        recordId={item.id}
                        label={item.title}
                        status={item.status}
                        editHref={`/admin/publications/${item.id}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminBody>
    </>
  );
}
