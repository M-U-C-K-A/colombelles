import { AdminBody, AdminHeader, EmptyState, StatusBadge } from "@/components/admin/admin-ui";
import { Preview } from "@/components/admin/admin-hints";
import { RowActions } from "@/components/admin/row-actions";
import { read } from "@/lib/db";

export default async function Page() {
  const venues = (await read("venues")).sort((a, b) => a.order - b.order);

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Salles" }]}
        title="Salles à louer"
        description="Les salles municipales proposées à la location, avec leur aperçu au survol sur la page Location de salles."
        action={{ label: "Nouvelle salle", href: "/admin/salles/nouveau" }}
      />
      <AdminBody>
        {venues.length === 0 ? (
          <EmptyState
            title="Aucune salle"
            description="Renseignez une première salle pour alimenter la page de location."
            action={{ label: "Nouvelle salle", href: "/admin/salles/nouveau" }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[52rem] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-foreground">
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Salle</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Capacité</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Adresse</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Photos</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Statut</th>
                  <th className="eyebrow px-3 py-3 text-right text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {venues.map((item) => (
                  <tr key={item.id} className="border-b border-border hover:bg-secondary/50">
                    <td className="px-3 py-3.5">
                      <span className="flex items-center gap-2 font-medium">
                        <span
                          className="size-2.5 shrink-0"
                          style={{ backgroundColor: `var(--t-${item.theme})` }}
                          aria-hidden="true"
                        />
                        <Preview
                          href={`/admin/salles/${item.id}`}
                          title={item.name}
                          theme={item.theme}
                          excerpt={item.description}
                          image={
                            item.images[0]
                              ? { url: item.images[0], alt: item.name }
                              : undefined
                          }
                          facts={[
                            { label: "Capacité", value: item.capacity },
                            { label: "Adresse", value: item.address },
                            { label: "Équipement", value: item.equipment },
                            { label: "Colombellois", value: item.rateResident },
                            { label: "Hors commune", value: item.rateNonResident },
                          ]}
                          footer={`${item.images.length} photo${item.images.length > 1 ? "s" : ""} dans l'aperçu du site public`}
                        />
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-muted-foreground">{item.capacity}</td>
                    <td className="max-w-[16rem] truncate px-3 py-3.5 text-muted-foreground">
                      {item.address}
                    </td>
                    <td className="numeral px-3 py-3.5 text-muted-foreground">
                      {item.images.length}
                    </td>
                    <td className="px-3 py-3.5">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-3 py-2">
                      <RowActions
                        kind="venues"
                        recordId={item.id}
                        label={item.name}
                        status={item.status}
                        editHref={`/admin/salles/${item.id}`}
                        viewHref="/demarches/location-de-salles"
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
