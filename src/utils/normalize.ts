import * as api from "../api";
import { isKana } from "./is_kana";

export const normalize = async (
  text: string,
  direction: string,
): Promise<string> => {
  if (direction === "ain2ja" && isKana(text)) {
    text = await api.romanize(text);
  }

  text = text.replace(/\n/g, " ").trim();

  return text;
};
