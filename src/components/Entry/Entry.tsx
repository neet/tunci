import "./style.css";

import {
  ExternalLinkIcon,
  PersonIcon,
  SewingPinIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Flex,
  Link,
  Skeleton,
  Text,
  VisuallyHidden,
} from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC } from "react";

import { parse } from "@/utils/parse";

import { EntryDetailsDialog } from "./EntryDetailsDialog";
import { Tag } from "./Tag";

export type EntryRootProps = {
  text: string;
  textHTML: string;
  translation: string;
  translationHTML: string;
  book: string;
  title: string;
  url: string;
  author: string | null;
  dialect: string | null;
};

const EntryRoot: React.FC<EntryRootProps> = (props) => {
  const { textHTML, translationHTML, book, title, url, author, dialect } =
    props;

  const t = useTranslations("components.Entry.Entry");

  return (
    <div className="entry">
      <Flex gap="1" direction="column">
        <Text asChild>
          <blockquote lang="ain">{parse(textHTML)}</blockquote>
        </Text>
        <Text asChild>
          <blockquote lang="jpn">{parse(translationHTML)}</blockquote>
        </Text>
      </Flex>

      <Flex gap="1" justify="between" align="center" mt="2">
        <Box flexGrow="0" flexShrink="1" minWidth="0px" asChild>
          <Link
            href={url}
            target="_blank"
            rel="nofollow"
            truncate
            size="2"
            color="gray"
          >
            <VisuallyHidden>{t("source")}</VisuallyHidden>
            <cite>{book}</cite>
            <Box display="inline-block" ml="1">
              <ExternalLinkIcon aria-hidden />
            </Box>
          </Link>
        </Box>

        <Flex gap="2" flexGrow="1" flexShrink="0" justify="end" align="center">
          {author && (
            <Box flexGrow="1" flexShrink="0" asChild>
              <Tag icon={<PersonIcon aria-label={t("author")} />}>{author}</Tag>
            </Box>
          )}

          {dialect && (
            <Box flexGrow="1" flexShrink="0" asChild>
              <Tag icon={<SewingPinIcon aria-label={t("dialect")} />}>
                {dialect}
              </Tag>
            </Box>
          )}

          <EntryDetailsDialog
            book={book}
            title={title}
            author={author}
            dialect={dialect}
            url={url}
          />
        </Flex>
      </Flex>
    </div>
  );
};

const EntrySkeleton: FC = () => {
  return (
    <div>
      <Flex gap="2" direction="column">
        <Box flexGrow="1" flexShrink="1" flexBasis="100%" asChild>
          <Skeleton>
            <Text>irankarapte tanto sirpirka wa!</Text>
          </Skeleton>
        </Box>
        <Box flexGrow="1" flexShrink="1" flexBasis="100%" asChild>
          <Skeleton>
            <Text>こんにちは。今日は天気がいいですね！</Text>
          </Skeleton>
        </Box>
      </Flex>

      <Flex gap="2" justify="between" align="center" mt="1">
        <div>
          <Skeleton>
            <Link size="2">アイヌ語アーカイブ</Link>
          </Skeleton>
        </div>
      </Flex>
    </div>
  );
};

export const Entry = {
  Root: EntryRoot,
  Skeleton: EntrySkeleton,
};
