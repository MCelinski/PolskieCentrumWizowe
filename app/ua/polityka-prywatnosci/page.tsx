import { legalMetadata, LocalizedLegalPage } from "@/app/localized-routes";

export const metadata = legalMetadata("ua", "polityka_prywatnosci", "/polityka-prywatnosci");

export default function UkrainianPrivacyPolicyPage() {
  return <LocalizedLegalPage pageKey="polityka_prywatnosci" />;
}
