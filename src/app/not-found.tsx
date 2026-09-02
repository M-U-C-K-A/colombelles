import type { Metadata } from "next";
import { AlertBanner } from "@/components/site/alert-banner";
import { NotFoundContent } from "@/components/site/not-found-content";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getNavigation, getSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

/**
 * 404 racine : elle intervient hors du groupe `(site)` et doit donc composer
 * elle-même l'ossature du site.
 */
export default async function NotFound() {
  const [sections, settings] = await Promise.all([getNavigation(), getSettings()]);

  return (
    <>
      <AlertBanner banner={settings.banner} />
      <SiteHeader sections={sections} phone={settings.phone} />
      <main id="contenu" className="flex-1">
        <NotFoundContent />
      </main>
      <SiteFooter sections={sections} settings={settings} />
    </>
  );
}
