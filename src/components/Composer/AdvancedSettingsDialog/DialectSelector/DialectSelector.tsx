import { Box, Text } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";

import { DialectSelectorMap } from "./DialectSelectorMap";
import { Dialect } from "./model";

export type DialectSelectorProps = {
  defaultValue?: string;
};

export const DialectSelector: FC<DialectSelectorProps> = (props) => {
  const [value, setValue] = useState<string | undefined>(props.defaultValue);

  const t = useTranslations(
    "components.Composer.AdvancedSettingsDialog.DialectSelector",
  );

  const dialects: Dialect[] = [
    {
      value: "沙流",
      name: t("saru"),
      coordinates: [142.0865, 42.6054],
    },
    {
      value: "千歳",
      name: t("chitose"),
      coordinates: [141.6738, 42.8194],
    },
    {
      value: "幌別",
      name: t("horobetsu"),
      coordinates: [141.1068, 42.4129],
    },
    {
      value: "静内",
      name: t("shizunai"),
      coordinates: [142.3647, 42.3321],
    },
    {
      value: "様似",
      name: t("samani"),
      experimental: true,
      coordinates: [142.9261, 42.1286],
    },
    {
      value: "十勝",
      name: t("tokachi"),
      experimental: true,
      coordinates: [143.1965, 42.9238],
    },
    {
      value: "釧路",
      name: t("kushiro"),
      experimental: true,
      coordinates: [144.3814, 42.9849],
    },
    {
      value: "美幌",
      name: t("bihoro"),
      experimental: true,
      coordinates: [144.1079, 43.8395],
    },
    {
      value: "石狩",
      name: t("ishikari"),
      experimental: true,
      coordinates: [142.3589, 43.7706],
    },
  ];

  return (
    <fieldset>
      <Text weight="bold" asChild>
        <legend>{t("title")}</legend>
      </Text>

      <Text as="p" mt="1" color="gray">
        {t("description")}
      </Text>

      <Box
        mt="2"
        style={{
          borderRadius: "var(--radius-4)",
          backgroundColor: "var(--gray-1)",
          border: "1px solid var(--gray-5)",
        }}
      >
        <DialectSelectorMap
          value={value}
          dialects={dialects}
          onChange={setValue}
        />
      </Box>
    </fieldset>
  );
};
