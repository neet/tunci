import { useTranslations } from "next-intl";
import { FC } from "react";

export type TranslatorTextProps = {
  pending: boolean;
  children?: string | null;
};

export const TranslatorText: FC<TranslatorTextProps> = (props) => {
  const { pending, children } = props;

  const t = useTranslations("components.TranslatorText");

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
