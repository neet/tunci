import { useTranslations } from "next-intl";
import { FC } from "react";

import { Disclosure } from "../Disclosure";

export type ExampleSentencesWrapperProps = {
  children: React.ReactNode;
};

export const ExampleSentencesWrapper: FC<ExampleSentencesWrapperProps> = (
  props,
) => {
  const { children } = props;
  const t = useTranslations("components.ExampleSentences");

  return (
    <Disclosure open={true} summary={<h3>{t("exampleSentences")}</h3>}>
      {children}
    </Disclosure>
  );
};
