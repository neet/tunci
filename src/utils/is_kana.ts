const KANA_PATTERN = /[ア-ン゛゜ァ-ォャ-ョー]/;

export const isKana = (text: string): boolean => KANA_PATTERN.test(text);
