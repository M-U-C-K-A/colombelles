import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { MarkdownHelp, ResourceForm } from "@/components/admin/resource-form";
import { JOB_FIELDS } from "@/lib/admin-fields";
import { toDateInput, toDateTimeLocal } from "@/lib/format";

export default function Page() {
  const now = new Date();
  const inOneMonth = new Date(now.getTime() + 30 * 86400000);

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Offres d'emploi", href: "/admin/emploi" }, { label: "Nouvelle" }]}
        title="Nouvelle offre d'emploi"
      />
      <AdminBody className="space-y-8">
        <MarkdownHelp />
        <ResourceForm
          kind="jobs"
          recordId={null}
          groups={JOB_FIELDS}
          cancelHref="/admin/emploi"
          submitLabel="Créer l'offre"
          values={{
            status: "brouillon",
            publishedAt: toDateTimeLocal(now.toISOString()),
            deadline: toDateInput(inOneMonth.toISOString()),
          }}
        />
      </AdminBody>
    </>
  );
}
