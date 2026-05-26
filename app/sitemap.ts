import type { MetadataRoute } from "next";
import { ROUTE_LANGS } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const paths = ["/", "/konsultacje/", "/regulamin/", "/polityka-prywatnosci/"];
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const polishUrls = paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
  }));

  const localizedUrls = ROUTE_LANGS.flatMap((lang) =>
    paths.map((path) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified,
    }))
  );

  return [...polishUrls, ...localizedUrls];
}
