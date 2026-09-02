import type { Metadata } from "next";
import { SectionIndex } from "@/components/site/section-views";
import { SECTION_BY_KEY } from "@/lib/navigation";

const meta = SECTION_BY_KEY["sortir-et-decouvrir"];

export const metadata: Metadata = {
  title: meta.label,
  description: meta.description,
};

export default function Page() {
  return <SectionIndex section="sortir-et-decouvrir" />;
}
