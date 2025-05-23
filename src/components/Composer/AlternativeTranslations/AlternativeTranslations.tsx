import "./AlternativeTranslations.css";

import { useSearchParams } from "next/navigation";
import { FC, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { AlternativeTranslationsContent } from "./AlternativeTranslationsContent";
import { AlternativeTranslationsError } from "./AlternativeTranslationsError";
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
    <ErrorBoundary fallback={<AlternativeTranslationsError />}>
      <Suspense
        key={searchParams.get("text")}
        fallback={<AlternativeTranslationsSkeleton />}
      >
        <AlternativeTranslationsContent
          alternativeTranslationsPromise={alternativeTranslationsPromise}
        />
      </Suspense>
    </ErrorBoundary>
  );
};
