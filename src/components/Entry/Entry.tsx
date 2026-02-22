import "./style.css";

import { ExternalLinkIcon } from "@radix-ui/react-icons";
import {
  Box,
  Flex,
  Link,
  Skeleton,
  Text,
  VisuallyHidden,
} from "@radix-ui/themes";
import { FC } from "react";

import { parse } from "@/utils/parse";
import { toHref } from "@/utils/uri";

import { Timestamp } from "../Timestamp";
import { EntryAuthor } from "./EntryAuthor";
import { EntryDetailsDialog } from "./EntryDetailsDialog";

export type EntryRootProps = {
  objectID: string;
  document: string;
  text: string;
  textHTML: string;
  translation: string;
  translationHTML: string;
  collectionLv1: string | null;
  collectionLv2: string | null;
  collectionLv3: string | null;
  uri: string | null;
  author: string | null;
  dialect: string | null;
  dialectLv1: string[] | null;
  dialectLv2: string[] | null;
  dialectLv3: string[] | null;
  recordedAt: string | null;
  publishedAt: string | null;
};

const EntryRoot: React.FC<EntryRootProps> = (props) => {
  const {
    objectID,
    textHTML,
    translationHTML,
    collectionLv1,
    collectionLv2,
    collectionLv3,
    document,
    uri,
    author,
    dialect,
    dialectLv1,
    dialectLv2,
    dialectLv3,
    recordedAt,
    publishedAt,
  } = props;

  const href = uri ? toHref(uri) : null;

  return (
    <div className="entry">
      <Flex gap="2" direction={{ initial: "column", md: "row" }}>
        <Box flexGrow="1" flexShrink="1" flexBasis="100%" asChild>
          <Text asChild>
            <blockquote lang="ain">{parse(textHTML)}</blockquote>
          </Text>
        </Box>
        <Box flexGrow="1" flexShrink="1" flexBasis="100%" asChild>
          <Text asChild>
            <blockquote lang="ja">{parse(translationHTML)}</blockquote>
          </Text>
        </Box>
      </Flex>

      <Flex gap="2" justify="between" align="center" mt="1">
        {href && (
          <Box flexGrow="0" flexShrink="1" minWidth="0px" asChild>
            <Flex align="center">
              <Link
                href={href}
                target="_blank"
                rel="nofollow"
                truncate
                size="2"
                color="gray"
              >
                <VisuallyHidden>出典：</VisuallyHidden>
                <cite>
                  {collectionLv1 ?? document}
                  {(recordedAt || publishedAt) && (
                    <>
                      {"（"}
                      <Timestamp
                        mode="year_only"
                        value={recordedAt ?? publishedAt}
                      />
                      {"）"}
                    </>
                  )}
                </cite>
              </Link>

              <Box flexShrink="0" flexGrow="0" asChild>
                <ExternalLinkIcon aria-hidden color="gray" />
              </Box>
            </Flex>
          </Box>
        )}

        <Flex gap="1" flexGrow="1" flexShrink="0" justify="end" align="center">
          {(author || dialect) && (
            <Box flexGrow="1" flexShrink="0" asChild>
              <EntryAuthor author={author} dialect={dialect} />
            </Box>
          )}

          <EntryDetailsDialog
            objectID={objectID}
            collectionLv1={collectionLv1}
            collectionLv2={collectionLv2}
            collectionLv3={collectionLv3}
            document={document}
            author={author}
            dialect={dialect}
            dialectLv1={dialectLv1}
            dialectLv2={dialectLv2}
            dialectLv3={dialectLv3}
            uri={uri}
            recordedAt={recordedAt}
            publishedAt={publishedAt}
          />
        </Flex>
      </Flex>
    </div>
  );
};

const EntrySkeleton: FC = () => {
  return (
    <div>
      <Flex gap="2" direction={{ initial: "column", md: "row" }}>
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
