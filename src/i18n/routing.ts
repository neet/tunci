import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ain", "ja"],
  defaultLocale: "ain",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
