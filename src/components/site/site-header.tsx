"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Moon, Phone, Search, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Wordmark } from "@/components/site/logo";
import { SearchDialog } from "@/components/site/search-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { themeStyle } from "@/lib/themes";
import { cn } from "@/lib/utils";
import type { NavSection } from "@/lib/queries";

interface Props {
  sections: NavSection[];
  phone: string;
}

export function SiteHeader({ sections, phone }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  // Un clic sur n'importe quel lien du menu le referme.
  const closeOnLink = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("a")) {
      setOpen(null);
      setMobileOpen(false);
    }
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Bandeau de service */}
      <div className="hidden rule-bottom bg-foreground text-background lg:block">
        <div className="swiss-container flex h-9 items-center justify-between">
          <p className="eyebrow opacity-80">Site officiel de la Ville de Colombelles</p>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="eyebrow flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
            >
              <Phone className="size-3" aria-hidden="true" />
              {phone}
            </a>
            <Link href="/contact" className="eyebrow opacity-80 transition-opacity hover:opacity-100">
              Horaires et accès
            </Link>
            <Link
              href="/accessibilite"
              className="eyebrow opacity-80 transition-opacity hover:opacity-100"
            >
              Accessibilité
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Barre principale */}
      <div className="rule-bottom" ref={navRef} onMouseLeave={scheduleClose}>
        <div className="swiss-container flex h-16 items-center justify-between gap-6 lg:h-20">
          <Link href="/" aria-label="Colombelles — accueil" className="shrink-0">
            <Wordmark tagline={false} />
          </Link>

          <nav aria-label="Navigation principale" className="hidden h-full items-stretch lg:flex">
            {sections.map((section) => {
              const active = pathname.startsWith(section.href);
              const expanded = open === section.key;
              return (
                <div key={section.key} style={themeStyle(section.theme)} className="flex items-stretch">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-haspopup="true"
                    onMouseEnter={() => {
                      cancelClose();
                      setOpen(section.key);
                    }}
                    onClick={() => setOpen(expanded ? null : section.key)}
                    className={cn(
                      "relative flex items-center gap-1.5 px-5 text-[0.9375rem] font-medium transition-colors",
                      "after:absolute after:inset-x-0 after:bottom-0 after:h-[4px] after:transition-all",
                      active || expanded
                        ? "text-theme after:bg-theme"
                        : "text-muted-foreground after:bg-transparent hover:text-foreground hover:after:bg-theme/35",
                    )}
                  >
                    {section.label}
                    <ChevronDown
                      className={cn("size-3.5 transition-transform", expanded && "rotate-180")}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rule-top-0 border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              aria-label="Rechercher sur le site"
            >
              <Search className="size-4" aria-hidden="true" />
              <span className="hidden xl:inline">Rechercher</span>
              <kbd className="hidden font-mono text-[0.6875rem] opacity-60 xl:inline">⌘K</kbd>
            </button>

            <div className="lg:hidden">
              <ThemeToggle />
            </div>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="p-2 lg:hidden"
                  aria-label="Ouvrir le menu de navigation"
                >
                  <Menu className="size-6" aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full gap-0 p-0 sm:max-w-md"
                onClickCapture={closeOnLink}
              >
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="rule-bottom flex h-16 items-center justify-between px-5">
                  <Wordmark tagline={false} />
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Fermer le menu"
                    className="p-2"
                  >
                    <X className="size-5" aria-hidden="true" />
                  </button>
                </div>
                <div className="overflow-y-auto pb-16">
                  <Accordion type="multiple" className="w-full">
                    {sections.map((section) => (
                      <AccordionItem
                        key={section.key}
                        value={section.key}
                        style={themeStyle(section.theme)}
                        className="rule-bottom border-b-0 px-5"
                      >
                        <AccordionTrigger className="py-4 text-base font-medium hover:no-underline">
                          <span className="flex items-center gap-3">
                            <span className="theme-bg block h-1 w-6" aria-hidden="true" />
                            {section.label}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-5">
                          <Link
                            href={section.href}
                            className="eyebrow mb-4 inline-block text-theme"
                          >
                            Voir la rubrique →
                          </Link>
                          <div className="space-y-5">
                            {section.groups.map((group) => (
                              <div key={group.title}>
                                <p className="eyebrow mb-2 text-muted-foreground">
                                  {group.title}
                                </p>
                                <ul className="space-y-1.5">
                                  {group.links.map((link) => (
                                    <li key={link.href + link.label} style={themeStyle(link.theme)}>
                                      <Link
                                        href={link.href}
                                        className="flex items-start gap-2.5 text-[0.9375rem] text-foreground/80 hover:text-foreground"
                                      >
                                        <span className="theme-dot mt-1.5" aria-hidden="true" />
                                        {link.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <div className="space-y-3 px-5 py-6">
                    {[
                      { label: "Actualités", href: "/actualites" },
                      { label: "Agenda", href: "/agenda" },
                      { label: "Publications", href: "/publications" },
                      { label: "Annuaire", href: "/annuaire" },
                      { label: "Offres d'emploi", href: "/emploi" },
                      { label: "Contact", href: "/contact" },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block text-[0.9375rem] font-medium"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Méga-menu */}
        {sections.map((section) => (
          <div
            key={section.key}
            hidden={open !== section.key}
            onMouseEnter={cancelClose}
            onClickCapture={closeOnLink}
            style={themeStyle(section.theme)}
            className="absolute inset-x-0 top-full hidden border-t-[5px] border-t-theme border-b border-b-border bg-background shadow-[0_24px_48px_-32px_rgba(0,0,0,0.35)] lg:block"
          >
            <div className="swiss-container py-10">
              <div className="swiss-grid">
                <div className="col-span-3">
                  <p className="eyebrow theme-bg inline-block px-2 py-1">Rubrique</p>
                  <h2 className="mt-3 text-2xl font-medium tracking-[-0.02em]">
                    {section.label}
                  </h2>
                  <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-muted-foreground">
                    {section.description}
                  </p>
                  <Link
                    href={section.href}
                    className="eyebrow mt-6 inline-flex items-center gap-2 border-b-2 border-foreground pb-1"
                  >
                    Voir toute la rubrique
                  </Link>
                </div>
                <div className="col-span-9 grid grid-cols-3 gap-x-6 gap-y-8">
                  {section.groups.map((group) => (
                    <div key={group.title}>
                      <p className="eyebrow rule-bottom pb-2 text-muted-foreground">
                        {group.title}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {group.links.map((link) => (
                          <li key={link.href + link.label} style={themeStyle(link.theme)}>
                            <Link
                              href={link.href}
                              className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-foreground/80 transition-colors hover:text-theme"
                            >
                              <span className="theme-dot mt-1.5" aria-hidden="true" />
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Les deux icônes sont rendues, la classe `dark` décide laquelle s'affiche :
  // le bouton est donc correct dès le rendu serveur, sans état d'hydratation.
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 opacity-80 transition-opacity hover:opacity-100"
      aria-label="Changer de thème (clair ou sombre)"
    >
      <Moon className="size-4 dark:hidden" aria-hidden="true" />
      <Sun className="hidden size-4 dark:block" aria-hidden="true" />
    </button>
  );
}
