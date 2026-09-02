import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { MarkdownHelp, ResourceForm } from "@/components/admin/resource-form";
import { NEWS_FIELDS } from "@/lib/admin-fields";
import { toDateTimeLocal } from "@/lib/format";

export default function Page() {
  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Actualités", href: "/admin/actualites" }, { label: "Nouvelle" }]}
        title="Nouvelle actualité"
      />
      <AdminBody className="space-y-8">
        <MarkdownHelp />
        <ResourceForm
          kind="news"
          recordId={null}
          groups={NEWS_FIELDS}
          cancelHref="/admin/actualites"
          submitLabel="Créer l'actualité"
          values={{
            status: "brouillon",
            theme: "actu",
            author: "Service communication",
            publishedAt: toDateTimeLocal(new Date().toISOString()),
            featured: false,
          }}
        />
      </AdminBody>
    </>
  );
}
