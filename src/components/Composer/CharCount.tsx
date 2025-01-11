import { Box, Text, VisuallyHidden } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC } from "react";

export type CharCountProps = {
  count: number;
  limit: number;
};

export const CharCount: FC<CharCountProps> = (props) => {
  const { count, limit } = props;

  const t = useTranslations("components.Composer.CharCount");

  return (
    <Box px="2">
      <VisuallyHidden>
        {t("charMax", { current: count, max: 200 })}
      </VisuallyHidden>

      <Text asChild size="2" color={count > limit ? "red" : "gray"}>
        <span aria-hidden>
          {count}/{limit}
        </span>
      </Text>
    </Box>
  );
};
