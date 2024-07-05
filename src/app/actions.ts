"use server";

import { HfInferenceEndpoint } from "@huggingface/inference";

export type Result = {
  type: 'error',
  message: string,
} | {
  type: 'ok',
  text: string,
}

export async function translate(_prevData: unknown, formData: FormData): Promise<Result> {
  const inference = new HfInferenceEndpoint(process.env.HF_ENDPOINT!, process.env.HF_TOKEN)

  const text = formData.get("text");
  const direction = formData.get("direction");
  const pronoun = formData.get("pronoun") ?? "first";
  const dialect = formData.get("dialect") ?? "沙流"

  console.info({
    text,
    direction,
    pronoun,
    dialect,
  })

  if (typeof text !== "string" || text.length === 0) {
    return {
      type: "error",
      message: "テキストが入力されていません。"
    };
  }

  const MAX_LENGTH = 512;
  if (text.length > MAX_LENGTH) {
    return {
      type: "error",
      message: `テキストの長さが制限を超えています。${MAX_LENGTH}文字以内にしてください。`
    }
  }

  if (typeof direction !== "string") {
    return {
      type: "error",
      message: "翻訳方向が不正です。"
    }
  }

  let prompt: string = ""
  if (direction === "ja2ain") {
    prompt = `translate: Japanese to Ainu (${dialect}, ${pronoun}): ${text}`
  } else {
    prompt = `translate: Ainu (${dialect}, ${pronoun}) to Japanese: ${text}`
  }

  console.info(prompt)

  try {
    const result = await inference.request({
      model: "aynumosir/mt5-small-ainu",
      inputs: prompt,
      parameters: {
        max_length: 128,
        early_stopping: true,
      },
    });


    if (!Array.isArray(result)) {
      return {
        type: "error",
        message: "翻訳に失敗しました。"
      }
    }
  
    return {
      type: "ok",
      text: result[0].translation_text
    }
  } catch (error) {
    console.error(error)

    return {
      type: "error",
      message: "翻訳に失敗しました。サーバーが再起動中の場合がありますので、しばらく待ってから再度お試しください。"
    }
  }
}
