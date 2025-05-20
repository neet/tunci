import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC } from "react";

export const Disclaimer: FC = () => {
  const t = useTranslations("components.Composer.Disclaimer");
  return (
    <Callout.Root>
      <Callout.Icon>
        <InfoCircledIcon aria-label={t("title")} />
      </Callout.Icon>

      <Callout.Text>
        {t.rich("disclaimer", {
          strong: (chunk) => <strong>{chunk}</strong>,
        })}
      </Callout.Text>
    </Callout.Root>
  );
};
