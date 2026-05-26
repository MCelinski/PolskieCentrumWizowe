import { legalMetadata, LocalizedLegalPage } from "@/app/localized-routes";

export const metadata = legalMetadata("en", "regulamin", "/regulamin");

export default function EnglishTermsPage() {
  return <LocalizedLegalPage pageKey="regulamin" />;
}
