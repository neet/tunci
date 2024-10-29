import clsx from "clsx";
import { useTranslations } from "next-intl";
import { FC } from "react";

export type CharCountProps = {
  count: number;
  limit: number;
};

export const CharCount: FC<CharCountProps> = (props) => {
  const { count, limit } = props;

  const t = useTranslations("components.Composer");

  return (
    <div
      className={clsx(
        "tabular-nums text-sm leading-none",
        count > limit
          ? "text-red-600 dark:text-red-400"
          : "text-gray-600 dark:text-zinc-400",
      )}
    >
      <span aria-hidden>
        {count}/{limit}
      </span>
      <span className="sr-only">
        {t("char_max", { current: count, max: 200 })}
      </span>
    </div>
  );
};
