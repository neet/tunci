import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Code,
  DataList,
  Dialog,
  IconButton,
  Link,
  Text,
  VisuallyHidden,
} from "@radix-ui/themes";
import { FC } from "react";

import { toHref } from "@/utils/uri";

import { Hierarchy } from "../Hierarchy/Hierarchy";
import { Timestamp } from "../Timestamp";

const NoData = () => <Text color="gray">データなし</Text>;

export type EntryDetailsDialogProps = {
  objectID: string;
  document: string;
  collectionLv1: string | null;
  collectionLv2: string | null;
  collectionLv3: string | null;
  author: string | null;
  dialect: string | null;
  dialectLv1: string[] | null;
  dialectLv2: string[] | null;
  dialectLv3: string[] | null;
  uri: string | null;
  recordedAt: string | null;
  publishedAt: string | null;
};

export const EntryDetailsDialog: FC<EntryDetailsDialogProps> = (props) => {
  const {
    objectID,
    collectionLv1,
    collectionLv2,
    collectionLv3,
    document,
    author,
    dialect,
    uri,
    recordedAt,
    publishedAt,
  } = props;

  const href = uri ? toHref(uri) : null;

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton variant="ghost" color="gray">
          <DotsHorizontalIcon />
          <VisuallyHidden>詳細</VisuallyHidden>
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>詳細</Dialog.Title>
        <Dialog.Description>
          <Text color="gray">
            この資料の詳細情報です。一部不正確な情報が含まれる可能性があります。
          </Text>
        </Dialog.Description>

        <DataList.Root mt="4">
          <DataList.Item>
            <DataList.Label>ID</DataList.Label>
            <DataList.Value>
              <Code>{objectID}</Code>
            </DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>出典</DataList.Label>
            <DataList.Value>
              {collectionLv3 || collectionLv2 || collectionLv1 ? (
                <Hierarchy>
                  {collectionLv3 ?? collectionLv2 ?? collectionLv1}
                </Hierarchy>
              ) : (
                <NoData />
              )}
            </DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>タイトル</DataList.Label>
            <DataList.Value>{document}</DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>著者</DataList.Label>
            <DataList.Value>{author ?? <NoData />}</DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>方言</DataList.Label>
            <DataList.Value>
              {dialect ? <Badge>{dialect}</Badge> : <NoData />}
            </DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>記録日</DataList.Label>
            <DataList.Value>
              {recordedAt ? (
                <Timestamp value={recordedAt} mode="full" />
              ) : (
                <NoData />
              )}
            </DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>公開日</DataList.Label>
            <DataList.Value>
              {publishedAt ? (
                <Timestamp value={publishedAt} mode="full" />
              ) : (
                <NoData />
              )}
            </DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>URI</DataList.Label>
            <DataList.Value>
              {href && (
                <Link href={href} target="_blank" rel="noreferrer">
                  {uri}
                </Link>
              )}
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};
