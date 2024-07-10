import type { Metadata } from "next";
import React from "react";
import { Decorator } from "@storybook/react";
import { Roboto, Yeseva_One } from "next/font/google";
import clsx from "clsx";

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

export const withFonts: Decorator = (Story) => {
  return (
    <div className={clsx(roboto.variable, yesevaOne.variable, "font-sans")}>
      <Story />
    </div>
  );
};
