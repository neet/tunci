import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import clsx from "clsx";
import type { Metadata } from "next";
import { Roboto, Yeseva_One } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";

import { Banner } from "../../components/Banner";
import { ContentInfo } from "../../components/ContentInfo";
import { Mixpanel } from "./_mixpanel";

const yesevaOne = Yeseva_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-yeseva-one",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-roboto",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    template: "%s | tunci",
    default: "tunci",
  },
  robots: {
    index: true,
    follow: true,
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default async function RootLayout(props: RootLayoutProps) {
  const {
    children,
    params: { locale },
  } = props;

  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={clsx(roboto.variable, yesevaOne.variable)}>
      <body
        className={clsx(
          "px-4 box-border",
          "text-black bg-zinc-50 heropattern-banknote-zinc-100",
          "dark:text-white dark:bg-zinc-900 dark:heropattern-banknote-zinc-950",
          "antialiased",
          "md:px-6",
          "grid grid-rows-[auto,1fr,auto] grid-cols-[100%] min-h-[100svh]",
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Banner />
          {children}
          <ContentInfo />
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId="G-XZXN0DQWT7" />
      <Mixpanel token="c4e076ff3ac1a7b9f1322efe06874e84" />
    </html>
  );
}
