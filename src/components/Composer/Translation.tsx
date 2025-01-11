import { Text } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC } from "react";

export type TranslationProps = {
  value?: string;
  pending: boolean;
};

export const Translation: FC<TranslationProps> = (props) => {
  const { value, pending } = props;

  const t = useTranslations("components.Composer.Translation");

  if (pending) {
    return <Text color="gray">{t("loading")}</Text>;
  }

  if (!value) {
    return <Text color="gray">{t("empty")}</Text>;
  }

  return value;
};
