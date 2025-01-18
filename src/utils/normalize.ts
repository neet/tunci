import * as api from "../api";
import { isKana } from "./is_kana";

export const normalize = async (
  text: string,
  source: string,
): Promise<string> => {
  if (source === "ain" && isKana(text)) {
    text = await api.romanize(text);
  }

  text = text.replace(/\n/g, " ").trim();

  return text;
};
