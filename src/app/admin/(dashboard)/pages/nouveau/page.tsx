import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { MarkdownHelp, ResourceForm } from "@/components/admin/resource-form";
import { PAGE_FIELDS } from "@/lib/admin-fields";

export default function Page() {
  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Pages", href: "/admin/pages" }, { label: "Nouvelle" }]}
        title="Nouvelle page"
      />
      <AdminBody className="space-y-8">
        <MarkdownHelp />
        <ResourceForm
          kind="pages"
          recordId={null}
          groups={PAGE_FIELDS}
          cancelHref="/admin/pages"
          submitLabel="Créer la page"
          values={{ status: "brouillon", section: "votre-mairie", order: 50 }}
        />
      </AdminBody>
    </>
  );
}
