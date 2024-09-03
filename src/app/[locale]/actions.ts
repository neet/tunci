"use server";

import { to_kana } from "ainu-utils";

import { convertKanaToLatin } from "@/api/convertKanaToLatin";
import { translateText } from "@/api/translateText";

export type Transcription = {
  type: "kana" | "latin";
  text: string;
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
        input?: Transcription;
        output?: Transcription;
      };
    };

const KANA_PATTERN = /[ア-ン゛゜ァ-ォャ-ョー]/;
const MAX_LENGTH = 200;

const isKana = (text: string): boolean => KANA_PATTERN.test(text);

const normalize = async (text: string, direction: string): Promise<string> => {
  if (direction === "ain2ja" && isKana(text)) {
    text = await convertKanaToLatin(text);
  }

  text = text.replace(/\n/g, " ").trim();

  return text;
};

export async function translate(
  _prevData: unknown,
  formData: FormData,
): Promise<Result> {
  const text = formData.get("text");
  const direction = formData.get("direction");
  const pronoun = formData.get("pronoun") ?? "first";
  const dialect = formData.get("dialect") ?? "沙流";

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

    const translation = await translateText(translationSource, {
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
      result.transcriptions.output = {
        type: "kana",
        text: to_kana(translation),
      };
    }

    if (direction === "ain2ja") {
      if (isKana(text)) {
        result.transcriptions.input = {
          type: "latin",
          text: translationSource,
        };
      } else {
        result.transcriptions.input = {
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
          "サーバーを起動していますので、1〜2分ほど待ってから再度お試しください。\n費用を削減するため、6時間以上アクセスが無かった場合には自動的に停止しています。",
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
