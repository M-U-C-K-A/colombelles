import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { ResourceForm } from "@/components/admin/resource-form";
import { SERVICE_FIELDS } from "@/lib/admin-fields";

export default function Page() {
  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Services", href: "/admin/services" }, { label: "Nouveau" }]}
        title="Nouveau service"
      />
      <AdminBody>
        <ResourceForm
          kind="services"
          recordId={null}
          groups={SERVICE_FIELDS}
          cancelHref="/admin/services"
          submitLabel="Créer le service"
          values={{
            order: 20,
            hours: "Du lundi au vendredi, 8h30-12h30 / 13h30-17h",
            address: "Hôtel de ville",
          }}
        />
      </AdminBody>
    </>
  );
}
