import clsx from "clsx";
import { getTranslations } from "next-intl/server";
import { FC } from "react";
import { FiInfo } from "react-icons/fi";

import { Link } from "@/i18n/routing";

export const Banner: FC = async () => {
  const t = await getTranslations("components.Banner");

  return (
    <header
      className={clsx(
        "w-full max-w-screen-xl mx-auto",
        "flex items-center justify-between",
        "mt-4",
      )}
    >
      <h1 className="font-serif text-4xl leading-relaxed">
        <Link href="/" className="text-black dark:text-white no-underline">
          tunci
        </Link>
      </h1>

      <Link
        href="/about"
        className="text-blue-600 dark:text-blue-400 underline"
      >
        <FiInfo className="size-4 mr-1 inline-block" aria-hidden />
        {t("about")}
      </Link>
    </header>
  );
};
