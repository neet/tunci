import clsx from "clsx";
import { useTranslations } from "next-intl";
import { ChangeEventHandler, FC, ReactNode } from "react";

import { LanguageSelectorOption } from "./LanguageSelectorOption";

type LanguageSelectorProps = {
  name: string;
  value: string;
  legend: ReactNode;
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const LanguageSelector: FC<LanguageSelectorProps> = (props) => {
  const { name, value, legend, className, onChange } = props;

  const t = useTranslations("components.LanguageSelector");

  return (
    <fieldset
      className={clsx(
        "flex gap-2 p-4 border-b border-gray-300 dark:border-zinc-600",
        className,
      )}
    >
      <legend className="sr-only">{legend}</legend>

      <LanguageSelectorOption
        name={name}
        value="ja"
        checked={value === "ja"}
        onChange={onChange}
      >
        {t("japanese")}
      </LanguageSelectorOption>

      <LanguageSelectorOption
        name={name}
        value="ain"
        checked={value === "ain"}
        onChange={onChange}
      >
        {t("ainu")}
      </LanguageSelectorOption>
    </fieldset>
  );
};
