import { useTranslations } from "next-intl";
import { FC, ReactNode } from "react";

import { ComposerCollapsible } from "../ComposerCollapsible";

export type ExampleSentencesWrapperProps = {
  children: ReactNode;
};

export const ExampleSentencesWrapper: FC<ExampleSentencesWrapperProps> = (
  props,
) => {
  const { children } = props;

  const t = useTranslations(
    "components.Composer.ExampleSentences.ExampleSentencesWrapper",
  );

  return (
    <ComposerCollapsible title={t("title")}>{children}</ComposerCollapsible>
  );
};
