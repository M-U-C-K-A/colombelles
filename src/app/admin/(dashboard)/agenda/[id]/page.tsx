import { notFound } from "next/navigation";
import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { MarkdownHelp, ResourceForm } from "@/components/admin/resource-form";
import { EVENT_FIELDS } from "@/lib/admin-fields";
import { toDateTimeLocal } from "@/lib/format";
import { read } from "@/lib/db";

export default async function Page({ params }: PageProps<"/admin/agenda/[id]">) {
  const { id } = await params;
  const item = (await read("events")).find((e) => e.id === id);
  if (!item) notFound();

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Agenda", href: "/admin/agenda" }, { label: "Modifier" }]}
        title={item.title}
        description={`Adresse publique : /agenda/${item.slug}`}
      />
      <AdminBody className="space-y-8">
        <MarkdownHelp />
        <ResourceForm
          kind="events"
          recordId={item.id}
          groups={EVENT_FIELDS}
          cancelHref="/admin/agenda"
          values={{
            ...item,
            startsAt: toDateTimeLocal(item.startsAt),
            endsAt: toDateTimeLocal(item.endsAt),
            registration: item.registration ?? "",
          }}
        />
      </AdminBody>
    </>
  );
}
