import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { SECTION_BY_KEY } from "@/lib/navigation";
import { getPage } from "@/lib/queries";

export const alt = "Ville de Colombelles";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage("votre-mairie", slug);
  const meta = SECTION_BY_KEY["votre-mairie"];
  if (!page) return ogImage({ title: meta.label, theme: meta.theme });

  return ogImage({
    eyebrow: page.subsection ?? meta.label,
    title: page.title,
    theme: page.theme,
    meta: meta.label,
  });
}
