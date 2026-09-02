import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { formatDate } from "@/lib/format";
import { getNewsBySlug } from "@/lib/queries";

export const alt = "Actualité de la Ville de Colombelles";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return ogImage({ title: "Actualités", theme: "actu" });

  return ogImage({
    eyebrow: item.category,
    title: item.title,
    theme: item.theme,
    meta: formatDate(item.publishedAt),
  });
}
