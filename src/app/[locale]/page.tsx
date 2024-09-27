import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Translator } from "@/components/Translator";

import { Result, translate } from "./_server";

type HomeProps = {
  params: { locale: string };
  searchParams?: {
    text?: string;
    direction?: string;
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
  const { searchParams } = props;

  const text = searchParams?.text;
  const direction = searchParams?.direction ?? "ja2ain";
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

  return (
    <main className="w-full max-w-screen-xl mx-auto">
      <Translator
        className="mt-4"
        text={text}
        textTranscription={
          result?.type === "ok" ? result.transcriptions.text : undefined
        }
        translation={result?.type === "ok" ? result.translation : undefined}
        translationTranscription={
          result?.type === "ok" ? result.transcriptions.translation : undefined
        }
        errorMessage={result?.type === "error" ? result.message : undefined}
        direction={direction}
        dialect={dialect}
        pronoun={pronoun}
      />
    </main>
  );
}
