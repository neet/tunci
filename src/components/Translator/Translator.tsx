"use client";

import { Result } from "@/app/actions";
import { Radio } from "@/components/Radio";
import { Select } from "@/components/Select";

import { FC } from "react";
import { useFormState } from "react-dom";
import { TranslatorSubmit } from "./TranslatorSubmit";
import clsx from "clsx";

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

  return (
    <form
      className={clsx("flex flex-col gap-4", className)}
      action={submitAction}
    >
      <fieldset className="flex gap-5">
        <legend className="sr-only">入力する言語</legend>

        <Radio name="direction" value="ain2ja" defaultChecked>
          アイヌ語から日本語
        </Radio>

        <Radio name="direction" value="ja2ain">
          日本語からアイヌ語
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
            className="w-full h-full text-lg p-2 rounded min-h-64 border bg-white border-zinc-300 dark:bg-black dark:border-zinc-700 outline-blue-400 outline-2 focus:outline outline-offset-4"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            aria-invalid={error != null}
            aria-errormessage="error-message"
            style={{ fieldSizing: "content" } as any}
          />
        </div>

        <div className="flex-1">
          <div
            role="status"
            className="w-full h-full text-lg p-2 min-h-64  bg-zinc-100 border-zinc-300 rounded border dark:bg-zinc-900 dark:border-zinc-700"
          >
            {translation}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
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

        <div className="flex justify-end gap-3">
          <Select label="言葉遣い" name="pronoun">
            <option value="first">日常会話</option>
            <option value="fourth">物語</option>
          </Select>

          <Select label="方言" name="dialect">
            <optgroup label="北海道・南西">
              <option value="沙流">沙流</option>
              <option value="千歳">千歳</option>
              <option value="鵡川">鵡川</option>
            </optgroup>

            <optgroup label="北海道・北東">
              <option value="静内">静内</option>
              <option value="様似">様似</option>
              <option value="美幌">美幌</option>
              <option value="旭川">旭川</option>
            </optgroup>

            <optgroup label="樺太">
              <option value="樺太">樺太</option>
            </optgroup>
          </Select>

          <TranslatorSubmit />
        </div>
      </div>
    </form>
  );
};
