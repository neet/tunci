"use client";

import clsx from "clsx";
import mixpanel from "mixpanel-browser";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { FC, FormEventHandler, Suspense, useTransition } from "react";

import { Radio } from "@/components/Radio";
import { Transcription } from "@/models/transcription";

import { Alert } from "../Alert";
import {
  TranslatorAlternatives,
  TranslatorAlternativesSkeleton,
} from "./TranslatorAlternatives";
import { TranslatorDialect } from "./TranslatorDialect";
import { TranslatorInput } from "./TranslatorInput";
import { TranslatorOutput } from "./TranslatorOutput";
import { TranslatorPronoun } from "./TranslatorPronoun";
import { TranslatorSubmit } from "./TranslatorSubmit";

export type TranslatorProps = {
  className?: string;
  action: string;

  text?: string;
  translation?: string;
  errorMessage?: string;
  textTranscription?: Transcription;
  translationTranscription?: Transcription;
  direction?: string;
  dialect?: string;
  pronoun?: string;

  translationsPromise?: Promise<string[]>;
};

export const Translator: FC<TranslatorProps> = (props) => {
  const {
    text,
    translation,
    errorMessage,
    textTranscription,
    translationTranscription,
    direction,
    dialect,
    pronoun,
    action,
    className,
    translationsPromise,
  } = props;

  const t = useTranslations("components.Translator");
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handlePaste = () => {
    mixpanel.track("Translator::paste", {
      text,
    });
  };

  const handleCopy = () => {
    if (translation == null) {
      return;
    }

    navigator.clipboard.writeText(translation);

    mixpanel.track("Translator::copy", {
      text: translation,
    });

    window.alert(t("copied"));
  };

  const handleRecognize = () => {
    mixpanel.track("Translator::recognize");
    window.alert("この機能は現在準備中です。");
  };

  const handlePlayInput = () => {
    mixpanel.track("Translator::play::input");
    window.alert("この機能は現在準備中です。");
  };

  const handlePlayOutput = () => {
    mixpanel.track("Translator::play::output");
    window.alert("この機能は現在準備中です。");
  };

  const handleShare = () => {
    navigator.share({
      url: window.location.href,
    });

    mixpanel.track("Translator::share", {
      text: translation,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    startTransition(() => {
      event.preventDefault();

      const form = event.currentTarget;
      const formData = new FormData(form);
      const url = new URL(form.action);
      const searchParams = new URLSearchParams();

      for (const [key, value] of Array.from(formData)) {
        if (value) {
          searchParams.append(key, value as string);
        }
      }
      url.search = searchParams.toString();

      mixpanel.track("Translator::translate", {
        text: formData.get("text"),
        direction: formData.get("direction"),
        pronoun: formData.get("pronoun"),
        dialect: formData.get("dialect"),
      });

      router.push(url.toString());
    });
  };

  return (
    <form
      className={clsx("flex flex-col gap-4", className)}
      action={action}
      method="GET"
      onSubmitCapture={handleSubmit}
    >
      {errorMessage != null && (
        <Alert id="error-message" role="alert">
          {errorMessage}
        </Alert>
      )}

      <fieldset className="flex gap-5">
        <legend className="sr-only">{t("sourceLanguage")}</legend>

        <Radio
          name="direction"
          value="ja2ain"
          defaultChecked={direction === "ja2ain"}
        >
          {t("japaneseToAinu")}
        </Radio>

        <Radio
          name="direction"
          value="ain2ja"
          defaultChecked={direction === "ain2ja"}
        >
          {t("ainuToJapanese")}
        </Radio>
      </fieldset>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <TranslatorInput
          transcription={textTranscription}
          defaultValue={text}
          error={errorMessage}
          onPaste={handlePaste}
          onPlay={handlePlayInput}
          onRecognize={handleRecognize}
        />

        <TranslatorOutput
          transcription={translationTranscription}
          value={translation}
          pending={pending}
          onShare={handleShare}
          onCopy={handleCopy}
          onPlay={handlePlayOutput}
        />

        {translationsPromise && text && (
          <div className="lg:col-start-2">
            <Suspense fallback={<TranslatorAlternativesSkeleton />}>
              <TranslatorAlternatives
                text={text}
                translationsPromise={translationsPromise}
              />
            </Suspense>
          </div>
        )}
      </div>

      <div className="flex flex-row flex-wrap gap-2 justify-end">
        <TranslatorPronoun defaultValue={pronoun} />
        <TranslatorDialect defaultValue={dialect} />
        <TranslatorSubmit pending={pending} />
      </div>
    </form>
  );
};
