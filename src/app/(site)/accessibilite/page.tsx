import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/site/legal-page";

export async function generateMetadata(): Promise<Metadata> {
  return legalMetadata("accessibilite");
}

export default function Page() {
  return <LegalPage slug="accessibilite" />;
}
