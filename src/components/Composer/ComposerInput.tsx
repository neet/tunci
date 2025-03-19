import {
  Box,
  Button,
  Card,
  Flex,
  IconButton,
  Spinner,
  Text,
  Tooltip,
  VisuallyHidden,
} from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { ComponentProps, FC, RefObject, useMemo, useState } from "react";
import { FiClipboard, FiMic, FiVolume2 } from "react-icons/fi";
import TextareaAutosize from "react-textarea-autosize";

import * as t from "../../models/transcription";
import {
  AdvancedSettings,
  AdvancedSettingsDialog,
} from "./AdvancedSettingsDialog";
import { CharCount } from "./CharCount";
import { LanguageSelector } from "./LanguageSelector";
import { Transcription } from "./Transcription";

export type ComposerInputProps = {
  source: string;
  defaultValues: {
    text: string;
    pronoun?: string;
    dialect?: string;
  };
  pending: boolean;
  hasTranslation: boolean;
  dirty: boolean;
  textTranscription?: t.Transcription;
  count: number;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onChangeSource: (source: string) => void;
  onChangeText: (text: string) => void;
  onRecognize: () => void;
  onPlayInput: () => void;
  onPaste: () => void;
};

export const ComposerInput: FC<ComposerInputProps> = (props) => {
  const {
    source,
    defaultValues,
    hasTranslation,
    dirty,
    pending,
    textTranscription,
    textareaRef,
    count,
    onChangeSource,
    onChangeText,
    onRecognize,
    onPlayInput,
    onPaste,
  } = props;

  const t = useTranslations("components.Composer.ComposerInput");

  const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettings>({
    pronoun: defaultValues.pronoun ?? "first",
    dialect: defaultValues.dialect ?? "沙流",
  });

  const textareaLanguageRelatedAttributes: ComponentProps<
    typeof TextareaAutosize
  > = useMemo(() => {
    if (source === "ja") {
      return {
        lang: "ja",
      };
    }

    if (source === "ain") {
      return {
        lang: "ain",
        spellCheck: false,
        autoComplete: "off",
        autoCorrect: "off",
        autoCapitalize: "off",
      };
    }

    return {};
  }, [source]);

  const handleCloseDialog = (advancedSettings: Partial<AdvancedSettings>) => {
    setAdvancedSettings((prev) => ({ ...prev, ...advancedSettings }));
  };

  return (
    <Flex direction="column" gap="3">
      <Box>
        <LanguageSelector
          name="source"
          value={source}
          legend={t("source")}
          onChange={(source) => onChangeSource(source)}
        />
      </Box>

      <Card size="2">
        <Box>
          <VisuallyHidden asChild>
            <label htmlFor="text">{t("text")}</label>
          </VisuallyHidden>

          <Text size="6" asChild>
            <TextareaAutosize
              id="text"
              name="text"
              ref={textareaRef}
              defaultValue={defaultValues.text}
              required
              placeholder={t("placeholder")}
              onChange={(e) => onChangeText(e.target.value)}
              {...textareaLanguageRelatedAttributes}
            />
          </Text>

          <Transcription>
            {!dirty && hasTranslation && textTranscription
              ? textTranscription.text
              : undefined}
          </Transcription>
        </Box>

        <Flex justify="between" mt="2">
          <Flex justify="start" gap="1">
            <Tooltip content={t("recognize")}>
              <IconButton
                variant="soft"
                size="2"
                title={t("recognize")}
                type="button"
                onClick={onRecognize}
              >
                <FiMic aria-hidden />
              </IconButton>
            </Tooltip>

            <Tooltip content={t("play")}>
              <IconButton
                variant="soft"
                size="2"
                onClick={onPlayInput}
                type="button"
                title={t("play")}
                style={{
                  visibility: count > 0 ? "visible" : "hidden",
                }}
              >
                <FiVolume2 aria-hidden />
              </IconButton>
            </Tooltip>
          </Flex>

          <Flex justify="end" gap="1" align="center">
            <CharCount count={count} limit={200} />

            <Tooltip content={t("paste")}>
              <IconButton
                variant="soft"
                size="2"
                onClick={onPaste}
                type="button"
                title={t("paste")}
              >
                <FiClipboard aria-hidden />
              </IconButton>
            </Tooltip>
          </Flex>
        </Flex>
      </Card>

      <Flex gap="2" justify="end" p="1" wrap="wrap">
        <AdvancedSettingsDialog
          defaultValues={advancedSettings}
          opener={<Button type="button">{t("advancedSettings")}</Button>}
          onClose={handleCloseDialog}
        />

        <input type="hidden" name="pronoun" value={advancedSettings.pronoun} />
        <input type="hidden" name="dialect" value={advancedSettings.dialect} />

        <Button type="submit" disabled={pending}>
          {pending && <Spinner />}
          {t("translate")}
        </Button>
      </Flex>
    </Flex>
  );
};
