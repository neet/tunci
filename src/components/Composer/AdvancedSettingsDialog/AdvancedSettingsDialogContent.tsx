import { Box, Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC } from "react";

import { DialectSelector } from "./DialectSelector";
import { AdvancedSettings } from "./models";
import { PronounSelector } from "./PronounSelector";

export interface AdvancedSettingsDialogContentProps {
  defaultValues: AdvancedSettings;
}

export const AdvancedSettingsDialogContent: FC<
  AdvancedSettingsDialogContentProps
> = (props) => {
  const { defaultValues } = props;

  const t = useTranslations(
    "components.Composer.AdvancedSettingsDialog.AdvancedSettingsDialogContent",
  );

  return (
    <Flex direction="column" gap="4">
      <Box>
        <Dialog.Title>{t("title")}</Dialog.Title>
        <Dialog.Description>
          <Text color="gray">{t("description")}</Text>
        </Dialog.Description>
      </Box>

      <Flex direction="column" gap="3">
        <PronounSelector defaultValue={defaultValues.pronoun} />
        <DialectSelector defaultValue={defaultValues.dialect} />
      </Flex>

      <Flex gap="3" justify="end">
        <Dialog.Close>
          <Button type="button" variant="soft" color="gray">
            {t("close")}
          </Button>
        </Dialog.Close>
      </Flex>
    </Flex>
  );
};
