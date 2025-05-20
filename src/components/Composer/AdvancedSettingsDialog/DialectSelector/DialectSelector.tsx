import { Box, Flex, Grid, RadioGroup, Text, Tooltip } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { IoFlask } from "react-icons/io5";

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

      <Grid
        columns={{ initial: "1", md: "4" }}
        mt="2"
        // justify={{ initial: "start", md: "end" }}
        asChild
      >
        <Box
          style={{
            borderRadius: "var(--radius-4)",
            backgroundColor: "var(--gray-1)",
            border: "1px solid var(--gray-5)",
          }}
        >
          <Box gridColumn={{ initial: "span 1", md: "span 3" }}>
            <DialectSelectorMap
              value={value}
              dialects={dialects}
              onChange={setValue}
            />
          </Box>

          <Flex
            m={{ initial: "4", md: "5" }}
            justify={{ initial: "start", md: "end" }}
            gridColumn={{ initial: "span 1", md: "span 1" }}
          >
            <RadioGroup.Root
              name="dialect"
              value={value}
              onValueChange={setValue}
            >
              {dialects.map((dialect) => (
                <RadioGroup.Item key={dialect.value} value={dialect.value}>
                  <Flex justify="between" gap="2">
                    <Text>{dialect.name}</Text>

                    {dialect.experimental && (
                      <Tooltip content={t("experimental")}>
                        <Text size="2" color="gray" tabIndex={0}>
                          <IoFlask title={t("experimental")} />
                        </Text>
                      </Tooltip>
                    )}
                  </Flex>
                </RadioGroup.Item>
              ))}
            </RadioGroup.Root>
          </Flex>
        </Box>
      </Grid>
    </fieldset>
  );
};
