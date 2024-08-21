import clsx from "clsx";
import { FC } from "react";

import { Transcription } from "@/app/[locale]/actions";

import { Badge } from "../Badge";

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
    <div className={clsx("flex gap-2 items-center", className)}>
      <Badge className="shrink-0">{type === "kana" ? "カナ" : "ABC"}</Badge>
      <div className="flex-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-1">
        {text}
      </div>
    </div>
  );
};
