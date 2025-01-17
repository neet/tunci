import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC } from "react";

export const Disclaimer: FC = () => {
  const t = useTranslations("components.Composer.Disclaimer");
  return (
    <Callout.Root>
      <Callout.Icon>
        <ExclamationTriangleIcon aria-label={t("title")} />
      </Callout.Icon>
      <Callout.Text>{t("disclaimer")}</Callout.Text>
    </Callout.Root>
  );
};
