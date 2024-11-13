import fs from "fs/promises";
import path from "path";

import { convert } from "./kana_converter";

type File = {
  source: string;
  target: string;
};

const files: File[] = [
  {
    source: path.join(__dirname, "../messages/ain-Latn.json"),
    target: path.join(__dirname, "../messages/ain-Kana.json"),
  },
];

async function main() {
  const checkMode = !!process.env.CHECK;

  for (const file of files) {
    const source = await fs.readFile(file.source, "utf-8");
    const target = await fs.readFile(file.target, "utf-8");

    if (path.extname(file.source) === ".json") {
      const sourceJson = JSON.parse(source);
      const content = convert(sourceJson);
      const contentJSON = JSON.stringify(content, null, 2) + "\n";

      if (checkMode) {
        if (contentJSON !== target) {
          console.error(`[ERROR] ${file.source}`);
          process.exit(1);
        }
      } else {
        await fs.writeFile(file.target, contentJSON);
      }
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
