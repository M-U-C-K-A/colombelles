import { AdminBody, AdminHeader, EmptyState } from "@/components/admin/admin-ui";
import { Preview } from "@/components/admin/admin-hints";
import { RowActions } from "@/components/admin/row-actions";
import { read } from "@/lib/db";

export default async function Page() {
  const services = (await read("services")).sort((a, b) => a.order - b.order);

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Services" }]}
        title="Services de la ville"
        description="Coordonnées et horaires publiés dans la rubrique Votre mairie et proposés dans le formulaire de contact."
        action={{ label: "Nouveau service", href: "/admin/services/nouveau" }}
      />
      <AdminBody>
        {services.length === 0 ? (
          <EmptyState
            title="Aucun service"
            description="Renseignez les services municipaux et leurs coordonnées."
            action={{ label: "Nouveau service", href: "/admin/services/nouveau" }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[52rem] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-foreground">
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Ordre</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Service</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Téléphone</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Courriel</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Localisation</th>
                  <th className="eyebrow px-3 py-3 text-right text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((item) => (
                  <tr key={item.id} className="border-b border-border hover:bg-secondary/50">
                    <td className="numeral px-3 py-3.5 text-muted-foreground">{item.order}</td>
                    <td className="max-w-xs px-3 py-3.5">
                      <Preview
                        href={`/admin/services/${item.id}`}
                        title={item.name}
                        excerpt={item.description}
                        facts={[
                          { label: "Téléphone", value: item.phone },
                          { label: "Courriel", value: item.email },
                          { label: "Horaires", value: item.hours },
                          { label: "Adresse", value: item.address },
                        ]}
                        footer="Proposé comme destinataire dans le formulaire de contact"
                      />
                    </td>
                    <td className="numeral px-3 py-3.5 text-muted-foreground">{item.phone}</td>
                    <td className="max-w-[14rem] truncate px-3 py-3.5 text-muted-foreground">
                      {item.email}
                    </td>
                    <td className="max-w-[14rem] truncate px-3 py-3.5 text-muted-foreground">
                      {item.address}
                    </td>
                    <td className="px-3 py-2">
                      <RowActions
                        kind="services"
                        recordId={item.id}
                        label={item.name}
                        editHref={`/admin/services/${item.id}`}
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
