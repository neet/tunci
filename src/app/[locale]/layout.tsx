import "./globals.css";

import clsx from "clsx";
import type { Metadata } from "next";
import { Roboto, Yeseva_One } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { Banner } from "../../components/Banner";
import { ContentInfo } from "../../components/ContentInfo";

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

  const messages = await getMessages();

  return (
    <html lang={locale} className={clsx(roboto.variable, yesevaOne.variable)}>
      <body
        className={clsx(
          "flex flex-col",
          "px-4 box-border",
          "text-black bg-zinc-50 heropattern-banknote-zinc-100",
          "dark:text-white dark:bg-zinc-900 dark:heropattern-banknote-zinc-950",
          "antialiased",
          "md:px-6",
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Banner />
          {children}
          <ContentInfo />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
