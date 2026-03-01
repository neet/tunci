/* eslint-disable no-control-regex */
import { default as ainu } from "ainu-utils";
import fs from "fs/promises";
import path from "path";

const MUSTACHE = /\{(.+?)\}/g;
const HTML_TAG = /<[^>]+>/g;
const NON_ASCII = /[^\x00-\x7F]+/g;
const SYMBOL = /\x00([0-9]+)\x00/g;

function safeConvertToKana(text: string) {
  let counter = 0;
  const registry = new Map<string, string>();

  const escape = (match: string) => {
    const key = `\x00${counter++}\x00`;
    registry.set(key, match);
    return key;
  };

  let safeText = text.replace(MUSTACHE, escape);
  safeText = safeText.replace(HTML_TAG, escape);
  safeText = safeText.replace(NON_ASCII, escape);
  safeText = safeText.replace(/'/g, "'");
  safeText = safeText.replace(/’/g, "'");

  const kana = ainu.to_kana(safeText);

  return kana.replace(SYMBOL, (match, p1) => {
    return registry.get(`\x00${p1}\x00`) || match;
  });
}

function convert(record: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]): [string, unknown] => {
      if (typeof value === "string") {
        return [key, safeConvertToKana(value)];
      }
      return [key, convert(value as Record<string, unknown>)];
    }),
  );
}

const files = [
  {
    source: path.join(__dirname, "../messages/ain-Latn.json"),
    target: path.join(__dirname, "../messages/ain-Kana.json"),
  },
];

async function main() {
  for (const file of files) {
    const source = await fs.readFile(file.source, "utf-8");

    if (path.extname(file.source) === ".json") {
      const sourceJson = JSON.parse(source);
      const content = convert(sourceJson);
      const contentJSON = JSON.stringify(content, null, 2) + "\n";
      await fs.writeFile(file.target, contentJSON);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
