import { notFound, redirect } from "next/navigation";
import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { UserForm } from "@/components/admin/user-form";
import { getSession } from "@/lib/auth";
import { read } from "@/lib/db";

export default async function Page({ params }: PageProps<"/admin/utilisateurs/[id]">) {
  const session = await getSession();
  if (session?.role !== "administrateur") redirect("/admin");

  const { id } = await params;
  const user = (await read("users")).find((u) => u.id === id);
  if (!user) notFound();

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Utilisateurs", href: "/admin/utilisateurs" }, { label: "Modifier" }]}
        title={user.name}
        description={`Identifiant de connexion : ${user.username}`}
      />
      <AdminBody>
        <UserForm user={user} />
      </AdminBody>
    </>
  );
}
