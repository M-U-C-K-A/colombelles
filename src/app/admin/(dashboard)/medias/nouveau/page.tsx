import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { ResourceForm } from "@/components/admin/resource-form";
import { MEDIA_FIELDS } from "@/lib/admin-fields";

export default function Page() {
  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Médiathèque", href: "/admin/medias" }, { label: "Nouveau" }]}
        title="Référencer un média"
      />
      <AdminBody>
        <ResourceForm
          kind="media"
          recordId={null}
          groups={MEDIA_FIELDS}
          cancelHref="/admin/medias"
          submitLabel="Référencer"
          values={{ credit: "Ville de Colombelles" }}
        />
      </AdminBody>
    </>
  );
}
