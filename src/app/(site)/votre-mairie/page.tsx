import type { Metadata } from "next";
import { SectionIndex } from "@/components/site/section-views";
import { SECTION_BY_KEY } from "@/lib/navigation";

const meta = SECTION_BY_KEY["votre-mairie"];

export const metadata: Metadata = {
  title: meta.label,
  description: meta.description,
};

export default function Page() {
  return <SectionIndex section="votre-mairie" />;
}
