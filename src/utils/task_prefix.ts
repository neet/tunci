export type CreateInputSequence = {
  // readonly direction: string; // "ja2ain" | "ain2ja";
  readonly source: string;
  readonly target: string;
  readonly dialect: string;
  readonly pronoun: string;
};

export function createInputSequence(
  input: string,
  params: CreateInputSequence,
) {
  const { source, target, dialect, pronoun } = params;

  let prompt: string = "";
  if (source === "ja" && target === "ain") {
    prompt = `translate Japanese to Ainu (${dialect}, ${pronoun}): ${input}`;
  } else if (source === "ain" && target === "ja") {
    prompt = `translate Ainu (${dialect}, ${pronoun}) to Japanese: ${input}`;
  } else {
    throw new Error(`Invalid source and target: ${source}2${target}`);
  }

  return prompt;
}
