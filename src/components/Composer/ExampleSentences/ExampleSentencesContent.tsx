/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Reset, Separator } from "@radix-ui/themes";
import { SearchResponse } from "algoliasearch";
import { FC, use } from "react";

import { Entry } from "@/components/Entry";
import { Entry as EntryType } from "@/models/entry";

import { ExampleSentencesWrapper } from "./ExampleSentencesWrapper";

export type ExampleSentencesContentProps = {
  exampleSentencesPromise: Promise<SearchResponse<EntryType>>;
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
                    objectID={hit.objectID}
                    text={hit.text}
                    textHTML={(hit._highlightResult as any).text.value}
                    translation={hit.translation}
                    translationHTML={
                      (hit._highlightResult as any).translation.value
                    }
                    collectionLv1={hit.collection_lv1}
                    collectionLv2={hit.collection_lv2}
                    collectionLv3={hit.collection_lv3}
                    document={hit.document}
                    uri={hit.uri}
                    author={hit.author}
                    dialect={hit.dialect}
                    dialectLv1={hit.dialect_lv1}
                    dialectLv2={hit.dialect_lv2}
                    dialectLv3={hit.dialect_lv3}
                    recordedAt={hit.recorded_at}
                    publishedAt={hit.published_at}
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
