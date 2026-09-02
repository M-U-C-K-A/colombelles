import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { ResourceForm } from "@/components/admin/resource-form";
import { ELU_FIELDS } from "@/lib/admin-fields";

export default function Page() {
  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Élus", href: "/admin/elus" }, { label: "Nouveau" }]}
        title="Nouvel élu"
      />
      <AdminBody>
        <ResourceForm
          kind="elus"
          recordId={null}
          groups={ELU_FIELDS}
          cancelHref="/admin/elus"
          submitLabel="Ajouter l'élu"
          values={{ group: "Majorité municipale", delegation: "—", order: 30 }}
        />
      </AdminBody>
    </>
  );
}
