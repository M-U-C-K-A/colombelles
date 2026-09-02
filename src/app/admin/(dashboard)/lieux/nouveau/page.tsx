import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { ResourceForm } from "@/components/admin/resource-form";
import { PLACE_FIELDS } from "@/lib/admin-fields";

export default function Page() {
  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Lieux de la carte", href: "/admin/lieux" }, { label: "Nouveau" }]}
        title="Nouveau lieu"
      />
      <AdminBody>
        <ResourceForm
          kind="places"
          recordId={null}
          groups={PLACE_FIELDS}
          cancelHref="/admin/lieux"
          submitLabel="Ajouter le lieu"
          values={{ status: "publie", theme: "mairie", lat: 49.2045, lon: -0.2969 }}
        />
      </AdminBody>
    </>
  );
}
