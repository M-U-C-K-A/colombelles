import { AdminBody, AdminHeader, EmptyState, StatusBadge } from "@/components/admin/admin-ui";
import { RowActions } from "@/components/admin/row-actions";
import { formatDate } from "@/lib/format";
import { SECTION_BY_KEY } from "@/lib/navigation";
import { read } from "@/lib/db";

export default async function Page() {
  const pages = (await read("pages")).sort(
    (a, b) => a.section.localeCompare(b.section) || a.order - b.order,
  );

  const sections = [...new Set(pages.map((p) => p.section))];

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Pages" }]}
        title="Pages"
        description="Les pages de contenu des quatre rubriques du site, ainsi que les pages institutionnelles."
        action={{ label: "Nouvelle page", href: "/admin/pages/nouveau" }}
      />
      <AdminBody className="space-y-12">
        {pages.length === 0 ? (
          <EmptyState
            title="Aucune page"
            description="Créez une première page de contenu dans l'une des rubriques du site."
            action={{ label: "Nouvelle page", href: "/admin/pages/nouveau" }}
          />
        ) : (
          sections.map((section) => {
            const items = pages.filter((p) => p.section === section);
            const meta = SECTION_BY_KEY[section];
            return (
              <section key={section}>
                <h2 className="border-t-2 border-foreground pt-4 pb-5 text-base font-medium">
                  {meta?.label ?? "Institutionnel"}
                  <span className="numeral eyebrow ml-3 text-muted-foreground">
                    {items.length} page{items.length > 1 ? "s" : ""}
                  </span>
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[52rem] border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="eyebrow px-3 py-2.5 text-left text-muted-foreground">Titre</th>
                        <th className="eyebrow px-3 py-2.5 text-left text-muted-foreground">
                          Sous-rubrique
                        </th>
                        <th className="eyebrow px-3 py-2.5 text-left text-muted-foreground">Ordre</th>
                        <th className="eyebrow px-3 py-2.5 text-left text-muted-foreground">
                          Mise à jour
                        </th>
                        <th className="eyebrow px-3 py-2.5 text-left text-muted-foreground">Statut</th>
                        <th className="eyebrow px-3 py-2.5 text-right text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id} className="border-b border-border hover:bg-secondary/50">
                          <td className="max-w-sm px-3 py-3.5">
                            <span className="block truncate font-medium">{item.title}</span>
                            <span className="eyebrow mt-1 block text-muted-foreground">
                              /{item.slug}
                            </span>
                          </td>
                          <td className="px-3 py-3.5 text-muted-foreground">
                            {item.subsection ?? "—"}
                          </td>
                          <td className="numeral px-3 py-3.5 text-muted-foreground">{item.order}</td>
                          <td className="numeral px-3 py-3.5 text-muted-foreground">
                            {formatDate(item.updatedAt)}
                          </td>
                          <td className="px-3 py-3.5">
                            <StatusBadge status={item.status} />
                          </td>
                          <td className="px-3 py-2">
                            <RowActions
                              kind="pages"
                              recordId={item.id}
                              label={item.title}
                              status={item.status}
                              editHref={`/admin/pages/${item.id}`}
                              viewHref={meta ? `${meta.href}/${item.slug}` : `/${item.slug}`}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })
        )}
      </AdminBody>
    </>
  );
}
