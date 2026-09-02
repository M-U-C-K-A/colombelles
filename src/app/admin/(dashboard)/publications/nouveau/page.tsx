import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { ResourceForm } from "@/components/admin/resource-form";
import { DOCUMENT_FIELDS } from "@/lib/admin-fields";
import { toDateTimeLocal } from "@/lib/format";

export default function Page() {
  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Publications", href: "/admin/publications" }, { label: "Nouvelle" }]}
        title="Nouvelle publication"
      />
      <AdminBody>
        <ResourceForm
          kind="documents"
          recordId={null}
          groups={DOCUMENT_FIELDS}
          cancelHref="/admin/publications"
          submitLabel="Créer la publication"
          values={{
            status: "publie",
            fileType: "PDF",
            publishedAt: toDateTimeLocal(new Date().toISOString()),
          }}
        />
      </AdminBody>
    </>
  );
}
