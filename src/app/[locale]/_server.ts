import { to_kana } from "ainu-utils";

import * as api from "@/api";
import { Transcription } from "@/models/transcription";
import { isKana, normalize } from "@/utils";

const MAX_LENGTH = 200;

const isServiceUnavailableError = (error: unknown): boolean => {
  return (
    error instanceof Error &&
    error.cause instanceof Response &&
    error.cause.status === 503
  );
};

export type TranslationParams = {
  direction?: string;
  dialect?: string;
  pronoun?: string;
};

export type ErrorType =
  | "INVALID_ARGUMENT"
  | "ROMANIZE_SERVICE_UNAVAILABLE"
  | "TRANSLATOR_SERVICE_UNAVAILABLE"
  | "UNKNOWN";

type ResultError = {
  type: "error";
  error: ErrorType;
  message?: string;
};

type ResultOk = {
  type: "ok";
  translation: string;
  transcriptions: {
    text?: Transcription;
    translation?: Transcription;
  };
};

export type Result = ResultError | ResultOk;

export async function fetchTranslation(
  text: string,
  params: TranslationParams,
): Promise<Result> {
  const { direction, dialect, pronoun } = params;

  if (typeof text !== "string" || text.length === 0) {
    return {
      type: "error",
      error: "INVALID_ARGUMENT",
      message: "テキストが入力されていません。",
    };
  }

  if (typeof direction !== "string") {
    return {
      type: "error",
      error: "INVALID_ARGUMENT",
      message: "翻訳方向が不正です。",
    };
  }

  if (typeof dialect !== "string") {
    return {
      type: "error",
      error: "INVALID_ARGUMENT",
      message: "方言が不正です。",
    };
  }

  if (typeof pronoun !== "string") {
    return {
      type: "error",
      error: "INVALID_ARGUMENT",
      message: "人称が不正です。",
    };
  }

  if (text.length > MAX_LENGTH) {
    return {
      type: "error",
      error: "INVALID_ARGUMENT",
      message: `テキストの長さが制限を超えています。${MAX_LENGTH}文字以内にしてください。`,
    };
  }

  try {
    let translationSource: string;
    try {
      translationSource = await normalize(text, direction);
    } catch (error) {
      if (isServiceUnavailableError(error)) {
        return {
          type: "error",
          error: "ROMANIZE_SERVICE_UNAVAILABLE",
        };
      } else {
        console.error(error);
        return {
          type: "error",
          error: "UNKNOWN",
          message:
            "エラーが発生しました。しばらく待ってから再度お試しください。",
        };
      }
    }

    let translation: string;
    try {
      translation = await api.translate(translationSource, {
        direction,
        dialect,
        pronoun,
      });
    } catch (error) {
      if (isServiceUnavailableError(error)) {
        return {
          type: "error",
          error: "TRANSLATOR_SERVICE_UNAVAILABLE",
        };
      } else {
        console.error(error);
        return {
          type: "error",
          error: "UNKNOWN",
          message:
            "エラーが発生しました。しばらく待ってから再度お試しください。",
        };
      }
    }

    const result: Result = {
      type: "ok",
      translation,
      transcriptions: {},
    };

    if (direction === "ja2ain") {
      result.transcriptions.translation = {
        type: "kana",
        text: to_kana(translation),
      };
    }

    if (direction === "ain2ja") {
      if (isKana(text)) {
        result.transcriptions.text = {
          type: "latin",
          text: translationSource,
        };
      } else {
        result.transcriptions.text = {
          type: "kana",
          text: to_kana(translationSource),
        };
      }
    }

    return result;
  } catch (error) {
    console.log(error);
    return {
      type: "error",
      error: "UNKNOWN",
      message: "エラーが発生しました。しばらく待ってから再度お試しください。",
    };
  }
}

export async function fetchAlternativeTranslations(
  text: string,
  result: Result,
  direction: string,
  dialect: string,
  pronoun: string,
): Promise<string[]> {
  if (result.type === "error") {
    return [];
  }

  const genMax = 20;
  const max = 3;

  text =
    result.transcriptions.text && result.transcriptions.text.type === "latin"
      ? result.transcriptions.text.text
      : text;

  try {
    const translations = await api.translate(text, {
      direction,
      dialect,
      pronoun,
      numReturnSequences: genMax,
    });

    return translations
      .filter((translation) => translation !== result.translation)
      .splice(0, max);
  } catch {
    return [];
  }
}
