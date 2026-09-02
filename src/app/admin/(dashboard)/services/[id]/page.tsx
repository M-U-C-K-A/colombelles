import { notFound } from "next/navigation";
import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { ResourceForm } from "@/components/admin/resource-form";
import { SERVICE_FIELDS } from "@/lib/admin-fields";
import { read } from "@/lib/db";

export default async function Page({ params }: PageProps<"/admin/services/[id]">) {
  const { id } = await params;
  const item = (await read("services")).find((s) => s.id === id);
  if (!item) notFound();

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Services", href: "/admin/services" }, { label: "Modifier" }]}
        title={item.name}
      />
      <AdminBody>
        <ResourceForm
          kind="services"
          recordId={item.id}
          groups={SERVICE_FIELDS}
          cancelHref="/admin/services"
          values={{ ...item }}
        />
      </AdminBody>
    </>
  );
}
