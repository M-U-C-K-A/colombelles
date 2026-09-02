export interface AdminNavItem {
  label: string;
  href: string;
  icon: string;
  /** Clé de la collection utilisée pour afficher un compteur. */
  countKey?: string;
  adminOnly?: boolean;
}

export interface AdminNavGroup {
  title: string;
  items: AdminNavItem[];
}

export const ADMIN_NAV: AdminNavGroup[] = [
  {
    title: "Pilotage",
    items: [{ label: "Tableau de bord", href: "/admin", icon: "LayoutDashboard" }],
  },
  {
    title: "Contenus",
    items: [
      { label: "Actualités", href: "/admin/actualites", icon: "Newspaper", countKey: "news" },
      { label: "Agenda", href: "/admin/agenda", icon: "CalendarDays", countKey: "events" },
      { label: "Pages", href: "/admin/pages", icon: "FileText", countKey: "pages" },
    ],
  },
  {
    title: "Ressources",
    items: [
      { label: "Publications", href: "/admin/publications", icon: "FolderOpen", countKey: "documents" },
      { label: "Médiathèque", href: "/admin/medias", icon: "Image", countKey: "media" },
      { label: "Annuaire", href: "/admin/annuaire", icon: "BookUser", countKey: "directory" },
      { label: "Offres d'emploi", href: "/admin/emploi", icon: "Briefcase", countKey: "jobs" },
    ],
  },
  {
    title: "Institution",
    items: [
      { label: "Élus", href: "/admin/elus", icon: "Users", countKey: "elus" },
      { label: "Services", href: "/admin/services", icon: "Building2", countKey: "services" },
    ],
  },
  {
    title: "Demandes des habitants",
    items: [
      { label: "Signalements", href: "/admin/signalements", icon: "TriangleAlert", countKey: "reports" },
      { label: "Messages", href: "/admin/messages", icon: "Mail", countKey: "messages" },
    ],
  },
  {
    title: "Configuration",
    items: [
      { label: "Paramètres du site", href: "/admin/parametres", icon: "Settings" },
      { label: "Utilisateurs", href: "/admin/utilisateurs", icon: "ShieldCheck", countKey: "users", adminOnly: true },
      { label: "Journal d'activité", href: "/admin/journal", icon: "History", adminOnly: true },
    ],
  },
];
