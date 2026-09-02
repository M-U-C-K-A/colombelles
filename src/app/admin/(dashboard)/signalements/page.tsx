import Link from "next/link";
import { AdminBody, AdminHeader, EmptyState } from "@/components/admin/admin-ui";
import { ReportCard } from "@/components/admin/report-card";
import { read } from "@/lib/db";
import { cn } from "@/lib/utils";

const FILTERS = [
  { key: "tous", label: "Tous" },
  { key: "nouveau", label: "Nouveaux" },
  { key: "en_cours", label: "En cours" },
  { key: "traite", label: "Traités" },
  { key: "rejete", label: "Sans suite" },
];

export default async function Page({ searchParams }: PageProps<"/admin/signalements">) {
  const { etat } = await searchParams;
  const active = typeof etat === "string" ? etat : "tous";

  const all = (await read("reports")).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const reports = active === "tous" ? all : all.filter((r) => r.status === active);

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Signalements" }]}
        title="Signalements"
        description="Les dysfonctionnements signalés par les habitants depuis le formulaire public."
      />
      <AdminBody className="space-y-8">
        <nav aria-label="Filtrer les signalements" className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => {
            const count =
              filter.key === "tous"
                ? all.length
                : all.filter((r) => r.status === filter.key).length;
            return (
              <Link
                key={filter.key}
                href={
                  filter.key === "tous"
                    ? "/admin/signalements"
                    : `/admin/signalements?etat=${filter.key}`
                }
                aria-current={active === filter.key ? "true" : undefined}
                className={cn(
                  "inline-flex items-center gap-2 border px-4 py-2 text-sm transition-colors",
                  active === filter.key
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
                )}
              >
                {filter.label}
                <span className="numeral text-xs opacity-70">{count}</span>
              </Link>
            );
          })}
        </nav>

        {reports.length === 0 ? (
          <EmptyState
            title="Aucun signalement"
            description="Les demandes déposées depuis le formulaire public apparaîtront ici."
          />
        ) : (
          <div className="space-y-5">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </AdminBody>
    </>
  );
}
