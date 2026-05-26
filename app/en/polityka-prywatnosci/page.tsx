import { legalMetadata, LocalizedLegalPage } from "@/app/localized-routes";

export const metadata = legalMetadata("en", "polityka_prywatnosci", "/polityka-prywatnosci");

export default function EnglishPrivacyPolicyPage() {
  return <LocalizedLegalPage pageKey="polityka_prywatnosci" />;
}
