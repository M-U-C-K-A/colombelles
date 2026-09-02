import Link from "next/link";
import { redirect } from "next/navigation";
import { Pencil } from "lucide-react";
import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { DeleteUserButton } from "@/components/admin/delete-user-button";
import { formatDateTime } from "@/lib/format";
import { getSession } from "@/lib/auth";
import { read } from "@/lib/db";

export default async function Page() {
  const session = await getSession();
  if (session?.role !== "administrateur") redirect("/admin");

  const users = (await read("users")).sort((a, b) => a.username.localeCompare(b.username));

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Utilisateurs" }]}
        title="Utilisateurs"
        description="Comptes habilités à accéder à l'espace d'administration. Les mots de passe sont stockés sous forme d'empreinte scrypt salée."
        action={{ label: "Nouveau compte", href: "/admin/utilisateurs/nouveau" }}
      />
      <AdminBody>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-foreground">
                <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Identifiant</th>
                <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Nom</th>
                <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Courriel</th>
                <th className="eyebrow px-3 py-3 text-left text-muted-foreground">Rôle</th>
                <th className="eyebrow px-3 py-3 text-left text-muted-foreground">
                  Dernière connexion
                </th>
                <th className="eyebrow px-3 py-3 text-right text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-3 py-3.5 font-mono text-[0.8125rem]">{user.username}</td>
                  <td className="px-3 py-3.5 font-medium">{user.name}</td>
                  <td className="px-3 py-3.5 text-muted-foreground">{user.email}</td>
                  <td className="px-3 py-3.5">
                    <span className="border border-border px-2 py-0.5 text-[0.6875rem] tracking-wide uppercase">
                      {user.role}
                    </span>
                  </td>
                  <td className="numeral px-3 py-3.5 text-muted-foreground">
                    {user.lastLogin ? formatDateTime(user.lastLogin) : "Jamais"}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/utilisateurs/${user.id}`}
                        title="Modifier"
                        className="p-2 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Pencil className="size-4" aria-hidden="true" />
                        <span className="sr-only">Modifier {user.username}</span>
                      </Link>
                      {user.id !== session.sub && (
                        <DeleteUserButton userId={user.id} username={user.username} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 max-w-[70ch] text-xs leading-relaxed text-muted-foreground">
          Les sessions expirent au bout de huit heures. Chaque connexion et chaque modification
          de contenu est consignée dans le journal d&apos;activité.
        </p>
      </AdminBody>
    </>
  );
}
