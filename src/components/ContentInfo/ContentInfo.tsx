import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { FC } from "react";

export const ContentInfo: FC = async () => {
  const t = await getTranslations();
  const titleId = "contentinfo-title";

  return (
    <footer aria-labelledby={titleId} className="py-8">
      <h2 id={titleId} className="sr-only">
        {t("ContentInfo.title")}
      </h2>

      <ul className="mx-auto flex gap-4 flex-wrap justify-center">
        <li>
          <Link
            rel="alternate"
            href="/ain"
            hrefLang="ain"
            className="text-violet-600 dark:text-violet-400 underline "
          >
            aynu itak
          </Link>
        </li>

        <li>
          <Link
            rel="alternate"
            href="/ja"
            hrefLang="ja"
            className="text-violet-600 dark:text-violet-400 underline"
          >
            日本語
          </Link>
        </li>
      </ul>

      <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-center">
        Copyright
        <span className="mx-1.5" aria-hidden>
          ©
        </span>
        2024 Ryō Igarashi, All rights reserved.
      </p>
    </footer>
  );
};
