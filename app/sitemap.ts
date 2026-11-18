import type { MetadataRoute } from "next";
import { SITE } from "@/components/talks-view";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE}/` }];
}
