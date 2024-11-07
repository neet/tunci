import { useTranslations } from "next-intl";
import { FC } from "react";
import { FiAlertCircle } from "react-icons/fi";

export const Disclaimer: FC = () => {
  const t = useTranslations("components.Composer.Disclaimer");
  return (
    <div className="flex items-center gap-2 p-4">
      <FiAlertCircle className="shrink-0 inline-block size-6 text-gray-400 dark:text-zinc-600" />
      <p className="leading-relaxed text-sm text-gray-600 dark:text-zinc-400">
        {t("disclaimer")}
      </p>
    </div>
  );
};
