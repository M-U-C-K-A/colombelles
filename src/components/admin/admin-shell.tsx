"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookUser,
  Briefcase,
  Building2,
  CalendarDays,
  ExternalLink,
  FileText,
  FolderOpen,
  History,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Newspaper,
  Settings,
  ShieldCheck,
  TriangleAlert,
  Users,
  X,
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions/auth";
import { LogoMark } from "@/components/site/logo";
import { ADMIN_NAV } from "@/lib/admin-nav";
import { cn } from "@/lib/utils";
import type { SessionPayload } from "@/lib/session";

const ICONS = {
  LayoutDashboard,
  Newspaper,
  CalendarDays,
  FileText,
  FolderOpen,
  Image: ImageIcon,
  BookUser,
  Briefcase,
  Users,
  Building2,
  TriangleAlert,
  Mail,
  Settings,
  ShieldCheck,
  History,
} as const;

export function AdminShell({
  session,
  counts,
  children,
}: {
  session: SessionPayload;
  counts: Record<string, number>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Le tiroir mobile se referme dès qu'un lien de navigation est activé.
  const closeOnLink = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("a")) setMobileOpen(false);
  };

  const nav = (
    <nav aria-label="Navigation de l'administration" className="flex-1 overflow-y-auto px-3 py-5">
      {ADMIN_NAV.map((group) => {
        const items = group.items.filter(
          (item) => !item.adminOnly || session.role === "administrateur",
        );
        if (items.length === 0) return null;

        return (
          <div key={group.title} className="mb-5">
            <p className="eyebrow px-3 pb-2 text-sidebar-foreground/45">{group.title}</p>
            <ul className="space-y-0.5">
              {items.map((item) => {
                const active =
                  item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
                const Icon = ICONS[item.icon as keyof typeof ICONS] ?? FileText;
                const count = item.countKey ? counts[item.countKey] : undefined;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 border-l-2 px-3 py-2 text-sm transition-colors",
                        active
                          ? "border-rouge bg-sidebar-accent text-sidebar-accent-foreground"
                          : "border-transparent text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                      )}
                    >
                      <Icon className="size-4 shrink-0" aria-hidden="true" />
                      <span className="flex-1 truncate">{item.label}</span>
                      {count !== undefined && (
                        <span className="numeral text-[0.6875rem] text-sidebar-foreground/45">
                          {count}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );

  const footer = (
    <div className="border-t border-sidebar-border p-4">
      <div className="mb-3 px-1">
        <p className="truncate text-sm font-medium text-sidebar-foreground">{session.name}</p>
        <p className="eyebrow mt-1 text-sidebar-foreground/45">{session.role}</p>
      </div>
      <div className="space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-1 py-2 text-sm text-sidebar-foreground/70 transition-colors hover:text-sidebar-foreground"
        >
          <ExternalLink className="size-4" aria-hidden="true" />
          Voir le site public
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 px-1 py-2 text-sm text-sidebar-foreground/70 transition-colors hover:text-rouge"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Se déconnecter
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Barre latérale — écrans larges */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-sidebar lg:flex">
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
          <LogoMark className="size-7" />
          <div className="leading-none">
            <p className="text-sm font-semibold tracking-[-0.02em] text-sidebar-foreground uppercase">
              Colombelles
            </p>
            <p className="eyebrow mt-1 text-sidebar-foreground/45">Administration</p>
          </div>
        </div>
        {nav}
        {footer}
      </aside>

      {/* Barre latérale — mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Fermer la navigation"
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="relative flex h-full w-72 flex-col bg-sidebar"
            onClickCapture={closeOnLink}
          >
            <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
              <div className="flex items-center gap-3">
                <LogoMark className="size-7" />
                <p className="text-sm font-semibold tracking-[-0.02em] text-sidebar-foreground uppercase">
                  Administration
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Fermer"
                className="p-1 text-sidebar-foreground/70"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            {nav}
            {footer}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-background/95 px-5 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir la navigation"
            className="p-1"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
          <span className="text-sm font-medium">Administration</span>
        </header>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
