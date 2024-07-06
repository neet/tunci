import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";
import { Roboto, Yeseva_One } from "next/font/google";
import { Banner } from "../components/Banner";
import { ContentInfo } from "../components/ContentInfo";

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
  title: "Tunci - アイヌ語翻訳",
  description: "ニューラル機械翻訳によるアイヌ語翻訳ツール",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={clsx(roboto.variable, yesevaOne.variable)}>
      <body
        className={clsx(
          "flex flex-col",
          "px-3 box-border",
          "text-black bg-zinc-50 heropattern-banknote-zinc-100",
          "dark:text-white dark:bg-zinc-900 dark:heropattern-banknote-zinc-950",
          "antialiased"
        )}
      >
        <Banner />

        {children}

        <ContentInfo />
      </body>
    </html>
  );
}
