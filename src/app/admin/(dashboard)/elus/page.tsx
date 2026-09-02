import { AdminBody, AdminHeader, EmptyState } from "@/components/admin/admin-ui";
import { RowActions } from "@/components/admin/row-actions";
import { read } from "@/lib/db";

export default async function Page() {
  const elus = (await read("elus")).sort((a, b) => a.order - b.order);

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Élus" }]}
        title="Élus"
        description="Composition du conseil municipal, délégations et rang protocolaire."
        action={{ label: "Nouvel élu", href: "/admin/elus/nouveau" }}
      />
      <AdminBody>
        {elus.length === 0 ? (
          <EmptyState
            title="Aucun élu"
            description="Renseignez la composition du conseil municipal."
            action={{ label: "Nouvel élu", href: "/admin/elus/nouveau" }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[50rem] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-foreground">
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Rang</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Nom</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Fonction</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Délégations</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Groupe</th>
                  <th className="eyebrow px-3 py-3 text-right text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {elus.map((item) => (
                  <tr key={item.id} className="border-b border-border hover:bg-secondary/50">
                    <td className="numeral px-3 py-3.5 text-muted-foreground">{item.order}</td>
                    <td className="px-3 py-3.5 font-medium">{item.name}</td>
                    <td className="px-3 py-3.5 text-muted-foreground">{item.role}</td>
                    <td className="max-w-sm truncate px-3 py-3.5 text-muted-foreground">
                      {item.delegation}
                    </td>
                    <td className="px-3 py-3.5 text-muted-foreground">{item.group}</td>
                    <td className="px-3 py-2">
                      <RowActions
                        kind="elus"
                        recordId={item.id}
                        label={item.name}
                        editHref={`/admin/elus/${item.id}`}
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
