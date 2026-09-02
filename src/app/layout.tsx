import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

/**
 * Geist — néo-grotesque distribuée sous licence SIL Open Font License 1.1.
 * Choisie pour sa parenté avec les grotesques suisses (Helvetica, Univers)
 * et pour ses chiffres tabulaires, indispensables aux tableaux d'horaires.
 */
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.colombelles.fr"),
  title: {
    default: "Ville de Colombelles — site officiel",
    template: "%s · Ville de Colombelles",
  },
  description:
    "Site officiel de la Ville de Colombelles, commune du Calvados membre de la communauté urbaine Caen la mer. Démarches, actualités, agenda et services municipaux.",
  applicationName: "Ville de Colombelles",
  authors: [{ name: "Ville de Colombelles" }],
  keywords: [
    "Colombelles",
    "mairie",
    "Calvados",
    "Caen la mer",
    "Normandie",
    "démarches administratives",
    "SMN",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Ville de Colombelles",
    title: "Ville de Colombelles — site officiel",
    description:
      "Démarches, actualités, agenda et services de la Ville de Colombelles (Calvados).",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1b1e" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
