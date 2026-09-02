import { notFound } from "next/navigation";
import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { ResourceForm } from "@/components/admin/resource-form";
import { PLACE_FIELDS } from "@/lib/admin-fields";
import { read } from "@/lib/db";

export default async function Page({ params }: PageProps<"/admin/lieux/[id]">) {
  const { id } = await params;
  const item = (await read("places")).find((p) => p.id === id);
  if (!item) notFound();

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Lieux de la carte", href: "/admin/lieux" }, { label: "Modifier" }]}
        title={item.name}
      />
      <AdminBody>
        <ResourceForm
          kind="places"
          recordId={item.id}
          groups={PLACE_FIELDS}
          cancelHref="/admin/lieux"
          values={{
            ...item,
            description: item.description ?? "",
            phone: item.phone ?? "",
            email: item.email ?? "",
            href: item.href ?? "",
          }}
        />
      </AdminBody>
    </>
  );
}
