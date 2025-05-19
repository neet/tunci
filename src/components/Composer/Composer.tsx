"use client";

import "./Composer.css";

import { Grid, Heading, VisuallyHidden } from "@radix-ui/themes";
import { SearchResponse } from "algoliasearch";
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

import { type ErrorType } from "@/app/[locale]/_server";
import { SearchEntry } from "@/models/entry";
import * as t from "@/models/transcription";

import { ComposerInput } from "./ComposerInput";
import { ComposerOutput } from "./ComposerOutput";

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

  error?: ErrorType;
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
    error,
    errorMessage,
  } = props;

  const t = useTranslations("components.Composer");
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const submitted = useRef(false);
  const headingId = useId();

  const [dirty, setDirty] = useState(false);
  const [count, setCount] = useState<number>(defaultValues.text.length);
  const [source, setSource] = useState(defaultValues.source);
  const [target, setTarget] = useState(defaultValues.target);

  const ready = translation != null;

  useEffect(() => {
    if (submitted.current) {
      document.getElementById("translation")?.focus();
    }
  }, [props.translation]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.value = defaultValues.text;
    }
  }, [defaultValues.text]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setCountDebounced = useCallback(
    debounce((count: number) => setCount(count), 1000),
    [],
  );

  const handleChangeText = (text: string): void => {
    setDirty(true);
    setCountDebounced(text.length);
  };

  const handleChangeSource = (source: string): void => {
    startTransition(() => {
      setSource(source);
      setTarget(source === "ja" ? "ain" : "ja");

      if (translation && textareaRef.current && !dirty) {
        textareaRef.current.value = translation;
        setDirty(true);
      }
    });
  };

  const handleChangeTarget = (target: string): void => {
    startTransition(() => {
      setTarget(target);
      setSource(target === "ja" ? "ain" : "ja");

      if (translation && textareaRef.current && !dirty) {
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
    window.alert(t("wip"));
  };

  const handlePlayInput = (): void => {
    mixpanel.track("Translator::play::input");
    window.alert(t("wip"));
  };

  const handlePlayOutput = (): void => {
    mixpanel.track("Translator::play::output");
    window.alert(t("wip"));
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
        source: formData.get("source"),
        target: formData.get("target"),
        pronoun: formData.get("pronoun"),
        dialect: formData.get("dialect"),
      });

      submitted.current = true;
      router.push(url.toString());
      setDirty(false);
    });
  };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <form
        id="composer"
        method={method}
        action={action}
        aria-labelledby={headingId}
        onSubmit={handleSubmit}
      >
        <VisuallyHidden>
          <Heading as="h2" id={headingId}>
            {t("translateForm")}
          </Heading>
        </VisuallyHidden>

        <ComposerInput
          defaultValues={defaultValues}
          textTranscription={textTranscription}
          count={count}
          pending={pending}
          source={source}
          dirty={dirty}
          hasTranslation={ready}
          textareaRef={textareaRef}
          onChangeSource={handleChangeSource}
          onChangeText={handleChangeText}
          onRecognize={handleRecognize}
          onPlayInput={handlePlayInput}
          onPaste={handlePaste}
        />
      </form>

      <ComposerOutput
        form="composer"
        translation={translation}
        translationTranscription={translationTranscription}
        dirty={dirty}
        pending={pending}
        target={target}
        hasTranslation={ready}
        onChangeTarget={handleChangeTarget}
        onPlayOutput={handlePlayOutput}
        onCopy={handleCopy}
        onShare={handleShare}
        onRefresh={() => router.refresh()}
        error={error}
        errorMessage={errorMessage}
        exampleSentencesPromise={props.exampleSentencesPromise}
        alternativeTranslationsPromise={props.alternativeTranslationsPromise}
      />
    </Grid>
  );
};
