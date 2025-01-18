import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
  Box,
  Callout,
  Card,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Text,
  Tooltip,
  VisuallyHidden,
} from "@radix-ui/themes";
import { SearchResponse } from "algoliasearch";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { FiCopy, FiShare, FiVolume2 } from "react-icons/fi";

import { SearchEntry } from "@/models/entry";
import { ProgressInfo } from "@/models/progress";

import * as t from "../../models/transcription";
import { AlternativeTranslations } from "./AlternativeTranslations";
import { Disclaimer } from "./Disclaimer";
import { ExampleSentences } from "./ExampleSentences";
import { LanguageSelector } from "./LanguageSelector";
import { ProgressMessage } from "./Progress";
import { Transcription } from "./Transcription";
import { Translation } from "./Translation";

export type ComposerOutputProps = {
  progressInfo?: ProgressInfo;
  ready: boolean;
  dirty: boolean;
  target: string;
  pending: boolean;
  translation?: string;
  translationTranscription?: t.Transcription;
  errorMessage?: string;
  onChangeTarget: (target: string) => void;
  onPlayOutput: () => void;
  onShare: () => void;
  onCopy: () => void;
  exampleSentencesPromise?: Promise<SearchResponse<SearchEntry>>;
  alternativeTranslationsPromise?: Promise<string[]>;
};

export const ComposerOutput: FC<ComposerOutputProps> = (props) => {
  const {
    ready,
    dirty,
    pending,
    target,
    progressInfo,
    translationTranscription,
    translation,
    errorMessage,
    onChangeTarget,
    onPlayOutput,
    onShare,
    onCopy,
  } = props;

  const t = useTranslations("components.Composer.ComposerOutput");

  return (
    <Flex direction="column" gap="4">
      {errorMessage && (
        <Callout.Root color="red">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>{errorMessage}</Callout.Text>
        </Callout.Root>
      )}

      {progressInfo && (
        <Callout.Root>
          <Callout.Icon>
            <Spinner />
          </Callout.Icon>

          <Callout.Text>
            <ProgressMessage info={progressInfo} />
          </Callout.Text>
        </Callout.Root>
      )}

      <Flex
        role="region"
        aria-labelledby="translation"
        direction="column"
        gap="3"
      >
        <Flex justify="between" align="center">
          <LanguageSelector
            name="target"
            value={target}
            legend={t("target")}
            onChange={(target) => onChangeTarget(target)}
          />
          {dirty && (
            <div style={{ minWidth: "0px" }}>
              <Text color="gray" as="p" size="2" truncate>
                {t("untranslated")}
              </Text>
            </div>
          )}
        </Flex>

        <Card size="2">
          <Box>
            <VisuallyHidden asChild>
              <Heading as="h3" id="translation" tabIndex={-1}>
                {t("translationResult")}
              </Heading>
            </VisuallyHidden>

            <Text lang={target} as="p" size="6" style={{ minHeight: "4lh" }}>
              <Translation value={translation} pending={pending} />
            </Text>

            <Transcription>
              {ready && translationTranscription
                ? translationTranscription.text
                : undefined}
            </Transcription>
          </Box>

          <Flex justify="between" mt="2">
            <Tooltip content={t("play")}>
              <IconButton
                hidden={!ready}
                type="button"
                variant="soft"
                size="2"
                aria-label={t("play")}
                onClick={onPlayOutput}
              >
                <FiVolume2 aria-hidden />
              </IconButton>
            </Tooltip>

            <Flex justify="end" gap="1">
              <Tooltip content={t("share")}>
                <IconButton
                  hidden={!ready}
                  type="button"
                  variant="soft"
                  size="2"
                  aria-label={t("share")}
                  onClick={onShare}
                >
                  <FiShare aria-hidden />
                </IconButton>
              </Tooltip>

              <Tooltip content={t("copy")}>
                <IconButton
                  hidden={!ready}
                  type="button"
                  variant="soft"
                  size="2"
                  aria-label={t("copy")}
                  onClick={onCopy}
                >
                  <FiCopy aria-hidden />
                </IconButton>
              </Tooltip>
            </Flex>
          </Flex>
        </Card>

        {ready && (
          <Box>
            <Disclaimer />
          </Box>
        )}
      </Flex>

      {ready && (
        <ExampleSentences
          exampleSentencesPromise={props.exampleSentencesPromise}
        />
      )}

      {ready && (
        <AlternativeTranslations
          alternativeTranslationsPromise={props.alternativeTranslationsPromise}
        />
      )}
    </Flex>
  );
};
