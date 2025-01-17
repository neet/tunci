import { Box, Text } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC, use } from "react";

import { AlternativeTranslationsWrapper } from "./AlternativeTranslationsWrapper";

export type AlternativeTranslationsContentProps = {
  alternativeTranslationsPromise: Promise<string[]>;
};

export const AlternativeTranslationsContent: FC<
  AlternativeTranslationsContentProps
> = (props) => {
  const { alternativeTranslationsPromise } = props;

  const alternativeTranslations = use(alternativeTranslationsPromise);
  const t = useTranslations(
    "components.Composer.AlternativeTranslations.AlternativeTranslationsContent",
  );

  if (alternativeTranslations.length <= 0) {
    return null;
  }

  return (
    <AlternativeTranslationsWrapper>
      <Text as="p" color="gray">
        {t("description")}
      </Text>

      <Box asChild my="2" className="AlternativeTranslationsContent">
        <ul>
          {alternativeTranslations.map((alternativeTranslation, index) => (
            <li key={index}>{alternativeTranslation}</li>
          ))}
        </ul>
      </Box>
    </AlternativeTranslationsWrapper>
  );
};
