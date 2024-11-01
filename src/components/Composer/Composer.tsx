"use client";

import { SearchResponse } from "algoliasearch";
import clsx from "clsx";
import debounce from "lodash-es/debounce";
import mixpanel from "mixpanel-browser";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  FC,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
} from "react";
import { FiClipboard, FiCopy, FiMic, FiShare, FiVolume2 } from "react-icons/fi";
import TextareaAutosize from "react-textarea-autosize";

import { SearchEntry } from "@/models/entry";
import * as t from "@/models/transcription";

import { Alert } from "../Alert";
import { Button } from "../Button";
import { AlternativeTranslations } from "./AlternativeTranslations";
import { CharCount } from "./CharCount";
import { DialectSelector } from "./DialectSelector";
import { ExampleSentences } from "./ExampleSentences";
import { IconButton } from "./IconButton";
import { IconButtonGroup } from "./IconButtonGroup";
import { LanguageSelector } from "./LanguageSelector";
import { PronounSelector } from "./PronounSelector";
import { Transcription } from "./Transcription";
import { Translation } from "./Translation";

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
  textTranscription?: t.Transcription;
  translationTranscription?: t.Transcription;

  alternativeTranslationsPromise?: Promise<string[]>;
  exampleSentencesPromise?: Promise<SearchResponse<SearchEntry>>;

  errorMessage?: string;
};

export const Composer: FC<ComposerProps> = (props) => {
  const {
    method,
    action,
    defaultValues,
    translation,
    textTranscription,
    translationTranscription,
    errorMessage,
  } = props;

  const t = useTranslations("components.Composer");
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const submitted = useRef(false);
  const headingId = useId();

  const [dirty, setDirty] = useState(false);
  const [count, setCount] = useState<number>(defaultValues.text.length);
  const [source, setSource] = useState(defaultValues.source);
  const [target, setTarget] = useState(defaultValues.target);

  useEffect(() => {
    if (submitted.current) {
      document.getElementById("translation")?.focus();
    }
  }, [props.translation]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setCountDebounced = useCallback(
    debounce((count: number) => setCount(count), 1000),
    [],
  );

  const handleChangeText = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setDirty(true);
    setCountDebounced(e.target.value.length);
  };

  const handleChangeSource = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    startTransition(() => {
      setSource(event.target.value);
      setTarget(event.target.value === "ja" ? "ain" : "ja");

      if (translation && textareaRef.current) {
        textareaRef.current.value = translation;
        setDirty(true);
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
        setDirty(true);
      }
    });
  };

  const handlePaste = async (): Promise<void> => {
    const text = await navigator.clipboard.readText();

    if (textareaRef.current) {
      textareaRef.current.value = text;
    }
    setDirty(true);

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

      submitted.current = true;
      router.push(url.toString());
      setDirty(false);
    });
  };

  return (
    <form
      method={method}
      action={action}
      className="grid w-full grid-cols-1 md:grid-cols-2"
      aria-labelledby={headingId}
      onSubmit={handleSubmit}
    >
      <h2 id={headingId} className="sr-only">
        {t("translateForm")}
      </h2>

      {errorMessage && (
        <Alert role="alert" className="col-span-full m-4 xl:mx-0">
          {errorMessage}
        </Alert>
      )}

      <div className="bg-white dark:bg-black col-span-1">
        <LanguageSelector
          name="source"
          value={source}
          legend={t("source")}
          onChange={handleChangeSource}
        />

        <div className="p-4">
          <div>
            <label htmlFor="text" className="sr-only">
              {t("text")}
            </label>

            <TextareaAutosize
              id="text"
              name="text"
              ref={textareaRef}
              defaultValue={defaultValues.text}
              className={clsx(
                "w-full h-full text-2xl min-h-[3lh] resize-none",
                "bg-white dark:bg-black",
                "focus:outline-none",
              )}
              required
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              onChange={handleChangeText}
            />

            {translation && textTranscription && !dirty && (
              <Transcription className="mt-1">
                {textTranscription.text}
              </Transcription>
            )}
          </div>

          <IconButtonGroup
            className="-mx-4 -mb-4 p-2"
            start={
              <>
                <IconButton
                  aria-label={t("recognize")}
                  onClick={handleRecognize}
                >
                  <FiMic className="size-5" aria-hidden />
                </IconButton>

                <IconButton aria-label={t("play")} onClick={handlePlayInput}>
                  <FiVolume2 className="size-5" aria-hidden />
                </IconButton>
              </>
            }
            end={
              <>
                <CharCount count={count} limit={200} />

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
          className="border-gray-200"
          onChange={handleChangeTarget}
        />

        <div className="divide-y-2 divide-gray-200 dark:divide-zinc-600">
          <div className="p-4">
            <h3 id="translation" tabIndex={-1} className="sr-only">
              {t("translationResult")}
            </h3>

            <div>
              <p className="text-2xl min-h-[3lh]">
                <Translation
                  value={dirty ? "" : translation}
                  pending={pending}
                />
              </p>

              {translation && translationTranscription && !dirty && (
                <Transcription className="mt-1">
                  {translationTranscription.text}
                </Transcription>
              )}
            </div>

            <IconButtonGroup
              className="-mx-4 -mb-4 p-2"
              start={
                translation &&
                !dirty && (
                  <IconButton aria-label={t("play")} onClick={handlePlayOutput}>
                    <FiVolume2 className="size-5" aria-hidden />
                  </IconButton>
                )
              }
              end={
                translation &&
                !dirty && (
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

          {translation && !dirty && (
            <ExampleSentences
              exampleSentencesPromise={props.exampleSentencesPromise}
            />
          )}

          {translation && !dirty && (
            <AlternativeTranslations
              alternativeTranslationsPromise={
                props.alternativeTranslationsPromise
              }
            />
          )}
        </div>
      </div>

      <div className="col-span-full flex mx-4 justify-end mt-4 gap-2 xl:mx-0">
        <PronounSelector defaultValue={defaultValues.pronoun} />

        <DialectSelector defaultValue={defaultValues.dialect} />

        <Button type="submit" disabled={pending}>
          {t("translate")}
        </Button>
      </div>
    </form>
  );
};
