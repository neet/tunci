import assert from "assert";

const dedupe = <T>(arr: T[]): T[] => Array.from(new Set(arr));

const normalize = (text: string): string => text.toLowerCase();

export type BaseTranslateParams = {
  readonly direction: string; // "ja2ain" | "ain2ja";
  readonly dialect: string;
  readonly pronoun: string;
};

export type SingleTranslateParams = BaseTranslateParams & {
  readonly numReturnSequences?: 1;
};

export type MultiTranslateParams = BaseTranslateParams & {
  readonly numReturnSequences: number;
};

export type TranslateParams = SingleTranslateParams | MultiTranslateParams;

type Inference = {
  readonly translation_text: string;
};

export async function translate(
  input: string,
  params: SingleTranslateParams,
): Promise<string>;
export async function translate(
  input: string,
  params: MultiTranslateParams,
): Promise<string[]>;
export async function translate(
  input: string,
  params: TranslateParams,
): Promise<string | string[]> {
  const { direction, dialect, pronoun, numReturnSequences = 1 } = params;

  let prompt: string = "";
  if (direction === "ja2ain") {
    prompt = `translate Japanese to Ainu (${dialect}, ${pronoun}): ${input}`;
  } else {
    prompt = `translate Ainu (${dialect}, ${pronoun}) to Japanese: ${input}`;
  }

  assert(process.env.HF_MT_ENDPOINT, "HF_ENDPOINT is not set");
  assert(process.env.HF_TOKEN, "HF_TOKEN is not set");

  const parameters: Record<string, unknown> = {
    max_length: 128,
    early_stopping: true,
  };

  if (numReturnSequences > 1) {
    parameters.num_return_sequences = numReturnSequences;
    parameters.do_sample = true;
  }

  const response = await fetch(process.env.HF_MT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
    },
    body: JSON.stringify({
      inputs: [prompt],
      parameters,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch", { cause: response });
  }

  // TODO: refactor
  if (numReturnSequences === 1) {
    const results = (await response.json()) as Inference[];
    return normalize(results[0].translation_text);
  } else {
    const results = (await response.json()) as Inference[][];
    return dedupe(results[0].map((r) => normalize(r.translation_text)));
  }
}
