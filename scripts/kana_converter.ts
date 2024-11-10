import { to_kana } from "ainu-utils";

const MUSTACHE = /\{(.+?)\}/g;
const SYMBOL = /\$([0-9]+)/g;

function safeConvertToKana(text: string) {
  const counter = 0;
  const registry = new Map<string, string>();

  let safeText = text.replace(MUSTACHE, (match) => {
    const key = `$${counter}`;
    registry.set(key, match);
    return key;
  });
  safeText = safeText.replace(/’/g, "'");

  const kana = to_kana(safeText);

  return kana.replace(SYMBOL, (match, p1) => {
    return registry.get(`$${p1}`) || match;
  });
}

export function convert(record: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]): [string, unknown] => {
      if (typeof value === "string") {
        return [key, safeConvertToKana(value)];
      }
      return [key, convert(value as Record<string, unknown>)];
    }),
  );
}
