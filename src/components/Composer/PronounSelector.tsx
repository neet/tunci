import { useTranslations } from "next-intl";
import { FC } from "react";

import { Select } from "../Select";

export type PronounSelectorProps = {
  defaultValue?: string;
};

export const PronounSelector: FC<PronounSelectorProps> = (props) => {
  const { defaultValue } = props;
  const t = useTranslations("components.PronounSelector");

  return (
    <Select label={t("vocaburary")} name="pronoun" defaultValue={defaultValue}>
      <option value="first">{t("conversation")}</option>
      <option value="fourth">{t("story")}</option>
    </Select>
  );
};
