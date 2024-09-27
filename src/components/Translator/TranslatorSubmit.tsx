import { useTranslations } from "next-intl";
import { FC } from "react";

import { Button } from "../Button";

export type TranslatorSubmitProps = {
  pending?: boolean;
};

export const TranslatorSubmit: FC<TranslatorSubmitProps> = (props) => {
  const { pending } = props;
  const t = useTranslations("components.TranslatorSubmit");

  return (
    <Button type="submit" disabled={pending}>
      {t("translate")}
    </Button>
  );
};
