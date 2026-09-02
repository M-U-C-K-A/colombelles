import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/site/legal-page";

export async function generateMetadata(): Promise<Metadata> {
  return legalMetadata("donnees-personnelles");
}

export default function Page() {
  return <LegalPage slug="donnees-personnelles" />;
}
