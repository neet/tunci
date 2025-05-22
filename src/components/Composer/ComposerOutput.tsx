import {
  Box,
  Card,
  Flex,
  Heading,
  IconButton,
  Text,
  Tooltip,
  VisuallyHidden,
} from "@radix-ui/themes";
import { SearchResponse } from "algoliasearch";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { FiCopy, FiShare, FiVolume2 } from "react-icons/fi";

import { ErrorType } from "@/app/[locale]/_server";
import { SearchEntry } from "@/models/entry";

import * as t from "../../models/transcription";
import { AlternativeTranslations } from "./AlternativeTranslations";
import { Dirty } from "./Dirty";
import { Disclaimer } from "./Disclaimer";
import { EndpointStatus } from "./EndpointStatus";
import { ExampleSentences } from "./ExampleSentences";
import { LanguageSelector } from "./LanguageSelector";
import { Transcription } from "./Transcription";
import { Translation } from "./Translation";

export type ComposerOutputProps = {
  form: string;
  hasTranslation: boolean;
  dirty: boolean;
  target: string;
  pending: boolean;
  translation?: string;
  translationTranscription?: t.Transcription;
  error?: ErrorType;
  onChangeTarget: (target: string) => void;
  onPlayOutput: () => void;
  onShare: () => void;
  onCopy: () => void;
  onRefresh: () => void;
  exampleSentencesPromise?: Promise<SearchResponse<SearchEntry>>;
  alternativeTranslationsPromise?: Promise<string[]>;
};

export const ComposerOutput: FC<ComposerOutputProps> = (props) => {
  const {
    form,
    hasTranslation,
    dirty,
    pending,
    target,
    translationTranscription,
    translation,
    error,
    onChangeTarget,
    onPlayOutput,
    onShare,
    onCopy,
    onRefresh,
  } = props;

  const t = useTranslations("components.Composer.ComposerOutput");

  return (
    <Flex direction="column" gap="4">
      <Flex
        role="region"
        aria-labelledby="translation"
        direction="column"
        gap="3"
      >
        <Flex justify="between" align="center">
          <LanguageSelector
            form={form}
            name="target"
            value={target}
            legend={t("target")}
            onChange={(target) => onChangeTarget(target)}
          />
          {dirty && <Dirty />}
        </Flex>

        <Card size="2">
          <Box>
            <VisuallyHidden asChild>
              <Heading as="h2" id="translation" tabIndex={-1}>
                {t("translationResult")}
              </Heading>
            </VisuallyHidden>

            <Text lang={target} as="p" size="6" style={{ minHeight: "4lh" }}>
              <Translation
                value={translation}
                pending={pending}
                error={error}
              />
            </Text>

            <Transcription>
              {!pending && hasTranslation && translationTranscription
                ? translationTranscription.text
                : undefined}
            </Transcription>
          </Box>

          <Flex justify="between" mt="2">
            <Tooltip content={t("play")}>
              <IconButton
                type="button"
                color="gray"
                variant="soft"
                size="2"
                aria-label={t("play")}
                onClick={onPlayOutput}
                style={{
                  visibility: hasTranslation ? "visible" : "hidden",
                }}
              >
                <FiVolume2 aria-hidden />
              </IconButton>
            </Tooltip>

            <Flex justify="end" gap="1">
              <Tooltip content={t("share")}>
                <IconButton
                  type="button"
                  variant="soft"
                  color="gray"
                  size="2"
                  aria-label={t("share")}
                  onClick={onShare}
                  style={{
                    visibility: hasTranslation ? "visible" : "hidden",
                  }}
                >
                  <FiShare aria-hidden />
                </IconButton>
              </Tooltip>

              <Tooltip content={t("copy")}>
                <IconButton
                  type="button"
                  variant="soft"
                  color="gray"
                  size="2"
                  aria-label={t("copy")}
                  onClick={onCopy}
                  style={{
                    visibility: hasTranslation ? "visible" : "hidden",
                  }}
                >
                  <FiCopy aria-hidden />
                </IconButton>
              </Tooltip>
            </Flex>
          </Flex>
        </Card>

        {error === "TRANSLATOR_SERVICE_UNAVAILABLE" && (
          <EndpointStatus
            namespace="rigarashi"
            endpoint="mt5-base-ainu-jey"
            onReady={onRefresh}
          />
        )}

        {error === "ROMANIZE_SERVICE_UNAVAILABLE" && (
          <EndpointStatus
            namespace="rigarashi"
            endpoint="mt5-base-ainu-kana-atp"
            onReady={onRefresh}
          />
        )}

        {hasTranslation && <Disclaimer />}
      </Flex>

      {hasTranslation && (
        <ExampleSentences
          exampleSentencesPromise={props.exampleSentencesPromise}
        />
      )}

      {hasTranslation && (
        <AlternativeTranslations
          alternativeTranslationsPromise={props.alternativeTranslationsPromise}
        />
      )}
    </Flex>
  );
};
