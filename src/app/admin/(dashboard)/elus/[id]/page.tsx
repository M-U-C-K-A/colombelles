import { notFound } from "next/navigation";
import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { ResourceForm } from "@/components/admin/resource-form";
import { ELU_FIELDS } from "@/lib/admin-fields";
import { read } from "@/lib/db";

export default async function Page({ params }: PageProps<"/admin/elus/[id]">) {
  const { id } = await params;
  const item = (await read("elus")).find((e) => e.id === id);
  if (!item) notFound();

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Élus", href: "/admin/elus" }, { label: "Modifier" }]}
        title={item.name}
      />
      <AdminBody>
        <ResourceForm
          kind="elus"
          recordId={item.id}
          groups={ELU_FIELDS}
          cancelHref="/admin/elus"
          values={{ ...item, email: item.email ?? "", permanence: item.permanence ?? "" }}
        />
      </AdminBody>
    </>
  );
}
