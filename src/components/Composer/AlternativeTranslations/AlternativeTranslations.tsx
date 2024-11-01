import { useSearchParams } from "next/navigation";
import { FC, Suspense } from "react";

import { AlternativeTranslationsContent } from "./AlternativeTranslationsContent";
import { AlternativeTranslationsSkeleton } from "./AlternativeTranslationsSkeleton";

export type AlternativeTranslationsProps = {
  alternativeTranslationsPromise?: Promise<string[]>;
};

export const AlternativeTranslations: FC<AlternativeTranslationsProps> = (
  props,
) => {
  const { alternativeTranslationsPromise } = props;
  const searchParams = useSearchParams();

  if (!alternativeTranslationsPromise) {
    return null;
  }

  return (
    <Suspense
      key={searchParams.get("text")}
      fallback={<AlternativeTranslationsSkeleton />}
    >
      <AlternativeTranslationsContent
        alternativeTranslationsPromise={alternativeTranslationsPromise}
      />
    </Suspense>
  );
};
