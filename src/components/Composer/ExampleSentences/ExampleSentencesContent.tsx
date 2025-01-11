/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Reset, Separator } from "@radix-ui/themes";
import { SearchResponse } from "algoliasearch";
import { FC, use } from "react";

import { Entry } from "@/components/Entry";
import { SearchEntry } from "@/models/entry";

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
      <Reset>
        <ul>
          {exampleSentences.hits.map((hit, i) => (
            <Box asChild key={hit.objectID}>
              <Reset>
                <li>
                  <Entry.Root
                    text={hit.text}
                    textHTML={(hit._highlightResult as any).text.value}
                    translation={hit.translation}
                    translationHTML={
                      (hit._highlightResult as any).translation.value
                    }
                    book={hit.book}
                    title={hit.title}
                    url={hit.url}
                    author={hit.author}
                    dialect={hit.dialect}
                  />

                  {i !== exampleSentences.hits.length - 1 && (
                    <Separator size="4" my="3" />
                  )}
                </li>
              </Reset>
            </Box>
          ))}
        </ul>
      </Reset>
    </ExampleSentencesWrapper>
  );
};
