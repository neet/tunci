import clsx from "clsx";
import { getTranslations } from "next-intl/server";
import { FC } from "react";

import { Link } from "@/i18n/routing";

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
        "dark:shadow-none dark:border-b dark:border-zinc-700",
        "z-50",
      )}
    >
      <div
        className={clsx(
          "flex",
          "box-border",
          "p-4",
          "lg:max-w-screen-xl mx-auto",
        )}
      >
        <div className="flex flex-1">
          <Link href="/">
            <h1 className="text-lg font-bold hover:underline">アイヌ語翻訳</h1>
          </Link>
        </div>

        <div className="flex justify-end text-blue-600 dark:text-blue-400 underline">
          <Link href="/about">{t("about")}</Link>
        </div>
      </div>
    </header>
  );
};
