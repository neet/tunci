import { Text } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC } from "react";

import { ErrorType } from "@/app/[locale]/_server";

export type TranslationProps = {
  pending: boolean;
  value?: string;
  error?: ErrorType;
};

export const Translation: FC<TranslationProps> = (props) => {
  const { value, error, pending } = props;

  const t = useTranslations("components.Composer.Translation");

  if (
    pending ||
    error === "ROMANIZE_SERVICE_UNAVAILABLE" ||
    error === "TRANSLATOR_SERVICE_UNAVAILABLE"
  ) {
    return <Text color="gray">{t("loading")}</Text>;
  }

  if (!value) {
    return <Text color="gray">{t("empty")}</Text>;
  }

  return value;
};
