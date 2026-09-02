import { AlertBanner } from "@/components/site/alert-banner";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getNavigation, getSettings } from "@/lib/queries";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const [sections, settings] = await Promise.all([getNavigation(), getSettings()]);

  return (
    <>
      <a href="#contenu" className="skip-link">
        Aller au contenu principal
      </a>
      <AlertBanner banner={settings.banner} />
      <SiteHeader sections={sections} phone={settings.phone} />
      <main id="contenu" className="flex-1">
        {children}
      </main>
      <SiteFooter sections={sections} settings={settings} />
    </>
  );
}
