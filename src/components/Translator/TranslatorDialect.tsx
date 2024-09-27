import { useTranslations } from "next-intl";
import { FC } from "react";

import { Select } from "../Select";

export type TranslatorDialectProps = {
  defaultValue?: string;
};

export const TranslatorDialect: FC<TranslatorDialectProps> = (props) => {
  const { defaultValue } = props;
  const t = useTranslations("components.TranslatorDialect");

  return (
    <Select
      label={t("dialect")}
      name="dialect"
      className="max-w-[64px]"
      defaultValue={defaultValue}
    >
      <optgroup label={t("southwestHokkaido")}>
        <option value="沙流">{t("saru")}</option>
        <option value="千歳">{t("chitose")}</option>
        <option value="鵡川">{t("mukawa")}</option>
        <option value="幌別">{t("horobetsu")}</option>
      </optgroup>

      <optgroup label={t("northeastHokkaido")}>
        <option value="静内">{t("shizunai")}</option>
        <option value="十勝">{t("tokachi")}</option>
        <option value="釧路">{t("kushiro")}</option>
        <option value="様似">{t("samani")}</option>
        <option value="美幌">{t("bihoro")}</option>
        <option value="石狩">{t("ishikari")}</option>
        <option value="阿寒">{t("akan")}</option>
      </optgroup>
    </Select>
  );
};
