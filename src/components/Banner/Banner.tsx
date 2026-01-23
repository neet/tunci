import "./Banner.css";

import { Container, Flex, Heading, Link } from "@radix-ui/themes";
import { getTranslations } from "next-intl/server";
import { FC } from "react";

import { Link as NextLink } from "@/i18n/routing";

import { Logo } from "./Logo";

export const Banner: FC = async () => {
  const t = await getTranslations("components.Banner");

  return (
    <Container asChild size="4" p="4" className="Banner">
      <header>
        <Flex justify="between" align="center">
          <Flex gap="4" align="center">
            <Link asChild>
              <NextLink href="/" className="logo-link">
                <Flex gap="2" align="center">
                  <Logo className="logo" aria-hidden />
                  <Heading as="h1" size="6" className="title" weight="regular">
                    Tunci
                  </Heading>
                </Flex>
              </NextLink>
            </Link>
          </Flex>

          <Link asChild>
            <NextLink href="/about">{t("about")}</NextLink>
          </Link>
        </Flex>
      </header>
    </Container>
  );
};
