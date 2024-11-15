import { useTranslations } from "next-intl";
import { FC } from "react";
import { FiAlertCircle } from "react-icons/fi";

export const Disclaimer: FC = () => {
  const t = useTranslations("components.Composer.Disclaimer");
  return (
    <div className="flex items-top gap-2 p-4">
      <FiAlertCircle
        aria-label={t("title")}
        className="shrink-0 inline-block size-6 mt-1 text-gray-400 dark:text-zinc-600"
      />
      <p className="leading-relaxed text-gray-600 dark:text-zinc-400">
        {t("disclaimer")}
      </p>
    </div>
  );
};
