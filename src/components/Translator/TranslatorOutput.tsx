import clsx from "clsx";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { useFormStatus } from "react-dom";
import { BsCopy } from "react-icons/bs";

import { Transcription } from "@/app/[locale]/actions";

import { TranslatorText } from "./TranslatorText";
import { TranslatorTranscription } from "./TranslatorTranscription";

export type TranslatorOutputProps = {
  value?: string;
  className?: string;
  transcription?: Transcription;
  onCopy?: () => void;
};

export const TranslatorOutput: FC<TranslatorOutputProps> = (props) => {
  const { value, transcription, className, onCopy } = props;

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
      <div
        role="status"
        className={clsx("p-3", "text-xl", "min-h-[5lh] w-full lg:min-h-[7lh]")}
      >
        <TranslatorText>{value}</TranslatorText>
      </div>

      <div
        className={clsx(
          "flex justify-between items-end gap-2",
          "w-full px-3 pb-3",
          pending && "invisible",
        )}
      >
        <div className="flex-1">
          {transcription && <TranslatorTranscription value={transcription} />}
        </div>

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
