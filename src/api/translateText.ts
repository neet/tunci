import assert from "assert";

export type TranslateParams = {
  direction: string; // "ja2ain" | "ain2ja";
  dialect: string;
  pronoun: string;
};

export async function translateText(
  input: string,
  params: TranslateParams,
): Promise<string> {
  const { direction, dialect, pronoun } = params;

  let prompt: string = "";
  if (direction === "ja2ain") {
    prompt = `translate Japanese to Ainu (${dialect}, ${pronoun}): ${input}`;
  } else {
    prompt = `translate Ainu (${dialect}, ${pronoun}) to Japanese: ${input}`;
  }

  assert(process.env.HF_MT_ENDPOINT, "HF_ENDPOINT is not set");
  assert(process.env.HF_TOKEN, "HF_TOKEN is not set");

  const response = await fetch(process.env.HF_MT_ENDPOINT, {
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
  const translation = data?.[0]?.["translation_text"];

  return translation;
}
