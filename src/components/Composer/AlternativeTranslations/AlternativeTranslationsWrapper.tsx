import { useTranslations } from "next-intl";
import { FC, ReactNode } from "react";

import { ComposerCollapsible } from "../ComposerCollapsible";

export type AlternativeTranslationsWrapperProps = {
  children: ReactNode;
};

export const AlternativeTranslationsWrapper: FC<
  AlternativeTranslationsWrapperProps
> = (props) => {
  const t = useTranslations(
    "components.Composer.AlternativeTranslations.AlternativeTranslationsWrapper",
  );

  return (
    <ComposerCollapsible title={t("title")}>
      {props.children}
    </ComposerCollapsible>
  );
};
