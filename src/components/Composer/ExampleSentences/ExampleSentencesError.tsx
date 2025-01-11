import { Text } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC } from "react";

import { ExampleSentencesWrapper } from "./ExampleSentencesWrapper";

export const ExampleSentencesError: FC = () => {
  const t = useTranslations(
    "components.Composer.ExampleSentences.ExampleSentencesError",
  );

  return (
    <ExampleSentencesWrapper>
      <Text as="p">{t("description")}</Text>
    </ExampleSentencesWrapper>
  );
};
