import clsx from "clsx";
import { useTranslations } from "next-intl";
import { ChangeEventHandler, FC, useState } from "react";
import { BsClipboard, BsMic, BsVolumeUp } from "react-icons/bs";

import { Transcription } from "@/app/[locale]/actions";

import { IconButton } from "./IconButton";
import { TranslatorTranscription } from "./TranslatorTranscription";

export type TranslatorInputProps = {
  className?: string;
  error?: string;
  transcription?: Transcription;
  onPaste: () => void | Promise<void>;
  onRecgonize: () => void | Promise<void>;
  onPlay: () => void | Promise<void>;
};

export const TranslatorInput: FC<TranslatorInputProps> = (props) => {
  const { className, error, transcription, onPaste, onRecgonize, onPlay } =
    props;

  const [value, setValue] = useState("");
  const t = useTranslations("components.Translator");
  const dirty = value.trim() !== "";

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
          "min-h-[5lh] w-full lg:min-h-[7lh]",
          "p-3",
          "text-xl",
          "bg-transparent",
          "outline-none resize-none",
          "forced-colors:outline-0",
        )}
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
          <div className="flex justify-start flex-1">
            <IconButton aria-label={t("recognize")} onClick={onRecgonize}>
              <BsMic className="size-5" aria-hidden />
            </IconButton>

            {dirty && (
              <IconButton aria-label={t("play")} onClick={onPlay}>
                <BsVolumeUp className="size-5" aria-hidden />
              </IconButton>
            )}
          </div>

          <div className="flex jsutify-end">
            <IconButton aria-label={t("paste")} onClick={onPaste}>
              <BsClipboard className="size-5" aria-hidden />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};
