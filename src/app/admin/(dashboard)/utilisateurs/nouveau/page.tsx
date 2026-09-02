import { redirect } from "next/navigation";
import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { UserForm } from "@/components/admin/user-form";
import { getSession } from "@/lib/auth";

export default async function Page() {
  const session = await getSession();
  if (session?.role !== "administrateur") redirect("/admin");

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Utilisateurs", href: "/admin/utilisateurs" }, { label: "Nouveau" }]}
        title="Nouveau compte"
      />
      <AdminBody>
        <UserForm />
      </AdminBody>
    </>
  );
}
