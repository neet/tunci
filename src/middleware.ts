import createMiddleware from "next-intl/middleware";

import { locales } from "./i18n";

export default createMiddleware({
  locales,
  defaultLocale: "ain",
});

export const config = {
  matcher: ["/", "/(ain|ja)/:path*"],
};
