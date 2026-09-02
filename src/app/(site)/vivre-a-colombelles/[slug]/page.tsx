import type { Metadata } from "next";
import { SectionPage, sectionPageMetadata } from "@/components/site/section-views";
import { getPages } from "@/lib/queries";

export async function generateStaticParams() {
  const pages = await getPages("vivre-a-colombelles");
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps<"/vivre-a-colombelles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return sectionPageMetadata("vivre-a-colombelles", slug);
}

export default async function Page({ params }: PageProps<"/vivre-a-colombelles/[slug]">) {
  const { slug } = await params;
  return <SectionPage section="vivre-a-colombelles" slug={slug} />;
}
