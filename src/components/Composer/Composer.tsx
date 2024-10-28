"use client";

import { SearchResponse } from "algoliasearch";
import clsx from "clsx";
import mixpanel from "mixpanel-browser";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { FC, useEffect, useRef, useState, useTransition } from "react";
import { FiClipboard, FiCopy, FiMic, FiShare, FiVolume2 } from "react-icons/fi";

import { SearchEntry } from "@/models/entry";
import { Transcription } from "@/models/transcription";

import { Alert } from "../Alert";
import { Button } from "../Button";
import { AlternativeTranslations } from "./AlternativeTranslations";
import { DialectSelector } from "./DialectSelector";
import { ExampleSentences } from "./ExampleSentences";
import { IconButton } from "./IconButton";
import { IconButtonGroup } from "./IconButtonGroup";
import { LanguageSelector } from "./LanguageSelector";
import { PronounSelector } from "./PronounSelector";

export type ComposerProps = {
  method: string;
  action: string;

  defaultValues: {
    text: string;
    source: string;
    target: string;
    pronoun: string;
    dialect: string;
  };

  translation?: string;
  textTranscription?: Transcription;
  translationTranscription?: Transcription;

  alternativeTranslationsPromise?: Promise<string[]>;
  exampleSentencesPromise?: Promise<SearchResponse<SearchEntry>>;

  errorMessage?: string;
};

export const Composer: FC<ComposerProps> = (props) => {
  const {
    method,
    action,
    defaultValues,
    textTranscription,
    translationTranscription,
    errorMessage,
  } = props;

  const [translation, setTranslation] = useState(props.translation);
  const t = useTranslations("components.Composer");
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [pending, startTransition] = useTransition();

  const [text, setText] = useState(defaultValues.text);
  const [source, setSource] = useState(defaultValues.source);
  const [target, setTarget] = useState(defaultValues.target);

  useEffect(() => {
    if (props.translation) {
      setTranslation(props.translation);
    }
  }, [props.translation]);

  const dirty = text.trim() !== "";

  const handleChangeText = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setText(event.target.value);
    setTranslation("");
  };

  const handleChangeSource = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    startTransition(() => {
      setSource(event.target.value);
      setTarget(event.target.value === "ja" ? "ain" : "ja");

      if (translation && textareaRef.current) {
        textareaRef.current.value = translation;
        setText(translation);
        setTranslation("");
      }
    });
  };

  const handleChangeTarget = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    startTransition(() => {
      setTarget(event.target.value);
      setSource(event.target.value === "ja" ? "ain" : "ja");

      if (translation && textareaRef.current) {
        textareaRef.current.value = translation;
        setText(translation);
        setTranslation("");
      }
    });
  };

  const handlePaste = (): void => {
    mixpanel.track("Translator::paste", {
      text,
    });
  };

  const handleCopy = (): void => {
    if (translation == null) {
      return;
    }

    navigator.clipboard.writeText(translation);

    mixpanel.track("Translator::copy", {
      text: translation,
    });

    window.alert(t("copied"));
  };

  const handleRecognize = (): void => {
    mixpanel.track("Translator::recognize");
    window.alert("この機能は現在準備中です。");
  };

  const handlePlayInput = (): void => {
    mixpanel.track("Translator::play::input");
    window.alert("この機能は現在準備中です。");
  };

  const handlePlayOutput = (): void => {
    mixpanel.track("Translator::play::output");
    window.alert("この機能は現在準備中です。");
  };

  const handleShare = (): void => {
    navigator.share({
      url: window.location.href,
    });

    mixpanel.track("Translator::share", {
      text: translation,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
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
      method={method}
      action={action}
      className="grid w-full grid-cols-1 md:grid-cols-2"
      onSubmit={handleSubmit}
    >
      {errorMessage && (
        <Alert role="alert" className="col-span-full my-4">
          {errorMessage}
        </Alert>
      )}

      <div className="bg-white dark:bg-black col-span-1">
        <LanguageSelector
          name="source"
          value={source}
          legend={t("source")}
          defaultValue={defaultValues.source}
          onChange={handleChangeSource}
        />

        <div>
          <div className="p-4">
            <textarea
              name="text"
              ref={textareaRef}
              value={text}
              className={clsx(
                "w-full h-full text-2xl min-h-[3lh] resize-none",
                "bg-white dark:bg-black",
              )}
              required
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              style={{ fieldSizing: "content" } as any}
              onChange={handleChangeText}
            />

            {translation && textTranscription && (
              <p className="text-gray-600 dark:text-zinc-400">
                {textTranscription.text}
              </p>
            )}
          </div>

          <IconButtonGroup
            start={
              <>
                <IconButton
                  aria-label={t("recognize")}
                  onClick={handleRecognize}
                >
                  <FiMic className="size-5" aria-hidden />
                </IconButton>

                {dirty && (
                  <IconButton aria-label={t("play")} onClick={handlePlayInput}>
                    <FiVolume2 className="size-5" aria-hidden />
                  </IconButton>
                )}
              </>
            }
            end={
              <>
                <div
                  className={clsx(
                    "tabular-nums text-sm leading-none",
                    text.length > 200
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-600 dark:text-zinc-400",
                  )}
                >
                  {text.length}/200
                </div>

                <IconButton aria-label={t("paste")} onClick={handlePaste}>
                  <FiClipboard className="size-5" aria-hidden />
                </IconButton>
              </>
            }
          />
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-zinc-900 col-span-1">
        <LanguageSelector
          name="target"
          value={target}
          legend={t("target")}
          className="border-gray-200 [&&&]:dark:border-zinc-800"
          defaultValue={defaultValues.target}
          onChange={handleChangeTarget}
        />

        <div className="divide-y-2 divide-gray-200 dark:divide-zinc-800">
          <div>
            <div className="p-4">
              <p className="text-2xl min-h-[3lh]">{translation}</p>

              {translation && translationTranscription && (
                <p className="mt-1 text-gray-600 dark:text-zinc-400">
                  {translationTranscription.text}
                </p>
              )}
            </div>

            <IconButtonGroup
              start={
                translation && (
                  <IconButton aria-label={t("play")} onClick={handlePlayOutput}>
                    <FiVolume2 className="size-5" aria-hidden />
                  </IconButton>
                )
              }
              end={
                translation && (
                  <>
                    <IconButton aria-label={t("share")} onClick={handleShare}>
                      <FiShare className="size-5" aria-hidden />
                    </IconButton>

                    <IconButton aria-label={t("copy")} onClick={handleCopy}>
                      <FiCopy className="size-5" aria-hidden />
                    </IconButton>
                  </>
                )
              }
            />
          </div>

          {translation && (
            <AlternativeTranslations
              alternativeTranslationsPromise={
                props.alternativeTranslationsPromise
              }
            />
          )}

          {translation && (
            <ExampleSentences
              exampleSentencesPromise={props.exampleSentencesPromise}
            />
          )}
        </div>
      </div>

      <div className="col-span-full flex justify-end mt-4 gap-2">
        <PronounSelector defaultValue={defaultValues.pronoun} />

        <DialectSelector defaultValue={defaultValues.dialect} />

        <Button type="submit" disabled={pending}>
          {t("translate")}
        </Button>
      </div>
    </form>
  );
};
