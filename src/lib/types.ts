/** Modèle de contenu du site de la Ville de Colombelles. */

export type Status = "brouillon" | "publie";

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image?: string;
  publishedAt: string;
  status: Status;
  featured: boolean;
  author: string;
  tags: string[];
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  startsAt: string;
  endsAt?: string;
  location: string;
  category: string;
  price: string;
  image?: string;
  status: Status;
  featured: boolean;
  registration?: string;
}

export interface PageItem {
  id: string;
  slug: string;
  title: string;
  section: SectionKey;
  subsection?: string;
  summary: string;
  content: string;
  order: number;
  status: Status;
  updatedAt: string;
}

export type SectionKey =
  | "votre-mairie"
  | "demarches"
  | "vivre-a-colombelles"
  | "sortir-et-decouvrir"
  | "institutionnel";

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  url: string;
  fileType: string;
  size: string;
  publishedAt: string;
  status: Status;
}

export interface Elu {
  id: string;
  name: string;
  role: string;
  delegation: string;
  group: string;
  order: number;
  email?: string;
  permanence?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  phone: string;
  email: string;
  hours: string;
  address: string;
  order: number;
}

export type DirectoryType = "association" | "commerce" | "equipement";

export interface DirectoryItem {
  id: string;
  name: string;
  type: DirectoryType;
  category: string;
  description: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  status: Status;
}

export interface JobItem {
  id: string;
  slug: string;
  title: string;
  department: string;
  contract: string;
  timeframe: string;
  deadline: string;
  description: string;
  status: Status;
  publishedAt: string;
}

export type ReportStatus = "nouveau" | "en_cours" | "traite" | "rejete";

export interface ReportItem {
  id: string;
  reference: string;
  category: string;
  description: string;
  location: string;
  name: string;
  email: string;
  phone?: string;
  status: ReportStatus;
  note?: string;
  createdAt: string;
}

export interface MessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  service: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  alt: string;
  credit?: string;
  uploadedAt: string;
}

export interface UserItem {
  id: string;
  username: string;
  name: string;
  email: string;
  role: "administrateur" | "editeur";
  passwordHash: string;
  lastLogin?: string;
  createdAt: string;
}

export interface AuditEntry {
  id: string;
  at: string;
  user: string;
  action: string;
  target: string;
}

export interface Settings {
  siteName: string;
  tagline: string;
  description: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  email: string;
  hours: { day: string; value: string }[];
  social: { label: string; url: string }[];
  banner: {
    enabled: boolean;
    level: "info" | "alerte" | "vigilance";
    title: string;
    text: string;
    href: string;
  };
  maintenance: boolean;
  population: string;
  area: string;
  intercommunalite: string;
}

export interface Database {
  settings: Settings;
  news: NewsItem[];
  events: EventItem[];
  pages: PageItem[];
  documents: DocumentItem[];
  elus: Elu[];
  services: ServiceItem[];
  directory: DirectoryItem[];
  jobs: JobItem[];
  reports: ReportItem[];
  messages: MessageItem[];
  media: MediaItem[];
  users: UserItem[];
  audit: AuditEntry[];
}
