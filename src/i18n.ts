import { getRequestConfig } from "next-intl/server";

import { routing } from "./i18n/routing";

// Can be imported from a shared config
export const locales = ["ain-Latn", "ain-Kana", "ja"];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  const messages = await import(`../messages/${requestLocale}.json`);

  return {
    locale,
    messages: messages.default,
  };
});
