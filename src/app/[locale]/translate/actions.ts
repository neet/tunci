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
    };

const MAX_LENGTH = 200;

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

  if (text.length > MAX_LENGTH) {
    return {
      type: "error",
      message: `テキストの長さが制限を超えています。${MAX_LENGTH}文字以内にしてください。`,
    };
  }

  if (typeof direction !== "string") {
    return {
      type: "error",
      message: "翻訳方向が不正です。",
    };
  }

  let prompt: string = "";
  if (direction === "ja2ain") {
    prompt = `translate Japanese to Ainu (${dialect}, ${pronoun}): ${text}`;
  } else {
    prompt = `translate Ainu (${dialect}, ${pronoun}) to Japanese: ${text}`;
  }

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