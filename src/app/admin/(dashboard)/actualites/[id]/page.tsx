import { notFound } from "next/navigation";
import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { MarkdownHelp, ResourceForm } from "@/components/admin/resource-form";
import { NEWS_FIELDS } from "@/lib/admin-fields";
import { toDateTimeLocal } from "@/lib/format";
import { read } from "@/lib/db";

export default async function Page({ params }: PageProps<"/admin/actualites/[id]">) {
  const { id } = await params;
  const item = (await read("news")).find((n) => n.id === id);
  if (!item) notFound();

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Actualités", href: "/admin/actualites" }, { label: "Modifier" }]}
        title={item.title}
        description={`Adresse publique : /actualites/${item.slug}`}
      />
      <AdminBody className="space-y-8">
        <MarkdownHelp />
        <ResourceForm
          kind="news"
          recordId={item.id}
          groups={NEWS_FIELDS}
          cancelHref="/admin/actualites"
          values={{
            ...item,
            tags: item.tags.join(", "),
            publishedAt: toDateTimeLocal(item.publishedAt),
          }}
        />
      </AdminBody>
    </>
  );
}
