import clsx from "clsx";
import { useTranslations } from "next-intl";
import { ChangeEventHandler, FC, ReactNode } from "react";

import { LanguageSelectorOption } from "./LanguageSelectorOption";

type LanguageSelectorProps = {
  name: string;
  value: string;
  legend: ReactNode;
  className?: string;
  defaultValue?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const LanguageSelector: FC<LanguageSelectorProps> = (props) => {
  const { name, value, legend, defaultValue, className, onChange } = props;

  const t = useTranslations("components.LanguageSelector");

  return (
    <fieldset
      className={clsx(
        "flex gap-2 p-4 border-b border-gray-100 dark:border-zinc-700",
        className,
      )}
    >
      <legend className="sr-only">{legend}</legend>

      <LanguageSelectorOption
        name={name}
        value="ja"
        checked={value === "ja"}
        defaultChecked={defaultValue === "ja"}
        onChange={onChange}
      >
        {t("japanese")}
      </LanguageSelectorOption>

      <LanguageSelectorOption
        name={name}
        value="ain"
        checked={value === "ain"}
        defaultChecked={defaultValue === "ain"}
        onChange={onChange}
      >
        {t("ainu")}
      </LanguageSelectorOption>
    </fieldset>
  );
};
