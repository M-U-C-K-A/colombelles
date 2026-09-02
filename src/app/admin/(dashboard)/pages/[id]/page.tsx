import { notFound } from "next/navigation";
import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { MarkdownHelp, ResourceForm } from "@/components/admin/resource-form";
import { PAGE_FIELDS } from "@/lib/admin-fields";
import { SECTION_BY_KEY } from "@/lib/navigation";
import { read } from "@/lib/db";

export default async function Page({ params }: PageProps<"/admin/pages/[id]">) {
  const { id } = await params;
  const item = (await read("pages")).find((p) => p.id === id);
  if (!item) notFound();

  const meta = SECTION_BY_KEY[item.section];

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Pages", href: "/admin/pages" }, { label: "Modifier" }]}
        title={item.title}
        description={
          meta ? `Adresse publique : ${meta.href}/${item.slug}` : `Adresse publique : /${item.slug}`
        }
      />
      <AdminBody className="space-y-8">
        <MarkdownHelp />
        <ResourceForm
          kind="pages"
          recordId={item.id}
          groups={PAGE_FIELDS}
          cancelHref="/admin/pages"
          values={{ ...item, subsection: item.subsection ?? "" }}
        />
      </AdminBody>
    </>
  );
}
