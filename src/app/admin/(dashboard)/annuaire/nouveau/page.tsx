import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { ResourceForm } from "@/components/admin/resource-form";
import { DIRECTORY_FIELDS } from "@/lib/admin-fields";

export default function Page() {
  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Annuaire", href: "/admin/annuaire" }, { label: "Nouvelle" }]}
        title="Nouvelle fiche"
      />
      <AdminBody>
        <ResourceForm
          kind="directory"
          recordId={null}
          groups={DIRECTORY_FIELDS}
          cancelHref="/admin/annuaire"
          submitLabel="Créer la fiche"
          values={{ status: "publie", type: "association" }}
        />
      </AdminBody>
    </>
  );
}
