import { Text } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC } from "react";

import { AlternativeTranslationsWrapper } from "./AlternativeTranslationsWrapper";

export const AlternativeTranslationsError: FC = () => {
  const t = useTranslations(
    "components.Composer.AlternativeTranslations.AlternativeTranslationsError",
  );

  return (
    <AlternativeTranslationsWrapper>
      <Text as="p">{t("description")}</Text>
    </AlternativeTranslationsWrapper>
  );
};
