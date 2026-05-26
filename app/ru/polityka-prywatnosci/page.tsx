import { legalMetadata, LocalizedLegalPage } from "@/app/localized-routes";

export const metadata = legalMetadata("ru", "polityka_prywatnosci", "/polityka-prywatnosci");

export default function RussianPrivacyPolicyPage() {
  return <LocalizedLegalPage pageKey="polityka_prywatnosci" />;
}
