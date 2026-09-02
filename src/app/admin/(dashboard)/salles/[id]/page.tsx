import { notFound } from "next/navigation";
import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { ResourceForm } from "@/components/admin/resource-form";
import { VENUE_FIELDS } from "@/lib/admin-fields";
import { read } from "@/lib/db";

export default async function Page({ params }: PageProps<"/admin/salles/[id]">) {
  const { id } = await params;
  const item = (await read("venues")).find((v) => v.id === id);
  if (!item) notFound();

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Salles", href: "/admin/salles" }, { label: "Modifier" }]}
        title={item.name}
      />
      <AdminBody>
        <ResourceForm
          kind="venues"
          recordId={item.id}
          groups={VENUE_FIELDS}
          cancelHref="/admin/salles"
          values={{
            ...item,
            images: item.images.join("\n"),
            extra: item.extra ?? "",
          }}
        />
      </AdminBody>
    </>
  );
}
