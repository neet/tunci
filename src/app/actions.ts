"use server";

import assert from "assert";

export type Result =
  | {
      type: "error";
      message: string;
    }
  | {
      type: "ok";
      text: string;
      bridged: boolean;
    };

export async function translate(
  _prevData: unknown,
  formData: FormData,
): Promise<Result> {
  const text = formData.get("text");
  const sourceLanguage = formData.get("source_language");
  const targetLanguage = formData.get("target_language");
  const pronoun = formData.get("pronoun") ?? "first";
  const dialect = formData.get("dialect") ?? "沙流";

  if (typeof sourceLanguage !== "string") {
    return {
      type: "error",
      message: "翻訳元言語が不正です。",
    };
  }

  if (typeof targetLanguage !== "string") {
    return {
      type: "error",
      message: "翻訳先言語が不正です。",
    };
  }

  if (sourceLanguage === targetLanguage) {
    return {
      type: "error",
      message: "翻訳元と翻訳先が同じです。",
    };
  }

  if (sourceLanguage !== "ain" && targetLanguage !== "ain") {
    return {
      type: "error",
      message: "アイヌ語以外の翻訳はサポートしていません。",
    };
  }

  if (typeof text !== "string" || text.length === 0) {
    return {
      type: "error",
      message: "テキストが入力されていません。",
    };
  }

  const MAX_LENGTH = 128;
  if (text.length > MAX_LENGTH) {
    return {
      type: "error",
      message: `テキストの長さが制限を超えています。${MAX_LENGTH}文字以内にしてください。`,
    };
  }

  let bridgedText = text;

  try {
    if (sourceLanguage !== "ja") {
      assert(process.env.DEEPL_API_KEY, "DEEPL_API_KEY is not set");

      const response = await fetch("https://api-free.deepl.com/v2/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        },
        body: JSON.stringify({
          text: [text],
          source_lang: sourceLanguage.toUpperCase(),
          target_lang: "JA",
          formality: "more",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch", { cause: response });
      }

      const data = await response.json();

      bridgedText = data?.translations?.[0]?.text;
    }
  } catch (error) {
    console.error(error);

    return {
      type: "error",
      message:
        "DeepL API に接続できませんでした。日本語・アイヌ語間の翻訳をお使いください。",
    };
  }

  const prompt =
    sourceLanguage === "ain"
      ? `translate Ainu (${dialect}, ${pronoun}) to Japanese: ${bridgedText}`
      : `translate Japanese to Ainu (${dialect}, ${pronoun}): ${bridgedText}`;

  console.debug("Prompt:", prompt);

  try {
    assert(process.env.HF_ENDPOINT, "HF_ENDPOINT is not set");
    assert(process.env.HF_TOKEN, "HF_TOKEN is not set");

    const response = await fetch(process.env.HF_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
      },
      body: JSON.stringify({
        model: "aynumosir/mt5-small-ainu",
        inputs: [prompt],
        parameters: {
          max_length: 128,
          early_stopping: true,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch", { cause: response });
    }

    const data = await response.json();

    return {
      type: "ok",
      text: data?.[0]?.["translation_text"],
      bridged: sourceLanguage !== "ja" && targetLanguage !== "ja",
    };
  } catch (error) {
    console.error(error);
    return {
      type: "error",
      message:
        "サーバーを起動していますので、１〜２分待ってから再度お試しください。費用を削減するため、夜間など利用者が少ない時間帯には自動的に停止しています。",
    };
  }
}
