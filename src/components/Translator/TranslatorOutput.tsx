import clsx from "clsx";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { useFormStatus } from "react-dom";
import { BsCopy } from "react-icons/bs";

import { TranslatorText } from "./TranslatorText";

export type TranslatorOutputProps = {
  value?: string;
  alt?: string;
  className?: string;
  onCopy?: () => void;
};

export const TranslatorOutput: FC<TranslatorOutputProps> = (props) => {
  const { value, alt, className, onCopy } = props;

  const t = useTranslations("components.Translator");
  const { pending } = useFormStatus();

  return (
    <div
      className={clsx(
        "rounded-lg",
        "bg-zinc-100 border-zinc-300 border",
        "dark:bg-zinc-900 dark:border-zinc-600",
        className,
      )}
    >
      <div className={clsx("p-3", "text-xl", "min-h-[5lh] w-full")}>
        <TranslatorText>{value}</TranslatorText>
      </div>

      <div
        className={clsx(
          "flex justify-between items-end gap-2",
          "w-full px-3 pb-3",
          pending && "invisible",
        )}
      >
        <p className="text-zinc-500 text-sm">{alt}</p>

        <div className={clsx("-mx-3 -mb-3")}>
          <button
            className={clsx(
              "p-2 rounded-full",
              "text-zinc-600 dark:text-zinc-400",
              "hover:bg-zinc-200 dark:hover:bg-zinc-800",
              "transition",
            )}
            type="button"
            aria-label={t("copy")}
            onClick={onCopy}
          >
            <BsCopy className="size-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
};
