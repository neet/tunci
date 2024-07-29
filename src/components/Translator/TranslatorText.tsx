import { useTranslations } from "next-intl";
import { FC } from "react";
import { useFormStatus } from "react-dom";

export type TranslatorTextProps = {
  children?: string | null;
};

export const TranslatorText: FC<TranslatorTextProps> = (props) => {
  const { children } = props;

  const { pending } = useFormStatus();
  const t = useTranslations("TranslatorText");

  if (pending) {
    return (
      <p className="text-zinc-500 dark:text-zinc-400">{t("translating")}</p>
    );
  }

  if (!children || children === "") {
    return <p className="text-zinc-500 dark:text-zinc-400">{t("ready")}</p>;
  }

  return <p>{children}</p>;
};
