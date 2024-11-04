import clsx from "clsx";
import { FC, useState } from "react";
import { useTranslations } from "use-intl";

import { AdvancedSettingsSection } from "../AdvancedSettingsSection";
import { DialectSelectorMap } from "./DialectSelectorMap";
import { DialectSelectorOption } from "./DialectSelectorOption";

export type DialectSelectorProps = {
  defaultValue?: string;
};

export const DialectSelector: FC<DialectSelectorProps> = (props) => {
  const [value, setValue] = useState<string | undefined>(props.defaultValue);

  const t = useTranslations("components.Composer.DialectSelector");

  const dialects = [
    {
      value: "沙流",
      name: t("saru"),
    },
    {
      value: "千歳",
      name: t("chitose"),
    },
    {
      value: "幌別",
      name: t("horobetsu"),
    },
    {
      value: "静内",
      name: t("shizunai"),
    },
    {
      value: "様似",
      name: t("samani"),
    },
    {
      value: "十勝",
      name: t("tokachi"),
    },
    {
      value: "釧路",
      name: t("kushiro"),
    },
    {
      value: "美幌",
      name: t("bihoro"),
    },
    {
      value: "石狩",
      name: t("ishikari"),
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
          <DialectSelectorMap value={value} onChange={setValue} />
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
