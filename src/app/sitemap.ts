import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://tunci.aynu.io/ja",
      lastModified: new Date(),
      alternates: {
        languages: {
          // ain: "https://tunci.aynu.io/ain",
        },
      },
    },
    {
      url: "https://tunci.aynu.io/ja/about",
      lastModified: new Date(),
      alternates: {
        languages: {
          // ain: "https://tunci.aynu.io/ain/about",
        },
      },
    },
  ];
}
