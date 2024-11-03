import { FC } from "react";

import { ExampleSentencesWrapper } from "./ExampleSentencesWrapper";

export const ExampleSentencesError: FC = () => {
  return (
    <ExampleSentencesWrapper>
      <p className="text-red-600 dark:text-red-400">
        データ取得中にエラーが発生しました。時間をおいて再度お試しください。
      </p>
    </ExampleSentencesWrapper>
  );
};
