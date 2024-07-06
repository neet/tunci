"use client";

import { Result } from "@/app/actions";
import { Radio } from "@/components/Radio";
import { Select } from "@/components/Select";

import { FC } from "react";
import { useFormState } from "react-dom";
import clsx from "clsx";

import { TranslatorText } from "./TranslatorText";
import { TranslatorSubmit } from "./TranslatorSubmit";

export type TranslatorProps = {
  className?: string;
  action: (prevState: unknown, formData: FormData) => Promise<Result>;
};

export const Translator: FC<TranslatorProps> = (props) => {
  const { action, className } = props;

  const [state, submitAction, pending] = useFormState(action, {
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

        <div className="flex-1">
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
          <Select label="言葉遣い" name="pronoun">
            <option value="first">日常会話</option>
            <option value="fourth">物語</option>
          </Select>

          <Select label="方言" name="dialect">
            <optgroup label="北海道・南西">
              <option value="沙流">沙流</option>
              <option value="千歳">千歳</option>
              <option value="鵡川">鵡川</option>
              <option value="幌別">幌別</option>
            </optgroup>

            <optgroup label="北海道・北東">
              <option value="静内">静内</option>
              <option value="十勝">十勝</option>
              <option value="釧路">釧路</option>
              <option value="様似">様似</option>
              <option value="美幌">美幌</option>
              <option value="石狩">石狩</option>
              <option value="阿寒">阿寒</option>
            </optgroup>
          </Select>

          <TranslatorSubmit />
        </div>
      </div>
    </form>
  );
};
