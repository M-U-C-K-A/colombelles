import { AdminBody, AdminHeader, EmptyState, StatusBadge } from "@/components/admin/admin-ui";
import { RowActions } from "@/components/admin/row-actions";
import { formatDateTime, isPast } from "@/lib/format";
import { read } from "@/lib/db";

export default async function Page() {
  const events = (await read("events")).sort((a, b) => b.startsAt.localeCompare(a.startsAt));

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Agenda" }]}
        title="Agenda"
        description="Les événements affichés dans l'agenda et sur la page d'accueil."
        action={{ label: "Nouvel événement", href: "/admin/agenda/nouveau" }}
      />
      <AdminBody>
        {events.length === 0 ? (
          <EmptyState
            title="Aucun événement"
            description="Ajoutez un premier rendez-vous pour alimenter l'agenda public."
            action={{ label: "Nouvel événement", href: "/admin/agenda/nouveau" }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[54rem] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-foreground">
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Événement</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Date</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Lieu</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Statut</th>
                  <th className="eyebrow px-3 py-3 text-right text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((item) => (
                  <tr key={item.id} className="border-b border-border hover:bg-secondary/50">
                    <td className="max-w-xs px-3 py-3.5">
                      <span className="block truncate font-medium">{item.title}</span>
                      <span className="eyebrow mt-1 flex items-center gap-2 text-muted-foreground">
                        <span
                          className="size-2.5 shrink-0"
                          style={{ backgroundColor: `var(--t-${item.theme})` }}
                          aria-hidden="true"
                        />
                        {item.category}
                      </span>
                    </td>
                    <td className="numeral px-3 py-3.5 text-muted-foreground">
                      {formatDateTime(item.startsAt)}
                      {isPast(item.endsAt ?? item.startsAt) && (
                        <span className="eyebrow mt-1 block">Passé</span>
                      )}
                    </td>
                    <td className="max-w-[14rem] truncate px-3 py-3.5 text-muted-foreground">
                      {item.location}
                    </td>
                    <td className="px-3 py-3.5">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-3 py-2">
                      <RowActions
                        kind="events"
                        recordId={item.id}
                        label={item.title}
                        status={item.status}
                        editHref={`/admin/agenda/${item.id}`}
                        viewHref={`/agenda/${item.slug}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminBody>
    </>
  );
}
