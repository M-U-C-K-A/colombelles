import { AdminBody, AdminHeader, EmptyState, StatusBadge } from "@/components/admin/admin-ui";
import { RowActions } from "@/components/admin/row-actions";
import { read } from "@/lib/db";

export default async function Page() {
  const places = (await read("places")).sort(
    (a, b) => a.category.localeCompare(b.category, "fr") || a.name.localeCompare(b.name, "fr"),
  );

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Lieux de la carte" }]}
        title="Lieux de la carte"
        description="Les points affichés sur le plan de la ville. Les catégories alimentent la légende et servent de filtres."
        action={{ label: "Nouveau lieu", href: "/admin/lieux/nouveau" }}
      />
      <AdminBody>
        {places.length === 0 ? (
          <EmptyState
            title="Aucun lieu"
            description="Ajoutez un premier point pour alimenter la carte interactive."
            action={{ label: "Nouveau lieu", href: "/admin/lieux/nouveau" }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[52rem] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-foreground">
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Lieu</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Catégorie</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Adresse</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Coordonnées</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Statut</th>
                  <th className="eyebrow px-3 py-3 text-right text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {places.map((item) => (
                  <tr key={item.id} className="border-b border-border hover:bg-secondary/50">
                    <td className="px-3 py-3.5 font-medium">{item.name}</td>
                    <td className="px-3 py-3.5 text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <span
                          className="size-2.5 shrink-0"
                          style={{ backgroundColor: `var(--t-${item.theme})` }}
                          aria-hidden="true"
                        />
                        {item.category}
                      </span>
                    </td>
                    <td className="max-w-[16rem] truncate px-3 py-3.5 text-muted-foreground">
                      {item.address}
                    </td>
                    <td className="numeral px-3 py-3.5 text-xs text-muted-foreground">
                      {item.lat.toFixed(5)} · {item.lon.toFixed(5)}
                    </td>
                    <td className="px-3 py-3.5">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-3 py-2">
                      <RowActions
                        kind="places"
                        recordId={item.id}
                        label={item.name}
                        status={item.status}
                        editHref={`/admin/lieux/${item.id}`}
                        viewHref="/plan"
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
