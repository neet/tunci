import { ClipboardIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { FC, MouseEventHandler, ReactNode } from "react";

import { TranslatorTranslationText } from "./TranslatorTranslationText";

export type TranslatorTranslationProps = {
  children: ReactNode;
  bridged: boolean;
  className?: string;
  onCopy?: () => void;
};

export const TranslatorTranslation: FC<TranslatorTranslationProps> = (
  props,
) => {
  const { children, className, onCopy } = props;

  const handleCopy: MouseEventHandler = () => {
    onCopy?.();
  };

  return (
    <div className={clsx("relative", className)}>
      <div
        role="status"
        className={clsx(
          "w-full min-h-48 md:min-h-64 lg:h-full",
          "p-3 rounded-lg",
          "text-xl",
          "bg-zinc-100 border-zinc-300 border",
          "dark:bg-zinc-900 dark:border-zinc-600",
        )}
      >
        <TranslatorTranslationText>{children}</TranslatorTranslationText>
      </div>

      <div className="absolute bottom-0 right-0 m-1 flex gap-2 items-center">
        <p className="text-sm text-zinc-500">
          {props.bridged && "DeppLを介した翻訳を表示中"}
        </p>

        <button
          type="button"
          className={clsx(
            "p-2 rounded-full",
            "text-zinc-600 dark:text-zinc-400",
            "hover:bg-zinc-200 dark:hover:bg-zinc-800",
            "transition",
          )}
          aria-label="クリップボードにコピー"
          onClick={handleCopy}
        >
          <ClipboardIcon className="size-6" aria-hidden />
        </button>
      </div>
    </div>
  );
};
