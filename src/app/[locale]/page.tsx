import { SearchResponse } from "algoliasearch";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { searchClient } from "@/api/search";
import { Composer } from "@/components/Composer";
import { SearchEntry } from "@/models/entry";

import { fetchAlternativeTranslations, Result, translate } from "./_server";

type HomeProps = {
  params: { locale: string };
  searchParams?: {
    text?: string;
    source?: string;
    target?: string;
    dialect?: string;
    pronoun?: string;
  };
};

export async function generateMetadata(props: HomeProps): Promise<Metadata> {
  const t = await getTranslations({
    locale: props.params.locale,
  });

  return {
    title: t("app.Home.title"),
    description: t("app.Home.description"),
  };
}

export const revalidate = 86_400;

export default async function Home(props: HomeProps) {
  const { params, searchParams } = props;

  setRequestLocale(params.locale);

  const text = searchParams?.text;
  const direction =
    searchParams?.source && searchParams?.target
      ? `${searchParams.source}2${searchParams.target}`
      : "ja2ain";
  const dialect = searchParams?.dialect ?? "沙流";
  const pronoun = searchParams?.pronoun ?? "first";

  let result: Result | undefined;
  if (text) {
    result = await translate(text, {
      direction,
      dialect,
      pronoun,
    });
  }

  let alternativeTranslationsPromise: Promise<string[]> | undefined;
  if (text && result) {
    alternativeTranslationsPromise = fetchAlternativeTranslations(
      text,
      result,
      direction,
      dialect,
      pronoun,
    );
  }

  let exampleSentences: Promise<SearchResponse<SearchEntry>> | undefined;
  if (text && result?.type === "ok") {
    exampleSentences = searchClient.searchSingleIndex<SearchEntry>({
      indexName: "entries",
      searchParams: {
        query: `${result.translation} ${text}`,
        hitsPerPage: 3,
        attributesToHighlight: ["text", "translation"],
        facetFilters: [
          "book:-ニューエクスプレスプラス アイヌ語",
          "book:-アイヌ語鵡川方言日本語‐アイヌ語辞典",
          "book:-アイヌ語會話字典",
        ],
      },
    });
  }

  return (
    <main className="w-full max-w-screen-xl mx-auto">
      <Composer
        method="GET"
        action={`/${params.locale}`}
        defaultValues={{
          text: text ?? "",
          source: searchParams?.source ?? "ja",
          target: searchParams?.target ?? "ain",
          dialect,
          pronoun,
        }}
        translation={result?.type === "ok" ? result.translation : undefined}
        textTranscription={
          result?.type === "ok" ? result.transcriptions.text : undefined
        }
        translationTranscription={
          result?.type === "ok" ? result.transcriptions.translation : undefined
        }
        alternativeTranslationsPromise={alternativeTranslationsPromise}
        exampleSentencesPromise={exampleSentences}
        errorMessage={result?.type === "error" ? result.message : undefined}
      />
    </main>
  );
}
