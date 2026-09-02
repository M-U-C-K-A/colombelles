import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/admin/login-form";
import { SiteLogo } from "@/components/site/logo";

export const metadata: Metadata = {
  title: "Connexion",
  robots: { index: false, follow: false },
};

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  const { suite } = await searchParams;
  const next = typeof suite === "string" && suite.startsWith("/admin") ? suite : "/admin";

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Colonne d'identité */}
      <aside className="relative hidden flex-col justify-between bg-foreground p-12 text-background lg:flex">
        <SiteLogo height={46} plate />

        <div>
          <p className="eyebrow text-background/60">Espace d&apos;administration</p>
          <p className="display mt-6 max-w-[16ch] text-[3.25rem]">
            Gérer le site de la ville
          </p>
          <p className="mt-8 max-w-[42ch] leading-relaxed text-background/70">
            Actualités, agenda, pages, publications, annuaire, offres d&apos;emploi,
            signalements et paramètres du site.
          </p>
        </div>

        <div className="flex items-end justify-between gap-6">
          <p className="text-xs text-background/50">
            Accès réservé aux agents habilités. Toute connexion est journalisée.
          </p>
          <span className="numeral text-xs text-background/40">14460</span>
        </div>
      </aside>

      {/* Colonne du formulaire */}
      <main className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <div className="lg:hidden">
            <SiteLogo height={42} />
          </div>
          <p className="eyebrow mt-8 text-rouge lg:mt-0">Connexion</p>
          <h1 className="display mt-5 text-[2.25rem]">Espace d&apos;administration</h1>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Saisissez les identifiants qui vous ont été communiqués par le service
            communication.
          </p>

          <div className="mt-10">
            <LoginForm next={next} />
          </div>

          <Link
            href="/"
            className="mt-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Retour au site public
          </Link>
        </div>
      </main>
    </div>
  );
}
