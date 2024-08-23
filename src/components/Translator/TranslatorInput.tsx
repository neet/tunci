import clsx from "clsx";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { BsClipboard } from "react-icons/bs";

import { Transcription } from "@/app/[locale]/actions";

import { TranslatorTranscription } from "./TranslatorTranscription";

export type TranslatorInputProps = {
  error?: string;
  transcription?: Transcription;
  handlePaste: () => void | Promise<void>;
};

export const TranslatorInput: FC<TranslatorInputProps> = (props) => {
  const { error, transcription, handlePaste } = props;

  const t = useTranslations("components.Translator");

  return (
    <div
      className={clsx(
        "rounded-lg",
        "overflow-clip",
        "border bg-white border-zinc-300",
        "dark:bg-black dark:border-zinc-600",
        "outline-blue-400 outline-2 focus-within:outline outline-offset-4",
        "forced-colors:outline-[Highlight]",
      )}
    >
      <label className="sr-only" htmlFor="text">
        {t("prompt")}
      </label>

      <textarea
        id="text"
        name="text"
        className={clsx(
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
      />

      <div
        className={clsx("flex justify-between items-end gap-2", "px-3 pb-3")}
      >
        <div className="flex-1">
          {transcription && <TranslatorTranscription value={transcription} />}
        </div>

        <div className="-mx-3 -mb-3">
          <button
            className={clsx(
              "p-2 rounded-full",
              "text-zinc-600 dark:text-zinc-400",
              "hover:bg-zinc-200 dark:hover:bg-zinc-800",
              "transition",
            )}
            type="button"
            aria-label={t("paste")}
            onClick={handlePaste}
          >
            <BsClipboard className="size-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
};
