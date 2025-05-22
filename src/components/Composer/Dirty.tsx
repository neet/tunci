import { Text } from "@radix-ui/themes";
import { useTranslations } from "next-intl";

export const Dirty = () => {
  const t = useTranslations("components.Composer.Dirty");

  return (
    <Text color="gray" as="p" size="2" truncate>
      {t("untranslated")}
    </Text>
  );
};
