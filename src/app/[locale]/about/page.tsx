import clsx from "clsx";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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
    title: t("AboutPage.title"),
    description: t("AboutPage.description"),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const Content = (await import(`./${params.locale}.mdx`)).default;

  return (
    <article
      className={clsx(
        "bg-white dark:bg-black",
        "p-4 rounded mx-auto",
        "prose-headings:font-serif",
        "prose prose-zinc prose-a:text-blue-600 prose-a:font-normal dark:prose-invert dark:prose-a:text-blue-400",
      )}
    >
      <Content />
    </article>
  );
}
