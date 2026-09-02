import { notFound } from "next/navigation";
import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { ResourceForm } from "@/components/admin/resource-form";
import { MEDIA_FIELDS } from "@/lib/admin-fields";
import { read } from "@/lib/db";

export default async function Page({ params }: PageProps<"/admin/medias/[id]">) {
  const { id } = await params;
  const item = (await read("media")).find((m) => m.id === id);
  if (!item) notFound();

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Médiathèque", href: "/admin/medias" }, { label: "Modifier" }]}
        title={item.name}
      />
      <AdminBody>
        <ResourceForm
          kind="media"
          recordId={item.id}
          groups={MEDIA_FIELDS}
          cancelHref="/admin/medias"
          values={{ ...item, credit: item.credit ?? "" }}
        />
      </AdminBody>
    </>
  );
}
