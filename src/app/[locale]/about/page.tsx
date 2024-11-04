import clsx from "clsx";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export type AboutPageProps = {
  params: { locale: string };
};

export async function generateMetadata(
  props: AboutPageProps,
): Promise<Metadata> {
  const t = await getTranslations({
    locale: props.params.locale,
  });

  return {
    title: t("app.AboutPage.title"),
    description: t("app.AboutPage.description"),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  setRequestLocale(params.locale);

  const t = await getTranslations("app.AboutPage");
  const Content = (await import(`./${params.locale}.mdx`)).default;

  return (
    <main className="w-full max-w-screen-sm mx-auto">
      <header className={clsx("my-12", "px-4 md:px-0")}>
        <h2 className="block text-2xl font-bold text-center">{t("title")}</h2>
      </header>

      <article className="bg-white dark:bg-black mx-auto p-4 prose prose-gray dark:prose-zinc dark:prose-invert prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:font-normal overflow-clip">
        <Content />
      </article>
    </main>
  );
}
