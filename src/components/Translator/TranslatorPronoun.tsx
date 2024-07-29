import { useTranslations } from "next-intl";
import { FC } from "react";

import { Select } from "../Select";

export const TranslatorPronoun: FC = () => {
  const t = useTranslations("TranslatorPronoun");

  return (
    <Select label={t("vocaburary")} name="pronoun">
      <option value="first">{t("conversation")}</option>
      <option value="fourth">{t("story")}</option>
    </Select>
  );
};
