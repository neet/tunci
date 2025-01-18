import "./globals.css";
import "@radix-ui/themes/styles.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Grid, Theme } from "@radix-ui/themes";
import clsx from "clsx";
import type { Metadata } from "next";
import { Roboto, Yeseva_One } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";

import { routing } from "@/i18n/routing";

import { Banner } from "../../components/Banner";
import { ContentInfo } from "../../components/ContentInfo";
import { Mixpanel } from "./_mixpanel";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-roboto",
  display: "swap",
});

const yesevaOne = Yeseva_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-yeseva-one",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL("https://tunci.aynu.io"),
  title: {
    template: "%s | tunci",
    default: "tunci",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    images: "/cover.png",
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function RootLayout(props: RootLayoutProps) {
  const { children } = props;
  const { locale } = await props.params;

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={clsx(roboto.variable, yesevaOne.variable)}
      // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class">
          <Theme accentColor="iris">
            <NextIntlClientProvider messages={messages}>
              <Grid columns="100%" rows="auto 1fr auto" minHeight="100vh">
                <Banner />
                {children}
                <ContentInfo />
              </Grid>
            </NextIntlClientProvider>
          </Theme>
        </ThemeProvider>
      </body>

      <GoogleAnalytics gaId="G-XZXN0DQWT7" />
      <Mixpanel token="c4e076ff3ac1a7b9f1322efe06874e84" />
    </html>
  );
}
