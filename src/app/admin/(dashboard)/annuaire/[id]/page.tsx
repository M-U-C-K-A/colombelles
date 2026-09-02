import { notFound } from "next/navigation";
import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { ResourceForm } from "@/components/admin/resource-form";
import { DIRECTORY_FIELDS } from "@/lib/admin-fields";
import { read } from "@/lib/db";

export default async function Page({ params }: PageProps<"/admin/annuaire/[id]">) {
  const { id } = await params;
  const item = (await read("directory")).find((d) => d.id === id);
  if (!item) notFound();

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Annuaire", href: "/admin/annuaire" }, { label: "Modifier" }]}
        title={item.name}
      />
      <AdminBody>
        <ResourceForm
          kind="directory"
          recordId={item.id}
          groups={DIRECTORY_FIELDS}
          cancelHref="/admin/annuaire"
          values={{
            ...item,
            phone: item.phone ?? "",
            email: item.email ?? "",
            website: item.website ?? "",
          }}
        />
      </AdminBody>
    </>
  );
}
