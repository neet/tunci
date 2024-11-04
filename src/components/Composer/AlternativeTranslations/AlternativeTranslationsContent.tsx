import { FC, use } from "react";

import { AlternativeTranslationsWrapper } from "./AlternativeTranslationsWrapper";

export type AlternativeTranslationsContentProps = {
  alternativeTranslationsPromise: Promise<string[]>;
};

export const AlternativeTranslationsContent: FC<
  AlternativeTranslationsContentProps
> = (props) => {
  const { alternativeTranslationsPromise } = props;
  const alternativeTranslations = use(alternativeTranslationsPromise);

  if (alternativeTranslations.length <= 0) {
    return null;
  }

  return (
    <AlternativeTranslationsWrapper>
      <ul className="mt-2 space-y-1 text-gray-600 dark:text-zinc-400 list-disc list-outside pl-4 text-xl">
        {alternativeTranslations.map((alternativeTranslation, index) => (
          <li key={index}>{alternativeTranslation}</li>
        ))}
      </ul>
    </AlternativeTranslationsWrapper>
  );
};
