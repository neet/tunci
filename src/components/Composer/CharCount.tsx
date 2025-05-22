import { Box, Text } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC } from "react";

export type CharCountProps = {
  count: number;
  limit: number;
};

export const CharCount: FC<CharCountProps> = (props) => {
  const { count, limit } = props;

  const t = useTranslations("components.Composer.CharCount");
  const remaining = limit - count;

  return (
    <Box px="2">
      {remaining >= 0 ? (
        <Text size="2" color="gray">
          {t("charLeft", { remaining })}
        </Text>
      ) : (
        <Text size="2" color="red">
          {t("charOver", { excess: Math.abs(remaining) })}
        </Text>
      )}
    </Box>
  );
};
