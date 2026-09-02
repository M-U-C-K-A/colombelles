import type { Metadata } from "next";
import { SectionPage, sectionPageMetadata } from "@/components/site/section-views";
import { getPages } from "@/lib/queries";

export async function generateStaticParams() {
  const pages = await getPages("sortir-et-decouvrir");
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps<"/sortir-et-decouvrir/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return sectionPageMetadata("sortir-et-decouvrir", slug);
}

export default async function Page({ params }: PageProps<"/sortir-et-decouvrir/[slug]">) {
  const { slug } = await params;
  return <SectionPage section="sortir-et-decouvrir" slug={slug} />;
}
