import { useTranslations } from "next-intl";
import { FC, ReactNode } from "react";

import { Disclosure } from "../Disclosure";

export type AlternativeTranslationsWrapperProps = {
  children: ReactNode;
};

export const AlternativeTranslationsWrapper: FC<
  AlternativeTranslationsWrapperProps
> = (props) => {
  const { children } = props;
  const t = useTranslations("components.Composer");

  return (
    <Disclosure open={true} summary={<h3>{t("alternativeTranslations")}</h3>}>
      {children}
    </Disclosure>
  );
};
