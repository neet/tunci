import { SearchResponse } from "algoliasearch";
import { useSearchParams } from "next/navigation";
import { FC, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { SearchEntry } from "@/models/entry";

import { ExampleSentencesContent } from "./ExampleSentencesContent";
import { ExampleSentencesError } from "./ExampleSentencesError";
import { ExampleSentencesSkeleton } from "./ExampleSentencesSkeleton";

export type ExampleSentencesProps = {
  exampleSentencesPromise?: Promise<SearchResponse<SearchEntry>>;
};

export const ExampleSentences: FC<ExampleSentencesProps> = (props) => {
  const { exampleSentencesPromise } = props;

  const searchParams = useSearchParams();

  if (!exampleSentencesPromise) {
    return null;
  }

  return (
    <ErrorBoundary fallback={<ExampleSentencesError />}>
      <Suspense
        key={searchParams.get("text")}
        fallback={<ExampleSentencesSkeleton />}
      >
        <ExampleSentencesContent
          exampleSentencesPromise={exampleSentencesPromise}
        />
      </Suspense>
    </ErrorBoundary>
  );
};
