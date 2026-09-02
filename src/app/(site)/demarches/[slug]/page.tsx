import type { Metadata } from "next";
import { SectionPage, sectionPageMetadata } from "@/components/site/section-views";
import { getPages } from "@/lib/queries";

export async function generateStaticParams() {
  const pages = await getPages("demarches");
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps<"/demarches/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return sectionPageMetadata("demarches", slug);
}

export default async function Page({ params }: PageProps<"/demarches/[slug]">) {
  const { slug } = await params;
  return <SectionPage section="demarches" slug={slug} />;
}
