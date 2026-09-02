import { CheckCircle2 } from "lucide-react";
import { AdminBody, AdminHeader } from "@/components/admin/admin-ui";
import { SettingsForm } from "@/components/admin/settings-form";
import { read } from "@/lib/db";

export default async function Page({ searchParams }: PageProps<"/admin/parametres">) {
  const { enregistre } = await searchParams;
  const settings = await read("settings");

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Paramètres" }]}
        title="Paramètres du site"
        description="Identité, coordonnées, horaires, bandeau d'information et repères de la commune. Ces informations alimentent l'en-tête, le pied de page et la page de contact."
      />
      <AdminBody className="space-y-8">
        {enregistre && (
          <p
            role="status"
            className="flex items-center gap-2 border-l-2 border-emerald-600 bg-emerald-600/5 py-3 pl-4 text-sm"
          >
            <CheckCircle2 className="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
            Paramètres enregistrés et appliqués au site public.
          </p>
        )}
        <SettingsForm settings={settings} />
      </AdminBody>
    </>
  );
}
