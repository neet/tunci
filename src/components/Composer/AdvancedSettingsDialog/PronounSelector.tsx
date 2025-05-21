import { Flex, RadioCards, Text } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC } from "react";

export type PronounSelectorProps = {
  defaultValue: string;
};

export const PronounSelector: FC<PronounSelectorProps> = (props) => {
  const t = useTranslations(
    "components.Composer.AdvancedSettingsDialog.PronounSelector",
  );

  return (
    <fieldset>
      <Text weight="bold" asChild>
        <legend>{t("title")}</legend>
      </Text>

      <Text as="p" color="gray" mt="1">
        {t("description")}
      </Text>

      <RadioCards.Root
        role="generic"
        mt="2"
        name="pronoun"
        defaultValue={props.defaultValue}
      >
        <RadioCards.Item value="first">
          <Flex direction="column" width="100%">
            <Text weight="bold">{t("first")}</Text>
            <Text>{t("firstDescription")}</Text>
          </Flex>
        </RadioCards.Item>

        <RadioCards.Item value="fourth">
          <Flex direction="column" width="100%">
            <Text weight="bold">{t("fourth")}</Text>
            <Text>{t("fourthDescription")}</Text>
          </Flex>
        </RadioCards.Item>
      </RadioCards.Root>
    </fieldset>
  );
};
