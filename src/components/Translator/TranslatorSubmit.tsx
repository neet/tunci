import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

import { Button } from "../Button";

export const TranslatorSubmit = () => {
  const { pending } = useFormStatus();

  const t = useTranslations("components.TranslatorSubmit");

  return (
    <Button type="submit" disabled={pending}>
      {t("translate")}
    </Button>
  );
};
