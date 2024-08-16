import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Translator } from "@/components/Translator";

import { translate } from "./actions";

type HomeProps = {
  params: { locale: string };
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

export default function Home() {
  return (
    <main className="grow w-full max-w-screen-xl mx-auto">
      <Translator action={translate} className="mt-4" />
    </main>
  );
}
