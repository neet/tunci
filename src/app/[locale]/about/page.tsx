import clsx from "clsx";
import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

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
  unstable_setRequestLocale(params.locale);

  const t = await getTranslations("app.AboutPage");
  const Content = (await import(`./${params.locale}.mdx`)).default;

  return (
    <main>
      <header
        className={clsx(
          "max-w-screen-lg mx-auto my-12",
          "flex flex-col items-center gap-3",
          "px-4 md:px-0",
        )}
      >
        <h2 className="block text-2xl font-bold">{t("title")}</h2>
      </header>

      <article className="bg-white dark:bg-black border-y border-zinc-300 dark:border-zinc-700">
        <div className="max-w-screen-sm mx-auto p-4 prose prose-zinc dark:prose-invert prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-normal">
          <Content />
        </div>
      </article>
    </main>
  );
}
