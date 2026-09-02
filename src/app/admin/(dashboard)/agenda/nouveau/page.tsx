import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { MarkdownHelp, ResourceForm } from "@/components/admin/resource-form";
import { EVENT_FIELDS } from "@/lib/admin-fields";

export default function Page() {
  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Agenda", href: "/admin/agenda" }, { label: "Nouveau" }]}
        title="Nouvel événement"
      />
      <AdminBody className="space-y-8">
        <MarkdownHelp />
        <ResourceForm
          kind="events"
          recordId={null}
          groups={EVENT_FIELDS}
          cancelHref="/admin/agenda"
          submitLabel="Créer l'événement"
          values={{ status: "brouillon", theme: "culture", price: "Entrée libre", featured: false }}
        />
      </AdminBody>
    </>
  );
}
