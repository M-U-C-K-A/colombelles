import { AdminBody, AdminHeader, EmptyState, StatusBadge } from "@/components/admin/admin-ui";
import { RowActions } from "@/components/admin/row-actions";
import { formatDate } from "@/lib/format";
import { read } from "@/lib/db";

export default async function Page() {
  const news = (await read("news")).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Actualités" }]}
        title="Actualités"
        description="Les articles publiés dans la rubrique Actualités du site public."
        action={{ label: "Nouvelle actualité", href: "/admin/actualites/nouveau" }}
      />
      <AdminBody>
        {news.length === 0 ? (
          <EmptyState
            title="Aucune actualité"
            description="Publiez un premier article pour alimenter la page d'accueil et la rubrique Actualités."
            action={{ label: "Nouvelle actualité", href: "/admin/actualites/nouveau" }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[52rem] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-foreground">
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Titre</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Catégorie</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Date</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Statut</th>
                  <th className="eyebrow px-3 py-3 text-right text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {news.map((item) => (
                  <tr key={item.id} className="border-b border-border hover:bg-secondary/50">
                    <td className="max-w-md px-3 py-3.5">
                      <span className="block truncate font-medium">{item.title}</span>
                      {item.featured && (
                        <span className="eyebrow mt-1 block text-rouge">En avant</span>
                      )}
                    </td>
                    <td className="px-3 py-3.5 text-muted-foreground">{item.category}</td>
                    <td className="numeral px-3 py-3.5 text-muted-foreground">
                      {formatDate(item.publishedAt)}
                    </td>
                    <td className="px-3 py-3.5">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-3 py-2">
                      <RowActions
                        kind="news"
                        recordId={item.id}
                        label={item.title}
                        status={item.status}
                        editHref={`/admin/actualites/${item.id}`}
                        viewHref={`/actualites/${item.slug}`}
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
