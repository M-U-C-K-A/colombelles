import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { getSession } from "@/lib/auth";
import { getDb, storageMode } from "@/lib/db";

export default async function DashboardLayout({ children }: LayoutProps<"/admin">) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [db, storage] = await Promise.all([getDb(), storageMode()]);
  const counts: Record<string, number> = {
    news: db.news.length,
    events: db.events.length,
    pages: db.pages.length,
    documents: db.documents.length,
    media: db.media.length,
    directory: db.directory.length,
    jobs: db.jobs.length,
    elus: db.elus.length,
    services: db.services.length,
    reports: db.reports.filter((r) => r.status === "nouveau").length,
    messages: db.messages.filter((m) => !m.read).length,
    users: db.users.length,
  };

  return (
    <AdminShell session={session} counts={counts} storage={storage}>
      {children}
    </AdminShell>
  );
}
