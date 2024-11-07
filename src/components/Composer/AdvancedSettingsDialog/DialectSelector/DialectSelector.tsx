import clsx from "clsx";
import { FC, useState } from "react";
import { useTranslations } from "use-intl";

import { AdvancedSettingsSection } from "../AdvancedSettingsSection";
import { DialectSelectorMap } from "./DialectSelectorMap";
import { DialectSelectorOption } from "./DialectSelectorOption";
import { Dialect } from "./model";

export type DialectSelectorProps = {
  defaultValue?: string;
};

export const DialectSelector: FC<DialectSelectorProps> = (props) => {
  const [value, setValue] = useState<string | undefined>(props.defaultValue);

  const t = useTranslations("components.Composer.DialectSelector");

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
    <AdvancedSettingsSection legend={t("title")} description={t("description")}>
      <div
        className={clsx(
          "grid grid-cols-1 md:grid-cols-4",
          "border rounded overflow-clip divide-y md:divide-y-0 md:divide-x",
          "divide-gray-300 border-gray-300",
          "dark:divide-zinc-600 dark:border-zinc-600",
        )}
      >
        <div
          className={clsx(
            "col-span-1 md:col-span-3",
            "heropattern-banknote-gray-100 bg-gray-50",
            "dark:heropattern-banknote-zinc-950 dark:bg-zinc-900",
          )}
        >
          <DialectSelectorMap
            value={value}
            dialects={dialects}
            onChange={setValue}
          />
        </div>

        <div
          className={clsx(
            "col-span-1 divide-y",
            "divide-gray-300 border-gray-300",
            "dark:divide-zinc-600 dark:border-zinc-600",
          )}
        >
          {dialects.map((dialect) => (
            <DialectSelectorOption
              key={dialect.value}
              value={dialect.value}
              checked={dialect.value === value}
              experimental={dialect.experimental}
              onChange={setValue}
            >
              {dialect.name}
            </DialectSelectorOption>
          ))}
        </div>
      </div>
    </AdvancedSettingsSection>
  );
};
