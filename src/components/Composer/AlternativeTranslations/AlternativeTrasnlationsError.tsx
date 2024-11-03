import { FC } from "react";

import { AlternativeTranslationsWrapper } from "./AlternativeTranslationsWrapper";

export const AlternativeTranslationsError: FC = () => {
  return (
    <AlternativeTranslationsWrapper>
      <p className="text-red-600 dark:text-red-400">
        データ取得中にエラーが発生しました。時間をおいて再度お試しください。
      </p>
    </AlternativeTranslationsWrapper>
  );
};
