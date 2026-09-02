import { notFound } from "next/navigation";
import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { MarkdownHelp, ResourceForm } from "@/components/admin/resource-form";
import { JOB_FIELDS } from "@/lib/admin-fields";
import { toDateInput, toDateTimeLocal } from "@/lib/format";
import { read } from "@/lib/db";

export default async function Page({ params }: PageProps<"/admin/emploi/[id]">) {
  const { id } = await params;
  const item = (await read("jobs")).find((j) => j.id === id);
  if (!item) notFound();

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Offres d'emploi", href: "/admin/emploi" }, { label: "Modifier" }]}
        title={item.title}
        description={`Adresse publique : /emploi/${item.slug}`}
      />
      <AdminBody className="space-y-8">
        <MarkdownHelp />
        <ResourceForm
          kind="jobs"
          recordId={item.id}
          groups={JOB_FIELDS}
          cancelHref="/admin/emploi"
          values={{
            ...item,
            publishedAt: toDateTimeLocal(item.publishedAt),
            deadline: toDateInput(item.deadline),
          }}
        />
      </AdminBody>
    </>
  );
}
