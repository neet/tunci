import { FC } from "react";
import { useTranslations } from "use-intl";

import { AdvancedSettingsSection } from "../AdvancedSettingsSection";
import { PronounSelectorOption } from "./PronounSelectorOption";

export type PronounSelectorProps = {
  defaultValue?: string;
};

export const PronounSelector: FC<PronounSelectorProps> = (props) => {
  const { defaultValue } = props;

  const t = useTranslations("components.Composer.PronounSelector");

  return (
    <AdvancedSettingsSection legend={t("title")} description={t("description")}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        <PronounSelectorOption
          value="first"
          title={t("first")}
          description={t("first_description")}
          defaultChecked={defaultValue === "first"}
          className="col-span-1"
        />

        <PronounSelectorOption
          value="fourth"
          title={t("fourth")}
          description={t("fourth_description")}
          defaultChecked={defaultValue === "fourth"}
          className="col-span-1"
        />
      </div>
    </AdvancedSettingsSection>
  );
};
