/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchResponse } from "algoliasearch";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { FC, Suspense, use } from "react";

import { SearchEntry } from "@/models/entry";

import { ExampleSentencesEntry } from "./ExampleSentencesEntry";

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

/*---------------------------------*/

type ExampleSentencesWrapperProps = {
  children: React.ReactNode;
};

export const ExampleSentencesWrapper: FC<ExampleSentencesWrapperProps> = (
  props,
) => {
  const { children } = props;
  const t = useTranslations("components.ExampleSentences");

  return (
    <section className="p-4">
      <h2 className="font-bold text-gray-700 dark:text-zinc-300">
        {t("exampleSentences")}
      </h2>
      {children}
    </section>
  );
};

/*---------------------------------*/

type ExampleSentencesContentProps = {
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
      <ul className="divide-y divide-gray-200 dark:divide-zinc-800">
        {exampleSentences.hits.map((hit) => (
          <li key={hit.objectID} className="py-3">
            <ExampleSentencesEntry
              textHTML={(hit._highlightResult?.text as any).value}
              translationHTML={(hit._highlightResult?.translation as any).value}
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

/*---------------------------------*/

export const ExampleSentencesSkeleton: FC = () => {
  return (
    <ExampleSentencesWrapper>
      <div className="mt-1">
        <div className="space-y-1">
          <div className="w-1/3 h-[1lh] bg-gray-100 dark:bg-zinc-900 forced-colors:bg-[GrayText] rounded animate-pulse" />
          <div className="w-1/2 h-[1lh] bg-gray-100 dark:bg-zinc-900 forced-colors:bg-[GrayText] rounded animate-pulse" />
        </div>

        <div className="mt-2 flex gap-2 justify-between">
          <div className="w-2/4 text-sm h-[1lh] bg-gray-100 dark:bg-zinc-900 forced-colors:bg-[GrayText] rounded animate-pulse" />
          <div className="w-1/4 text-sm h-[1lh] bg-gray-100 dark:bg-zinc-900 forced-colors:bg-[GrayText] rounded animate-pulse" />
        </div>
      </div>
    </ExampleSentencesWrapper>
  );
};
