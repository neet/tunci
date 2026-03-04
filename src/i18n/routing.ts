import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ain-Latn", "ain-Kana", "ja"] as string[],
  defaultLocale: "ain-Latn",

  // https://next-intl.dev/docs/routing/configuration#locale-cookie
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365,
  },
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
