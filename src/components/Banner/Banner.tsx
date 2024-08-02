import { InformationCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { getTranslations } from "next-intl/server";
import { FC } from "react";

import { Link } from "@/navigation";

export const Banner: FC = async () => {
  const t = await getTranslations();

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
        className="text-violet-600 dark:text-violet-400 underline"
      >
        <InformationCircleIcon className="size-5 mr-0.5 inline-block" />
        {t("Banner.about")}
      </Link>
    </header>
  );
};
