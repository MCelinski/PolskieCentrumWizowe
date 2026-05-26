import { legalMetadata, LocalizedLegalPage } from "@/app/localized-routes";

export const metadata = legalMetadata("ua", "regulamin", "/regulamin");

export default function UkrainianTermsPage() {
  return <LocalizedLegalPage pageKey="regulamin" />;
}
