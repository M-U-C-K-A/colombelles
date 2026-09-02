import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { formatDate, formatDay, formatEventRange, formatMonthShort } from "@/lib/format";
import { themeStyle } from "@/lib/themes";
import { cn } from "@/lib/utils";
import type { EventItem, NewsItem } from "@/lib/types";

/** Étiquette de rubrique : un aplat de la couleur du thème, pour repérer d'un coup d'œil. */
export function CategoryTag({ label, className }: { label: string; className?: string }) {
  return (
    <span className={cn("theme-bg eyebrow inline-block px-2 py-1", className)}>{label}</span>
  );
}

export function NewsCard({
  item,
  size = "default",
}: {
  item: NewsItem;
  size?: "default" | "large" | "compact";
}) {
  if (size === "compact") {
    return (
      <article style={themeStyle(item.theme)} className="rule-bottom group">
        <Link href={`/actualites/${item.slug}`} className="flex items-baseline gap-4 py-3.5">
          <span className="theme-dot mt-2" aria-hidden="true" />
          <time
            className="numeral eyebrow w-28 shrink-0 text-muted-foreground"
            dateTime={item.publishedAt}
          >
            {formatDate(item.publishedAt)}
          </time>
          <span className="text-[0.9375rem] leading-snug font-medium transition-colors group-hover:text-theme">
            {item.title}
          </span>
        </Link>
      </article>
    );
  }

  if (size === "large") {
    return (
      <article style={themeStyle(item.theme)} className="group h-full">
        <Link href={`/actualites/${item.slug}`} className="theme-wash flex h-full flex-col p-7 lg:p-9">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CategoryTag label={item.category} />
            <time className="numeral eyebrow text-muted-foreground" dateTime={item.publishedAt}>
              {formatDate(item.publishedAt)}
            </time>
          </div>
          <h3 className="mt-7 text-[1.75rem] leading-[1.1] font-medium tracking-[-0.025em] sm:text-[2.125rem]">
            {item.title}
          </h3>
          <p className="mt-5 max-w-[52ch] leading-relaxed text-muted-foreground">{item.excerpt}</p>
          <span className="eyebrow theme-text mt-auto inline-flex items-center gap-1.5 pt-8">
            Lire l&apos;article
            <ArrowUpRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </Link>
      </article>
    );
  }

  return (
    <article style={themeStyle(item.theme)} className="group flex h-full flex-col">
      <Link href={`/actualites/${item.slug}`} className="flex h-full flex-col">
        <span className="theme-rule block" aria-hidden="true" />
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <CategoryTag label={item.category} />
          <time className="numeral eyebrow text-muted-foreground" dateTime={item.publishedAt}>
            {formatDate(item.publishedAt)}
          </time>
        </div>
        <h3 className="mt-4 text-lg leading-snug font-medium tracking-[-0.015em] transition-colors group-hover:text-theme">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
        <span className="eyebrow theme-text mt-auto inline-flex items-center gap-1.5 pt-6">
          Lire la suite
          <ArrowUpRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </Link>
    </article>
  );
}

export function EventCard({ item, compact = false }: { item: EventItem; compact?: boolean }) {
  return (
    <article style={themeStyle(item.theme)} className="rule-bottom group">
      <Link href={`/agenda/${item.slug}`} className="flex gap-5 py-5">
        {/* Le quantième en aplat de couleur : repère de date et de thème à la fois. */}
        <div className="theme-bg flex size-16 shrink-0 flex-col items-center justify-center">
          <span className="numeral text-xl leading-none font-medium">
            {formatDay(item.startsAt)}
          </span>
          <span className="eyebrow mt-1 text-[0.625rem] opacity-85">
            {formatMonthShort(item.startsAt)}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <span className="eyebrow theme-text">{item.category}</span>
          <h3 className="mt-1.5 text-[1.0625rem] leading-snug font-medium transition-colors group-hover:text-theme">
            {item.title}
          </h3>
          {!compact && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {item.excerpt}
            </p>
          )}
          <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" aria-hidden="true" />
              {formatEventRange(item.startsAt, item.endsAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden="true" />
              {item.location}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
