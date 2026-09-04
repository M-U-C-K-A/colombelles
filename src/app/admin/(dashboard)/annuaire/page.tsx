import { AdminBody, AdminHeader, EmptyState, StatusBadge } from "@/components/admin/admin-ui";
import { Preview } from "@/components/admin/admin-hints";
import { RowActions } from "@/components/admin/row-actions";
import { read } from "@/lib/db";

const TYPE_LABELS: Record<string, string> = {
  association: "Association",
  commerce: "Commerce",
  equipement: "Équipement",
};

export default async function Page() {
  const directory = (await read("directory")).sort(
    (a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name, "fr"),
  );

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Annuaire" }]}
        title="Annuaire"
        description="Associations, commerces et équipements référencés dans l'annuaire public."
        action={{ label: "Nouvelle fiche", href: "/admin/annuaire/nouveau" }}
      />
      <AdminBody>
        {directory.length === 0 ? (
          <EmptyState
            title="Annuaire vide"
            description="Référencez une première structure pour alimenter l'annuaire."
            action={{ label: "Nouvelle fiche", href: "/admin/annuaire/nouveau" }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[52rem] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-foreground">
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Nom</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Type</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Catégorie</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Adresse</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Statut</th>
                  <th className="eyebrow px-3 py-3 text-right text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {directory.map((item) => (
                  <tr key={item.id} className="border-b border-border hover:bg-secondary/50">
                    <td className="max-w-xs px-3 py-3.5">
                      <Preview
                        href={`/admin/annuaire/${item.id}`}
                        title={item.name}
                        eyebrow={TYPE_LABELS[item.type] ?? item.type}
                        excerpt={item.description}
                        facts={[
                          { label: "Catégorie", value: item.category },
                          { label: "Adresse", value: item.address },
                          { label: "Téléphone", value: item.phone },
                          { label: "Courriel", value: item.email },
                          { label: "Site", value: item.website },
                        ]}
                      />
                    </td>
                    <td className="px-3 py-3.5 text-muted-foreground">
                      {TYPE_LABELS[item.type] ?? item.type}
                    </td>
                    <td className="px-3 py-3.5 text-muted-foreground">{item.category}</td>
                    <td className="max-w-[16rem] truncate px-3 py-3.5 text-muted-foreground">
                      {item.address}
                    </td>
                    <td className="px-3 py-3.5">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-3 py-2">
                      <RowActions
                        kind="directory"
                        recordId={item.id}
                        label={item.name}
                        status={item.status}
                        editHref={`/admin/annuaire/${item.id}`}
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
