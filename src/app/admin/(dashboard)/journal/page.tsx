import { redirect } from "next/navigation";
import { AdminBody, AdminHeader, EmptyState } from "@/components/admin/admin-ui";
import { formatDateTime } from "@/lib/format";
import { getSession } from "@/lib/auth";
import { read } from "@/lib/db";

export default async function Page() {
  const session = await getSession();
  if (session?.role !== "administrateur") redirect("/admin");

  const audit = await read("audit");

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Journal d'activité" }]}
        title="Journal d'activité"
        description="Les 200 dernières opérations réalisées dans l'espace d'administration : connexions, créations, modifications, suppressions."
      />
      <AdminBody>
        {audit.length === 0 ? (
          <EmptyState
            title="Journal vide"
            description="Les opérations réalisées dans l'administration seront consignées ici."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-foreground">
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Horodatage</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Agent</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Opération</th>
                  <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Objet</th>
                </tr>
              </thead>
              <tbody>
                {audit.map((entry) => (
                  <tr key={entry.id} className="border-b border-border">
                    <td className="numeral px-3 py-3 whitespace-nowrap text-muted-foreground">
                      {formatDateTime(entry.at)}
                    </td>
                    <td className="px-3 py-3 font-mono text-[0.8125rem]">{entry.user}</td>
                    <td className="px-3 py-3 font-medium">{entry.action}</td>
                    <td className="px-3 py-3 text-muted-foreground">{entry.target}</td>
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
