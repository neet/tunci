import { useTranslations } from "next-intl";
import { FC } from "react";

import { Select } from "../Select";

export type TranslatorPronounProps = {
  defaultValue?: string;
};

export const TranslatorPronoun: FC<TranslatorPronounProps> = (props) => {
  const { defaultValue } = props;
  const t = useTranslations("components.TranslatorPronoun");

  return (
    <Select label={t("vocaburary")} name="pronoun" defaultValue={defaultValue}>
      <option value="first">{t("conversation")}</option>
      <option value="fourth">{t("story")}</option>
    </Select>
  );
};
