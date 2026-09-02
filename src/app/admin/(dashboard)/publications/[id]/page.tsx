import { notFound } from "next/navigation";
import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { ResourceForm } from "@/components/admin/resource-form";
import { DOCUMENT_FIELDS } from "@/lib/admin-fields";
import { toDateTimeLocal } from "@/lib/format";
import { read } from "@/lib/db";

export default async function Page({ params }: PageProps<"/admin/publications/[id]">) {
  const { id } = await params;
  const item = (await read("documents")).find((d) => d.id === id);
  if (!item) notFound();

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Publications", href: "/admin/publications" }, { label: "Modifier" }]}
        title={item.title}
      />
      <AdminBody>
        <ResourceForm
          kind="documents"
          recordId={item.id}
          groups={DOCUMENT_FIELDS}
          cancelHref="/admin/publications"
          values={{ ...item, publishedAt: toDateTimeLocal(item.publishedAt) }}
        />
      </AdminBody>
    </>
  );
}
