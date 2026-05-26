import { legalMetadata, LocalizedLegalPage } from "@/app/localized-routes";

export const metadata = legalMetadata("ru", "regulamin", "/regulamin");

export default function RussianTermsPage() {
  return <LocalizedLegalPage pageKey="regulamin" />;
}
