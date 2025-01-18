import { Card, Container, Heading, Section } from "@radix-ui/themes";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  props: AboutPageProps,
): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
  });

  return {
    title: t("app.AboutPage.title"),
    description: t("app.AboutPage.description"),
  };
}

export default async function AboutPage(props: AboutPageProps) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const t = await getTranslations("app.AboutPage");
  const Content = (await import(`./${params.locale}.mdx`)).default;

  return (
    <Container asChild size="2" p="4">
      <main>
        <Section>
          <Heading as="h2" align="center">
            {t("title")}
          </Heading>
        </Section>

        <Card size="2">
          <article>
            <Content />
          </article>
        </Card>
      </main>
    </Container>
  );
}
