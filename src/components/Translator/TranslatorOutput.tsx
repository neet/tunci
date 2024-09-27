import clsx from "clsx";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { BsCopy, BsVolumeUp } from "react-icons/bs";

import { Transcription } from "@/app/[locale]/actions";

import { IconButton } from "./IconButton";
import { TranslatorText } from "./TranslatorText";
import { TranslatorTranscription } from "./TranslatorTranscription";

export type TranslatorOutputProps = {
  value?: string;
  className?: string;
  transcription?: Transcription;
  onCopy: () => void;
  onPlay: () => void;
};

export const TranslatorOutput: FC<TranslatorOutputProps> = (props) => {
  const { value, transcription, className, onCopy, onPlay } = props;

  const t = useTranslations("components.Translator");

  return (
    <div
      className={clsx(
        "flex flex-col",
        "rounded-lg",
        "bg-zinc-100 border-zinc-300 border",
        "dark:bg-zinc-900 dark:border-zinc-600",
        className,
      )}
    >
      <div
        role="status"
        className={clsx(
          "flex-1",
          "p-3",
          "text-xl",
          "min-h-[5lh] w-full lg:min-h-[7lh]",
        )}
      >
        <TranslatorText>{value}</TranslatorText>
      </div>

      <div className={clsx(!value && "invisible")}>
        {transcription && (
          <TranslatorTranscription value={transcription} className="mx-3" />
        )}

        <div className={clsx("flex p-1")}>
          <div className="flex justify-start flex-1">
            <IconButton aria-label={t("play")} onClick={onPlay}>
              <BsVolumeUp className="size-5" aria-hidden />
            </IconButton>
          </div>

          <IconButton aria-label={t("copy")} onClick={onCopy}>
            <BsCopy className="size-5" aria-hidden />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
