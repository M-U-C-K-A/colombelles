import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { AdminBody, AdminHeader, StatTile, StatusBadge } from "@/components/admin/admin-ui";
import { formatDateTime, formatRelative } from "@/lib/format";
import { getSession } from "@/lib/auth";
import { getDb } from "@/lib/db";
import type { Database } from "@/lib/types";

/** Indicateurs du tableau de bord, calculés hors du rendu. */
function computeStats(db: Database) {
  const now = Date.now();
  return {
    publishedNews: db.news.filter((n) => n.status === "publie").length,
    drafts:
      db.news.filter((n) => n.status === "brouillon").length +
      db.events.filter((e) => e.status === "brouillon").length +
      db.pages.filter((p) => p.status === "brouillon").length,
    upcoming: db.events.filter(
      (e) => e.status === "publie" && new Date(e.startsAt).getTime() >= now,
    ).length,
    newReports: db.reports.filter((r) => r.status === "nouveau").length,
    unread: db.messages.filter((m) => !m.read).length,
    greeting: new Date().getHours() < 18 ? "Bonjour" : "Bonsoir",
  };
}

export default async function DashboardPage() {
  const [session, db] = await Promise.all([getSession(), getDb()]);

  const { publishedNews, drafts, upcoming, newReports, unread, greeting } =
    computeStats(db);

  const recentAudit = db.audit.slice(0, 8);
  const pendingReports = db.reports
    .filter((r) => r.status !== "traite" && r.status !== "rejete")
    .slice(0, 5);
  const latestMessages = db.messages.slice(0, 5);

  return (
    <>
      <AdminHeader
        title={`${greeting}, ${session?.name ?? "bienvenue"}`}
        description="Vue d'ensemble des contenus publiés et des demandes en attente de traitement."
      />

      <AdminBody className="space-y-12">
        {/* Indicateurs */}
        <section>
          <h2 className="eyebrow mb-5 text-muted-foreground">Indicateurs</h2>
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
            <StatTile label="Actualités publiées" value={publishedNews} href="/admin/actualites" />
            <StatTile label="Événements à venir" value={upcoming} href="/admin/agenda" />
            <StatTile
              label="Brouillons"
              value={drafts}
              hint="Actualités, événements et pages"
              href="/admin/actualites"
            />
            <StatTile
              label="Signalements nouveaux"
              value={newReports}
              accent={newReports > 0}
              href="/admin/signalements"
            />
            <StatTile
              label="Messages non lus"
              value={unread}
              accent={unread > 0}
              href="/admin/messages"
            />
          </div>
        </section>

        {/* Actions rapides */}
        <section>
          <h2 className="eyebrow mb-5 text-muted-foreground">Créer</h2>
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Une actualité", href: "/admin/actualites/nouveau" },
              { label: "Un événement", href: "/admin/agenda/nouveau" },
              { label: "Une page", href: "/admin/pages/nouveau" },
              { label: "Une publication", href: "/admin/publications/nouveau" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between gap-4 bg-background p-6 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
              >
                {item.label}
                <Plus className="size-4 shrink-0" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Signalements en attente */}
          <section>
            <div className="flex items-baseline justify-between border-t-2 border-foreground pt-4 pb-5">
              <h2 className="text-base font-medium">Signalements à traiter</h2>
              <Link href="/admin/signalements" className="eyebrow text-rouge">
                Tout voir →
              </Link>
            </div>
            {pendingReports.length === 0 ? (
              <p className="py-8 text-sm text-muted-foreground">
                Aucun signalement en attente.
              </p>
            ) : (
              <ul>
                {pendingReports.map((report) => (
                  <li key={report.id} className="border-b border-border py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="numeral eyebrow text-muted-foreground">
                          {report.reference}
                        </p>
                        <p className="mt-1.5 text-sm font-medium">{report.category}</p>
                        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                          {report.location}
                        </p>
                      </div>
                      <StatusBadge status={report.status} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Messages */}
          <section>
            <div className="flex items-baseline justify-between border-t-2 border-foreground pt-4 pb-5">
              <h2 className="text-base font-medium">Derniers messages</h2>
              <Link href="/admin/messages" className="eyebrow text-rouge">
                Tout voir →
              </Link>
            </div>
            {latestMessages.length === 0 ? (
              <p className="py-8 text-sm text-muted-foreground">Aucun message reçu.</p>
            ) : (
              <ul>
                {latestMessages.map((message) => (
                  <li key={message.id} className="border-b border-border py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{message.subject}</p>
                        <p className="mt-1 truncate text-sm text-muted-foreground">
                          {message.service} · {message.email}
                        </p>
                      </div>
                      <span className="eyebrow shrink-0 text-muted-foreground">
                        {formatRelative(message.createdAt)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Journal */}
        <section>
          <div className="flex items-baseline justify-between border-t-2 border-foreground pt-4 pb-5">
            <h2 className="text-base font-medium">Activité récente</h2>
            {session?.role === "administrateur" && (
              <Link href="/admin/journal" className="eyebrow text-rouge">
                Journal complet →
              </Link>
            )}
          </div>
          {recentAudit.length === 0 ? (
            <p className="py-8 text-sm text-muted-foreground">
              Aucune activité enregistrée pour le moment.
            </p>
          ) : (
            <ul>
              {recentAudit.map((entry) => (
                <li
                  key={entry.id}
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-border py-3 text-sm"
                >
                  <span className="numeral eyebrow w-40 shrink-0 text-muted-foreground">
                    {formatDateTime(entry.at)}
                  </span>
                  <span className="font-medium">{entry.action}</span>
                  <span className="min-w-0 flex-1 truncate text-muted-foreground">
                    {entry.target}
                  </span>
                  <span className="eyebrow text-muted-foreground">{entry.user}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="border border-border p-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-base font-medium">Site public</h2>
              <p className="mt-2 max-w-[60ch] text-sm text-muted-foreground">
                Les modifications enregistrées ici sont immédiatement répercutées sur le site
                public.
              </p>
            </div>
            <Link
              href="/"
              target="_blank"
              className="inline-flex shrink-0 items-center gap-2 border border-foreground px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
            >
              Ouvrir le site
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </AdminBody>
    </>
  );
}
