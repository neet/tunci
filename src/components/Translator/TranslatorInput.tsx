import clsx from "clsx";
import { useTranslations } from "next-intl";
import { ChangeEventHandler, FC, useState } from "react";
import { FiClipboard, FiMic, FiVolume2 } from "react-icons/fi";

import { Transcription } from "@/models/transcription";

import { IconButton } from "./IconButton";
import { TranslatorTranscription } from "./TranslatorTranscription";

export type TranslatorInputProps = {
  className?: string;
  defaultValue?: string;
  error?: string;
  transcription?: Transcription;
  onPaste: () => void | Promise<void>;
  onRecognize: () => void | Promise<void>;
  onPlay: () => void | Promise<void>;
};

export const TranslatorInput: FC<TranslatorInputProps> = (props) => {
  const {
    className,
    defaultValue,
    error,
    transcription,
    onPaste,
    onRecognize,
    onPlay,
  } = props;

  const [value, setValue] = useState(defaultValue ?? "");
  const t = useTranslations("components.Translator");
  const dirty = value.trim() !== "";

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setValue(text);
    onPaste();
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setValue(event.target.value);
  };

  return (
    <div
      className={clsx(
        "flex flex-col",
        "rounded-lg",
        "overflow-clip",
        "border bg-white border-zinc-300",
        "dark:bg-black dark:border-zinc-600",
        "outline-blue-400 outline-2 focus-within:outline outline-offset-4",
        "forced-colors:outline-[Highlight]",
        className,
      )}
    >
      <label className="sr-only" htmlFor="text">
        {t("prompt")}
      </label>

      <textarea
        id="text"
        name="text"
        className={clsx(
          "flex-1",
          "block",
          "min-h-[5lh] w-full lg:min-h-[6lh]",
          "p-3",
          "text-xl",
          "bg-transparent",
          "outline-none resize-none",
          "forced-colors:outline-0",
        )}
        value={value}
        required
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        aria-invalid={error != null}
        aria-errormessage="error-message"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        style={{ fieldSizing: "content" } as any}
        onChange={handleChange}
      />

      <div>
        {transcription && (
          <TranslatorTranscription value={transcription} className="mx-3" />
        )}

        <div className="flex p-1">
          <div className="flex justify-start flex-1 gap-1">
            <IconButton aria-label={t("recognize")} onClick={onRecognize}>
              <FiMic className="size-5" aria-hidden />
            </IconButton>

            {dirty && (
              <IconButton aria-label={t("play")} onClick={onPlay}>
                <FiVolume2 className="size-5" aria-hidden />
              </IconButton>
            )}
          </div>

          <div className="flex jsutify-end items-center gap-1">
            <div
              className={clsx(
                "tabular-nums text-sm leading-none",
                value.length > 200
                  ? "text-red-600 dark:text-red-400"
                  : "text-zinc-600 dark:text-zinc-400",
              )}
            >
              {value.length}/200
            </div>

            <IconButton aria-label={t("paste")} onClick={handlePaste}>
              <FiClipboard className="size-5" aria-hidden />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};
