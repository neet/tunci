import { useTranslations } from "next-intl";
import { FC, ReactNode } from "react";
import { MdLightbulbOutline } from "react-icons/md";

export type HintProps = {
  children: ReactNode;
};

export const Hint: FC<HintProps> = (props) => {
  const t = useTranslations();
  return (
    <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-zinc-400">
      <MdLightbulbOutline className="size-4" aria-label={t("hint")} />

      <p className="leading-none">{props.children}</p>
    </div>
  );
};
