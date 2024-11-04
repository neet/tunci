import { useTranslations } from "next-intl";
import { FC, ReactNode } from "react";
import { MdLightbulbOutline } from "react-icons/md";

export type HintProps = {
  children: ReactNode;
};

export const Hint: FC<HintProps> = (props) => {
  const t = useTranslations("components.Composer");
  return (
    <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-zinc-400">
      <MdLightbulbOutline
        className="shrink-0 size-4"
        aria-label={t("hint.title")}
      />
      <p className="leading-relaxed">{props.children}</p>
    </div>
  );
};
