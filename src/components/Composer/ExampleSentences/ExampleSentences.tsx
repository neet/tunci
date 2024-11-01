import { SearchResponse } from "algoliasearch";
import { useSearchParams } from "next/navigation";
import { FC, Suspense } from "react";

import { SearchEntry } from "@/models/entry";

import { ExampleSentencesContent } from "./ExampleSentencesContent";
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
    <Suspense
      key={searchParams.get("text")}
      fallback={<ExampleSentencesSkeleton />}
    >
      <ExampleSentencesContent
        exampleSentencesPromise={exampleSentencesPromise}
      />
    </Suspense>
  );
};
