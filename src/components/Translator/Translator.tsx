"use client";

import { Result } from "@/app/actions";
import { Radio } from "@/components/Radio";

import { FC, MouseEventHandler } from "react";
import { useFormState } from "react-dom";
import clsx from "clsx";

import { TranslatorText } from "./TranslatorText";
import { TranslatorSubmit } from "./TranslatorSubmit";
import { TranslatorDialect } from "./TranslatorDialect";
import { TranslatorPronoun } from "./TranslatorPronoun";
import { ClipboardIcon } from "@heroicons/react/24/outline";

export type TranslatorProps = {
  className?: string;
  action: (prevState: unknown, formData: FormData) => Promise<Result>;
};

export const Translator: FC<TranslatorProps> = (props) => {
  const { action, className } = props;

  const [state, submitAction] = useFormState(action, {
    type: "ok",
    text: "",
  });

  const error = state.type === "error" ? state.message : null;
  const translation = state.type === "ok" ? state.text : null;

  const handleCopy: MouseEventHandler = (e) => {
    e.preventDefault();
    if (translation != null) {
      navigator.clipboard.writeText(translation);
    }
    window.alert("コピーしました");
  }

  return (
    <form
      className={clsx("flex flex-col gap-4", className)}
      action={submitAction}
    >
      <fieldset className="flex gap-5">
        <legend className="sr-only">入力する言語</legend>

        <Radio name="direction" value="ja2ain" defaultChecked>
          日本語からアイヌ語
        </Radio>

        <Radio name="direction" value="ain2ja">
          アイヌ語から日本語
        </Radio>
      </fieldset>

      <div className="flex flex-col w-full gap-2 lg:flex-row">
        <div className="flex-1">
          <label className="sr-only" htmlFor="text">
            翻訳したいテキストを入力
          </label>

          <textarea
            id="text"
            name="text"
            className={clsx(
              "w-full min-h-48 md:min-h-64 lg:h-full",
              "p-3 rounded",
              "text-xl",
              "border bg-white border-zinc-300",
              "dark:bg-black dark:border-zinc-700",
              "outline-blue-400 outline-2 focus:outline outline-offset-4"
            )}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            aria-invalid={error != null}
            aria-errormessage="error-message"
            style={{ fieldSizing: "content" } as any}
          />
        </div>

        <div className="flex-1 relative">
          <div
            role="status"
            className={clsx(
              "w-full min-h-48 md:min-h-64 lg:h-full",
              "p-3 rounded",
              "text-xl",
              "bg-zinc-100 border-zinc-300 border",
              "dark:bg-zinc-900 dark:border-zinc-700"
            )}
          >
            <TranslatorText>{translation}</TranslatorText>
          </div>

          <button
            className={clsx(
              "absolute bottom-0 right-0 p-2 m-1 rounded-full",
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

      <div className="flex flex-col gap-2 justify-between md:flex-row">
        <div className="flex-1">
          {error != null && (
            <div
              id="error-message"
              role="alert"
              className="text-red-600 dark:text-red-400"
            >
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <TranslatorPronoun />
          <TranslatorDialect />
          <TranslatorSubmit />
        </div>
      </div>
    </form>
  );
};
