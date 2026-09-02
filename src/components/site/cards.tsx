import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { formatDate, formatDay, formatEventRange, formatMonthShort } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { EventItem, NewsItem } from "@/lib/types";

export function NewsCard({
  item,
  size = "default",
}: {
  item: NewsItem;
  size?: "default" | "large" | "compact";
}) {
  if (size === "compact") {
    return (
      <article className="rule-bottom group py-4">
        <Link href={`/actualites/${item.slug}`} className="flex items-baseline gap-4">
          <time className="numeral eyebrow shrink-0 pt-1 text-muted-foreground" dateTime={item.publishedAt}>
            {formatDate(item.publishedAt)}
          </time>
          <span className="text-[0.9375rem] leading-snug font-medium transition-colors group-hover:text-rouge">
            {item.title}
          </span>
        </Link>
      </article>
    );
  }

  return (
    <article className={cn("group flex flex-col", size === "large" && "h-full")}>
      <Link href={`/actualites/${item.slug}`} className="flex h-full flex-col">
        <div
          className={cn(
            "rule-top relative flex items-center justify-between gap-4 pt-4 pb-4",
          )}
        >
          <span className="eyebrow text-rouge">{item.category}</span>
          <time className="numeral eyebrow text-muted-foreground" dateTime={item.publishedAt}>
            {formatDate(item.publishedAt)}
          </time>
        </div>
        <h3
          className={cn(
            "font-medium tracking-[-0.02em] transition-colors group-hover:text-rouge",
            size === "large" ? "text-2xl leading-[1.15] sm:text-3xl" : "text-lg leading-snug",
          )}
        >
          {item.title}
        </h3>
        <p
          className={cn(
            "mt-3 text-muted-foreground",
            size === "large" ? "text-base leading-relaxed" : "text-sm leading-relaxed",
          )}
        >
          {item.excerpt}
        </p>
        <span className="eyebrow mt-auto inline-flex items-center gap-1.5 pt-6 text-foreground">
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
    <article className="rule-bottom group">
      <Link href={`/agenda/${item.slug}`} className="flex gap-5 py-5">
        <div className="clay-inset flex size-16 shrink-0 flex-col items-center justify-center bg-secondary">
          <span className="numeral text-xl leading-none font-medium">
            {formatDay(item.startsAt)}
          </span>
          <span className="eyebrow mt-1 text-[0.625rem] text-muted-foreground">
            {formatMonthShort(item.startsAt)}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <span className="eyebrow text-rouge">{item.category}</span>
          <h3 className="mt-1.5 text-[1.0625rem] leading-snug font-medium transition-colors group-hover:text-rouge">
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
