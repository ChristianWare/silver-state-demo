import type { MetadataRoute } from "next";
import { servicesData } from "@/lib/services";
import { serviceAreaCities } from "@/lib/cities";
import { routesData } from "@/lib/routes";
import { fleetData } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/config/site";

type Entry = MetadataRoute.Sitemap[number];

const STATIC = [
  "",
  "/about",
  "/services",
  "/fleet",
  "/airports",
  "/locations",
  "/routes",
  "/corporate-accounts",
  "/contact",
  "/blog",
  "/book",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (
    path: string,
    priority: number,
    changeFrequency: Entry["changeFrequency"] = "monthly",
  ): Entry => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    ...STATIC.map((p) => page(p, p === "" ? 1 : 0.7)),
    ...servicesData.map((s) => page(`/services/${s.slug}`, 0.8)),
    ...fleetData.map((v) => page(`/fleet/${v.slug}`, 0.6)),
    ...serviceAreaCities.map((c) => page(`/locations/${c.slug}`, 0.7)),
    ...routesData.map((r) => page(`/routes/${r.slug}`, 0.7)),
    ...getAllPosts().map((p) => ({
      url: `${SITE.url}/blog/${p.slug.current}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
