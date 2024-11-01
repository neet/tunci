import clsx from "clsx";
import { getTranslations } from "next-intl/server";
import { FC } from "react";

import { Link } from "@/i18n/routing";

import { Logo } from "./Logo";

export const Banner: FC = async () => {
  const t = await getTranslations("components.Banner");

  return (
    <header
      className={clsx(
        "sticky top-0",
        "backdrop-blur",
        "bg-white/80",
        "dark:bg-black/80",
        "shadow-sm",
        "dark:shadow-none dark:border-b dark:border-zinc-600",
        "z-50",
      )}
    >
      <div
        className={clsx(
          "flex",
          "box-border",
          "items-center",
          "p-4",
          "max-w-screen-xl mx-auto",
        )}
      >
        <div className="flex flex-1 items-center gap-2.5">
          <Logo className="size-7" />
          <Link href="/">
            <h1 className="text-3xl hover:underline font-yeseva text-black dark:text-white">
              tunci
            </h1>
          </Link>
        </div>

        <Link
          href="/about"
          className="text-indigo-600 dark:text-indigo-400 underline"
        >
          {t("about")}
        </Link>
      </div>
    </header>
  );
};
