import clsx from "clsx";
import { FC } from "react";

import { Transcription } from "@/app/[locale]/actions";

export type TranslatorTranscriptionProps = {
  value: Transcription;
  className?: string;
};

export const TranslatorTranscription: FC<TranslatorTranscriptionProps> = (
  props,
) => {
  const { value, className } = props;
  const { type, text } = value;

  return (
    <div className={clsx(className)}>
      <span className="sr-only">{type === "kana" ? "カナ" : "ローマ字"}</span>
      <div className="flex-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-1">
        {text}
      </div>
    </div>
  );
};
