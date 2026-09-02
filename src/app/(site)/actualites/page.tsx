import type { Metadata } from "next";
import Link from "next/link";
import { NewsCard } from "@/components/site/cards";
import { themeForCategory, themeStyle } from "@/lib/themes";
import { PageHeader } from "@/components/site/page-header";
import { getNews, getNewsCategories } from "@/lib/queries";
import type { ThemeKey } from "@/lib/themes";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Toute l'actualité de la Ville de Colombelles : vie municipale, travaux, culture, éducation, environnement.",
};

export default async function Page({ searchParams }: PageProps<"/actualites">) {
  const { categorie } = await searchParams;
  const active = typeof categorie === "string" ? categorie : null;

  const [all, categories] = await Promise.all([getNews(), getNewsCategories()]);
  const items = active ? all.filter((n) => n.category === active) : all;

  return (
    <>
      <PageHeader
        theme={"actu"}
        crumbs={[{ label: "Actualités" }]}
        eyebrow={`${all.length} articles publiés`}
        title="Actualités"
        lead="Les informations de la vie municipale, des services et des équipements de la commune."
      />

      <div style={themeStyle("actu")} className="swiss-container py-12 md:py-16">
        {/* Filtres */}
        <nav aria-label="Filtrer par catégorie" className="rule-bottom flex flex-wrap gap-2 pb-6">
          <FilterLink href="/actualites" active={!active}>
            Toutes
          </FilterLink>
          {categories.map((category) => (
            <FilterLink
              key={category}
              href={`/actualites?categorie=${encodeURIComponent(category)}`}
              active={active === category}
              theme={themeForCategory(category)}
            >
              {category}
            </FilterLink>
          ))}
        </nav>

        {items.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            Aucun article dans cette catégorie.
          </p>
        ) : (
          <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function FilterLink({
  href,
  active,
  theme,
  children,
}: {
  href: string;
  active: boolean;
  theme?: ThemeKey;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      style={theme ? themeStyle(theme) : undefined}
      className={cn(
        "inline-flex items-center gap-2 border px-4 py-2 text-sm transition-colors",
        active
          ? theme
            ? "theme-bg border-theme"
            : "border-foreground bg-foreground text-background"
          : "border-border text-muted-foreground hover:border-theme hover:text-theme",
      )}
    >
      {theme && (
        <span
          className={cn("size-2 shrink-0", active ? "bg-white" : "theme-dot")}
          aria-hidden="true"
        />
      )}
      {children}
    </Link>
  );
}
