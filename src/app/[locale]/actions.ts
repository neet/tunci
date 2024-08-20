"use server";

import { to_kana } from "ainu-utils";

import { convertKanaToLatin } from "@/api/convertKanaToLatin";
import { translateText } from "@/api/translateText";

export type Result =
  | {
      type: "error";
      message: string;
    }
  | {
      type: "ok";
      input: {
        alt?: string;
      };
      output: {
        text: string;
        alt?: string;
      };
    };

const KANA_PATTERN = /[ア-ン゛゜ァ-ォャ-ョー]/;
const MAX_LENGTH = 200;

const isKana = (text: string): boolean => KANA_PATTERN.test(text);

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
    const textLatin = isKana(text) ? await convertKanaToLatin(text) : text;
    const translationSource = textLatin.replace(/\n/g, " ").trim();

    const translation = await translateText(translationSource, {
      direction,
      dialect,
      pronoun,
    });

    return {
      type: "ok",
      input: {
        alt:
          direction === "ain2ja"
            ? isKana(text)
              ? translationSource
              : to_kana(text)
            : undefined,
      },
      output: {
        text: translation,
        alt: direction === "ja2ain" ? to_kana(translation) : undefined,
      },
    };
  } catch (error) {
    if (
      error instanceof Error &&
      error.cause instanceof Response &&
      error.cause.status === 503
    ) {
      return {
        type: "error",
        message:
          "サーバーを起動していますので、１〜２分待ってから再度お試しください。費用を削減するため、夜間など利用者が少ない時間帯には自動的に停止しています。",
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
