"use client";

import clsx from "clsx";
import { FC } from "react";
import { useFormState } from "react-dom";

import { Result } from "@/app/actions";

import { Radio } from "../Radio";
import { TranslatorDialect } from "./TranslatorDialect";
import { TranslatorPronoun } from "./TranslatorPronoun";
import { TranslatorSubmit } from "./TranslatorSubmit";
import { TranslatorTextField } from "./TranslatorTextField";
import { TranslatorTranslation } from "./TranslatorTranslation/TranslatorTranslation";

export type TranslatorProps = {
  className?: string;
  action: (prevState: unknown, formData: FormData) => Promise<Result>;
};

export const Translator: FC<TranslatorProps> = (props) => {
  const { action, className } = props;

  const [state, submitAction] = useFormState(action, {
    type: "ok",
    text: "",
    bridged: false,
  });

  const error = state.type === "error" ? state.message : null;
  const translation = state.type === "ok" ? state.text : null;

  const handleCopy = () => {
    if (translation != null) {
      navigator.clipboard.writeText(translation);
    }
    window.alert("コピーしました");
  };

  return (
    <form
      className={clsx("flex flex-col gap-4", className)}
      action={submitAction}
    >
      <div className="flex">
        <fieldset className="flex-1 flex gap-5">
          <legend>翻訳元</legend>

          <Radio name="source_language" value="ja" defaultChecked>
            日本語
          </Radio>

          <Radio name="source_language" value="ain">
            アイヌ語
          </Radio>

          <Radio name="source_language" value="en">
            英語
          </Radio>
        </fieldset>

        <fieldset className="flex-1 flex gap-5">
          <legend>翻訳先</legend>

          <Radio name="target_language" value="ja" defaultChecked>
            日本語
          </Radio>

          <Radio name="target_language" value="ain">
            アイヌ語
          </Radio>

          <Radio name="target_language" value="en">
            英語
          </Radio>
        </fieldset>
      </div>

      <div className="flex flex-col w-full gap-2 lg:flex-row">
        <TranslatorTextField
          className="flex-1"
          name="text"
          error={error}
          aria-errormessage="error-message"
        />

        <TranslatorTranslation
          className="flex-1"
          bridged={state.type === "ok" && state.bridged}
          onCopy={handleCopy}
        >
          {translation}
        </TranslatorTranslation>
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

        <div className="flex flex-wrap justify-end gap-2">
          <TranslatorPronoun />
          <TranslatorDialect />
          <TranslatorSubmit />
        </div>
      </div>
    </form>
  );
};
