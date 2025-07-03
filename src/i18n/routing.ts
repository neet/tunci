import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ain-Latn", "ain-Kana", "jpn"] as string[],
  defaultLocale: "ain-Latn",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
