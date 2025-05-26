import { Flex, Link, Reset, Section, Separator, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import { FC } from "react";

export const ContentInfo: FC = async () => {
  const titleId = "contentinfo-title";

  return (
    <Section size="1" asChild>
      <footer aria-labelledby={titleId}>
        <Reset>
          <Flex asChild justify="center" align="center" gap="3">
            <ul>
              <li>
                <Link size="2" asChild>
                  <NextLink
                    rel="alternate"
                    href="/ain-Latn"
                    hrefLang="ain-Latn"
                  >
                    Aynu itak
                  </NextLink>
                </Link>
              </li>

              <Separator orientation="vertical" aria-hidden />

              <li>
                <Link size="2" asChild>
                  <NextLink
                    rel="alternate"
                    href="/ain-Kana"
                    hrefLang="ain-Kana"
                  >
                    アイヌイタㇰ
                  </NextLink>
                </Link>
              </li>

              <Separator orientation="vertical" aria-hidden />

              <li>
                <Link size="2" asChild>
                  <NextLink rel="alternate" href="/ja" hrefLang="ja">
                    日本語
                  </NextLink>
                </Link>
              </li>
            </ul>
          </Flex>
        </Reset>

        <Text as="p" size="2" align="center" mt="2" color="gray">
          Copyright
          <Text mx="1" aria-hidden>
            ©
          </Text>
          2025 Ryō Igarashi, All rights reserved.
        </Text>
      </footer>
    </Section>
  );
};
