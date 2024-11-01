import { SearchResponse } from "algoliasearch";
import { FC, use } from "react";

import { SearchEntry } from "@/models/entry";

import { ExampleSentencesEntry } from "./ExampleSentencesEntry";
import { ExampleSentencesWrapper } from "./ExampleSentencesWrapper";

export type ExampleSentencesContentProps = {
  exampleSentencesPromise: Promise<SearchResponse<SearchEntry>>;
};

export const ExampleSentencesContent: FC<ExampleSentencesContentProps> = (
  props,
) => {
  const { exampleSentencesPromise } = props;

  const exampleSentences = use(exampleSentencesPromise);

  if (exampleSentences.hits.length === 0) {
    return null;
  }

  return (
    <ExampleSentencesWrapper>
      <ul className="divide-y divide-gray-200 dark:divide-zinc-600">
        {exampleSentences.hits.map((hit) => (
          <li key={hit.objectID} className="py-3">
            <ExampleSentencesEntry
              /* eslint-disable @typescript-eslint/no-explicit-any */
              textHTML={(hit._highlightResult?.text as any).value}
              translationHTML={(hit._highlightResult?.translation as any).value}
              /* eslint-enable @typescript-eslint/no-explicit-any */
              book={hit.book}
              title={hit.title}
              url={hit.url}
              dialect={hit.dialect}
            />
          </li>
        ))}
      </ul>
    </ExampleSentencesWrapper>
  );
};
