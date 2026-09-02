import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Markdown } from "@/lib/markdown";
import { formatDate } from "@/lib/format";
import { SECTION_BY_KEY } from "@/lib/navigation";
import { CaenLaMer } from "@/components/site/caen-la-mer";
import { Salles } from "@/components/site/salles";
import { getPage, getPages, getSectionGroups, getVenues } from "@/lib/queries";
import { themeStyle } from "@/lib/themes";
import type { SectionKey } from "@/lib/types";

/** Page d'atterrissage d'une rubrique : sommaire par sous-rubrique. */
export async function SectionIndex({ section }: { section: SectionKey }) {
  const meta = SECTION_BY_KEY[section];
  const groups = await getSectionGroups(section);

  return (
    <>
      <PageHeader
        theme={meta.theme}
        crumbs={[{ label: meta.label }]}
        eyebrow="Rubrique"
        title={meta.label}
        lead={meta.description}
      />

      <div className="swiss-container py-14 md:py-20">
        <div className="space-y-16">
          {groups.map((group, index) => (
            <section key={group.title} style={themeStyle(group.items[0]?.theme ?? meta.theme)}>
              <div className="swiss-grid">
                <div className="col-span-4 md:col-span-8 lg:col-span-3">
                  <div className="theme-rule sticky top-28 pt-4">
                    <span className="numeral eyebrow text-theme">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-3 text-xl font-medium tracking-[-0.02em]">
                      {group.title}
                    </h2>
                  </div>
                </div>
                <div className="col-span-4 md:col-span-8 lg:col-span-9">
                  <ul className="rule-top">
                    {group.items.map((page) => (
                      <li key={page.id} style={themeStyle(page.theme)}>
                        <Link
                          href={`${meta.href}/${page.slug}`}
                          className="group flex items-start justify-between gap-6 rule-bottom py-6 transition-colors hover:theme-wash"
                        >
                          <span className="flex max-w-[62ch] gap-4">
                            <span className="theme-dot mt-2" aria-hidden="true" />
                            <span className="block">
                            <span className="block text-lg leading-snug font-medium transition-colors group-hover:text-theme">
                              {page.title}
                            </span>
                            {page.summary && (
                              <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                                {page.summary}
                              </span>
                            )}
                            </span>
                          </span>
                          <ArrowUpRight
                            className="mt-1 size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        {meta.extras.length > 0 && (
          <section className="mt-20">
            <p className="eyebrow rule-strong pt-4 pb-5 text-muted-foreground">
              Voir aussi
            </p>
            <ul className="grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
              {meta.extras.map((extra) => (
                <li
                  key={extra.href + extra.label}
                  style={themeStyle(meta.theme)}
                  className="border-r border-b border-border"
                >
                  <Link
                    href={extra.href}
                    className="group flex h-full items-center justify-between gap-4 p-5 text-sm font-medium transition-colors hover:bg-theme hover:text-white"
                  >
                    {extra.label}
                    <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}

/** Page de contenu : sommaire latéral de la rubrique + corps de texte. */
export async function SectionPage({
  section,
  slug,
}: {
  section: SectionKey;
  slug: string;
}) {
  const meta = SECTION_BY_KEY[section];
  const page = await getPage(section, slug);
  if (!page) notFound();

  const siblings = (await getPages(section)).filter(
    (p) => (p.subsection ?? "") === (page.subsection ?? ""),
  );
  const position = siblings.findIndex((p) => p.id === page.id);
  const previous = position > 0 ? siblings[position - 1] : null;
  const next = position >= 0 && position < siblings.length - 1 ? siblings[position + 1] : null;

  return (
    <>
      <PageHeader
        theme={page.theme}
        crumbs={[
          { label: meta.label, href: meta.href },
          ...(page.subsection ? [{ label: page.subsection }] : []),
          { label: page.title },
        ]}
        eyebrow={page.subsection ?? meta.label}
        title={page.title}
        lead={page.summary}
      />

      <div style={themeStyle(page.theme)} className="swiss-container py-14 md:py-20">
        <div className="swiss-grid">
          {/* Sommaire de la rubrique */}
          <aside className="col-span-4 md:col-span-8 lg:col-span-3">
            <nav aria-label={`Pages de la rubrique ${meta.label}`} className="lg:sticky lg:top-28">
              <p className="eyebrow theme-rule pt-4 pb-4 text-muted-foreground">
                {page.subsection ?? meta.label}
              </p>
              <ul className="space-y-0">
                {siblings.map((item) => {
                  const current = item.id === page.id;
                  return (
                    <li key={item.id} className="rule-bottom">
                      <Link
                        href={`${meta.href}/${item.slug}`}
                        aria-current={current ? "page" : undefined}
                        className={
                          current
                            ? "theme-wash block border-l-[3px] border-theme py-3 pl-3 text-sm font-medium"
                            : "block border-l-[3px] border-transparent py-3 pl-3 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                        }
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link href={meta.href} className="eyebrow mt-6 inline-flex items-center gap-1.5 text-theme">
                Toute la rubrique
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </nav>
          </aside>

          {/* Corps */}
          <article className="col-span-4 mt-12 md:col-span-8 lg:col-span-8 lg:col-start-5 lg:mt-0">
            <Markdown content={page.content} className="prose-swiss" />

            {page.block === "salles" && (
              <div className="mt-12">
                <Salles venues={await getVenues()} />
              </div>
            )}

            {page.block === "caen-la-mer" && <CaenLaMer className="mt-12" />}

            <p className="mt-14 rule-top pt-4 text-xs text-muted-foreground">
              Page mise à jour le {formatDate(page.updatedAt)}
            </p>

            {(previous || next) && (
              <nav
                aria-label="Pages voisines"
                className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2"
              >
                {previous ? (
                  <Link
                    href={`${meta.href}/${previous.slug}`}
                    className="group bg-background p-5 transition-colors hover:bg-secondary"
                  >
                    <span className="eyebrow text-muted-foreground">Précédent</span>
                    <span className="mt-2 block text-sm font-medium group-hover:text-theme">
                      {previous.title}
                    </span>
                  </Link>
                ) : (
                  <span className="hidden bg-background sm:block" />
                )}
                {next && (
                  <Link
                    href={`${meta.href}/${next.slug}`}
                    className="group bg-background p-5 text-right transition-colors hover:bg-secondary"
                  >
                    <span className="eyebrow text-muted-foreground">Suivant</span>
                    <span className="mt-2 block text-sm font-medium group-hover:text-theme">
                      {next.title}
                    </span>
                  </Link>
                )}
              </nav>
            )}
          </article>
        </div>
      </div>
    </>
  );
}

/** Métadonnées communes aux pages de rubrique. */
export async function sectionPageMetadata(section: SectionKey, slug: string) {
  const page = await getPage(section, slug);
  if (!page) return { title: "Page introuvable" };
  return {
    title: page.title,
    description: page.summary,
    openGraph: { title: page.title, description: page.summary },
  };
}
