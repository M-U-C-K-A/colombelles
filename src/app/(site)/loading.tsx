import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="swiss-container py-16" aria-busy="true" aria-live="polite">
      <span className="sr-only">Chargement du contenu…</span>
      <Skeleton className="h-3 w-32 rounded-none" />
      <Skeleton className="mt-8 h-16 w-3/4 max-w-2xl rounded-none" />
      <Skeleton className="mt-5 h-5 w-1/2 max-w-xl rounded-none" />
      <div className="swiss-grid mt-16">
        <div className="col-span-4 space-y-3 md:col-span-8 lg:col-span-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full rounded-none" />
          ))}
        </div>
        <div className="col-span-4 mt-10 space-y-4 md:col-span-8 lg:col-span-8 lg:col-start-5 lg:mt-0">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-4 rounded-none"
              style={{ width: `${72 + ((i * 13) % 28)}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
