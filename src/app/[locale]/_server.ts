import { to_kana } from "ainu-utils";

import * as api from "@/api";
import { Transcription } from "@/models/transcription";

export type TranslationParams = {
  direction?: string;
  dialect?: string;
  pronoun?: string;
};

export type Result =
  | {
      type: "error";
      message: string;
    }
  | {
      type: "ok";
      translation: string;
      transcriptions: {
        text?: Transcription;
        translation?: Transcription;
      };
    };

const KANA_PATTERN = /[ア-ン゛゜ァ-ォャ-ョー]/;
const MAX_LENGTH = 200;

const isKana = (text: string): boolean => KANA_PATTERN.test(text);

const normalize = async (text: string, direction: string): Promise<string> => {
  if (direction === "ain2ja" && isKana(text)) {
    text = await api.romanize(text);
  }

  text = text.replace(/\n/g, " ").trim();

  return text;
};

export async function translate(
  text: string,
  params: TranslationParams,
): Promise<Result> {
  const { direction, dialect, pronoun } = params;

  if (typeof text !== "string" || text.length === 0) {
    return {
      type: "error",
      message: "テキストが入力されていません。",
    };
  }

  if (typeof direction !== "string") {
    return {
      type: "error",
      message: "翻訳方向が不正です。",
    };
  }

  if (typeof dialect !== "string") {
    return {
      type: "error",
      message: "方言が不正です。",
    };
  }

  if (typeof pronoun !== "string") {
    return {
      type: "error",
      message: "人称が不正です。",
    };
  }

  if (text.length > MAX_LENGTH) {
    return {
      type: "error",
      message: `テキストの長さが制限を超えています。${MAX_LENGTH}文字以内にしてください。`,
    };
  }

  try {
    const translationSource = await normalize(text, direction);

    const translation = await api.translate(translationSource, {
      direction,
      dialect,
      pronoun,
    });

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
    if (
      error instanceof Error &&
      error.cause instanceof Response &&
      error.cause.status === 503
    ) {
      return {
        type: "error",
        message:
          "サーバーを起動していますので、1〜2分ほど待ってから再度お試しください。\n費用を削減するため、1時間以上アクセスが無かった場合には自動的に停止しています。",
      };
    } else {
      console.error(error);
      return {
        type: "error",
        message: "エラーが発生しました。しばらく待ってから再度お試しください。",
      };
    }
  }
}
