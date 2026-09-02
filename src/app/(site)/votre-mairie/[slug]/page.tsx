import type { Metadata } from "next";
import { SectionPage, sectionPageMetadata } from "@/components/site/section-views";
import { getPages } from "@/lib/queries";

export async function generateStaticParams() {
  const pages = await getPages("votre-mairie");
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps<"/votre-mairie/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return sectionPageMetadata("votre-mairie", slug);
}

export default async function Page({ params }: PageProps<"/votre-mairie/[slug]">) {
  const { slug } = await params;
  return <SectionPage section="votre-mairie" slug={slug} />;
}
