import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { getJobBySlug } from "@/lib/queries";

export const alt = "Offre d'emploi — Ville de Colombelles";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return ogImage({ title: "Offres d'emploi", theme: "emploi" });

  return ogImage({
    eyebrow: "Offre d'emploi",
    title: job.title,
    theme: "emploi",
    meta: `${job.department} · ${job.timeframe}`,
  });
}
