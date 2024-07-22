import { FC } from "react";

import { Select } from "../Select";

export const TranslatorPronoun: FC = () => {
  return (
    <Select label="語彙" name="pronoun">
      <option value="first">日常会話</option>
      <option value="fourth">物語</option>
    </Select>
  );
};
