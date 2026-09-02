import { AdminBody, AdminHeader, EmptyState, StatusBadge } from "@/components/admin/admin-ui";
import { RowActions } from "@/components/admin/row-actions";
import { formatDate } from "@/lib/format";
import { read } from "@/lib/db";

export default async function Page() {
  const jobs = (await read("jobs")).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Offres d'emploi" }]}
        title="Offres d'emploi"
        description="Les postes ouverts au recrutement, publiés dans la rubrique Emploi."
        action={{ label: "Nouvelle offre", href: "/admin/emploi/nouveau" }}
      />
      <AdminBody>
        {jobs.length === 0 ? (
          <EmptyState
            title="Aucune offre"
            description="Publiez une première offre pour alimenter la rubrique Emploi."
            action={{ label: "Nouvelle offre", href: "/admin/emploi/nouveau" }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[52rem] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-foreground">
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Poste</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Service</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Statut du poste</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Limite</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">État</th>
                  <th className="eyebrow px-3 py-3 text-right text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((item) => (
                  <tr key={item.id} className="border-b border-border hover:bg-secondary/50">
                    <td className="max-w-xs truncate px-3 py-3.5 font-medium">{item.title}</td>
                    <td className="px-3 py-3.5 text-muted-foreground">{item.department}</td>
                    <td className="max-w-[14rem] truncate px-3 py-3.5 text-muted-foreground">
                      {item.contract}
                    </td>
                    <td className="numeral px-3 py-3.5 text-muted-foreground">
                      {formatDate(`${item.deadline}T12:00:00.000Z`)}
                    </td>
                    <td className="px-3 py-3.5">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-3 py-2">
                      <RowActions
                        kind="jobs"
                        recordId={item.id}
                        label={item.title}
                        status={item.status}
                        editHref={`/admin/emploi/${item.id}`}
                        viewHref={`/emploi/${item.slug}`}
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
