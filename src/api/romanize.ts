import assert from "assert";

export async function romanize(input: string): Promise<string> {
  assert(process.env.HF_KANA_ENDPOINT, "HF_KANA_ENDPOINT is not set");
  assert(process.env.HF_TOKEN, "HF_TOKEN is not set");

  const response = await fetch(process.env.HF_KANA_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
    },
    body: JSON.stringify({
      inputs: [input],
      parameters: {
        max_length: 128,
        early_stopping: true,
      },
    }),
    next: {
      revalidate: 60 * 60 * 24 * 7,
    },
    signal: AbortSignal.timeout(1000 * 10),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch", { cause: response });
  }

  const data = await response.json();
  const text = data?.[0]?.["generated_text"];

  return text;
}
