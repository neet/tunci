"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { FC, FormEventHandler } from "react";
import { useFormState } from "react-dom";

import { Result } from "@/app/[locale]/actions";
import { Radio } from "@/components/Radio";

import { Alert } from "../Alert";
import { TranslatorDialect } from "./TranslatorDialect";
import { TranslatorInput } from "./TranslatorInput";
import { TranslatorOutput } from "./TranslatorOutput";
import { TranslatorPronoun } from "./TranslatorPronoun";
import { TranslatorSubmit } from "./TranslatorSubmit";

export type TranslatorProps = {
  className?: string;
  action: (prevState: unknown, formData: FormData) => Promise<Result>;
};

export const Translator: FC<TranslatorProps> = (props) => {
  const { action, className } = props;

  const t = useTranslations("components.Translator");

  const [state, submitAction] = useFormState(action, {
    type: "ok",
    translation: "",
    transcriptions: {},
  });

  const error = state.type === "error" ? state.message : undefined;
  const translation = state.type === "ok" ? state.translation : undefined;
  const inputTranscription =
    state.type === "ok" ? state.transcriptions?.input : undefined;
  const outputTranscription =
    state.type === "ok" ? state.transcriptions?.output : undefined;

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    const textarea = document.getElementById("text");

    if (!(textarea instanceof HTMLTextAreaElement)) {
      return;
    }

    textarea.value = text.trim();
    textarea?.focus();

    gtag("event", "Translator::paste", {
      text,
    });
  };

  const handleCopy = () => {
    if (translation == null) {
      return;
    }

    navigator.clipboard.writeText(translation);

    gtag("event", "Translator::copy", {
      text: translation,
    });

    window.alert(t("copied"));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    const formData = new FormData(event.currentTarget);

    gtag("event", "Translator::translate", {
      text: formData.get("text"),
      direction: formData.get("direction"),
      pronoun: formData.get("pronoun"),
      dialect: formData.get("dialect"),
    });
  };

  return (
    <form
      className={clsx("flex flex-col gap-4", className)}
      action={submitAction}
      onSubmitCapture={handleSubmit}
    >
      {error != null && (
        <Alert id="error-message" role="alert">
          {error}
        </Alert>
      )}

      <fieldset className="flex gap-5">
        <legend className="sr-only">{t("sourceLanguage")}</legend>

        <Radio name="direction" value="ja2ain" defaultChecked>
          {t("japaneseToAinu")}
        </Radio>

        <Radio name="direction" value="ain2ja">
          {t("ainuToJapanese")}
        </Radio>
      </fieldset>

      <div className="flex flex-col gap-2 lg:flex-row">
        <div className="flex-1">
          <TranslatorInput
            transcription={inputTranscription}
            error={error}
            handlePaste={handlePaste}
          />
        </div>

        <div className="flex-1">
          <TranslatorOutput
            transcription={outputTranscription}
            value={translation}
            onCopy={handleCopy}
          />
        </div>
      </div>

      <div className="flex flex-row flex-wrap gap-2 justify-end">
        <TranslatorPronoun />
        <TranslatorDialect />
        <TranslatorSubmit />
      </div>
    </form>
  );
};
