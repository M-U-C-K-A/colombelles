import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { ResourceForm } from "@/components/admin/resource-form";
import { VENUE_FIELDS } from "@/lib/admin-fields";

export default function Page() {
  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Salles", href: "/admin/salles" }, { label: "Nouvelle" }]}
        title="Nouvelle salle"
      />
      <AdminBody>
        <ResourceForm
          kind="venues"
          recordId={null}
          groups={VENUE_FIELDS}
          cancelHref="/admin/salles"
          submitLabel="Créer la salle"
          values={{ status: "publie", theme: "culture", order: 10 }}
        />
      </AdminBody>
    </>
  );
}
