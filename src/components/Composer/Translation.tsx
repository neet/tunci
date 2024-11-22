import { useTranslations } from "next-intl";
import { FC } from "react";

export type TranslationProps = {
  value?: string;
  pending: boolean;
};

export const Translation: FC<TranslationProps> = (props) => {
  const { value, pending } = props;

  const t = useTranslations("components.Composer");

  if (pending) {
    return (
      <span className="text-gray-600 dark:text-zinc-400">
        {t("translation.loading")}
      </span>
    );
  }

  if (!value) {
    return (
      <span className="text-gray-600 dark:text-zinc-400">
        {t("translation.empty")}
      </span>
    );
  }

  return value;
};
