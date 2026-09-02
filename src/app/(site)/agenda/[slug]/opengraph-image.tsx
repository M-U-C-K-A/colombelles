import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { formatEventRange } from "@/lib/format";
import { getEventBySlug } from "@/lib/queries";

export const alt = "Rendez-vous à Colombelles";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return ogImage({ title: "Agenda", theme: "culture" });

  return ogImage({
    eyebrow: event.category,
    title: event.title,
    theme: event.theme,
    meta: `${formatEventRange(event.startsAt, event.endsAt)} · ${event.location}`,
  });
}
