import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Badge,
  DataList,
  Dialog,
  IconButton,
  Link,
  Text,
  Tooltip,
  VisuallyHidden,
} from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC } from "react";

export type EntryDetailsDialogProps = {
  book: string;
  title: string;
  author: string | null;
  dialect: string | null;
  url: string;
};

export const EntryDetailsDialog: FC<EntryDetailsDialogProps> = (props) => {
  const { book, title, author, dialect, url } = props;

  const t = useTranslations("components.Entry.EntryDetailsDialog");

  return (
    <Dialog.Root>
      <Tooltip content={t("title")}>
        <Dialog.Trigger>
          <IconButton variant="ghost" color="gray">
            <DotsHorizontalIcon />
            <VisuallyHidden>{t("title")}</VisuallyHidden>
          </IconButton>
        </Dialog.Trigger>
      </Tooltip>

      <Dialog.Content>
        <Dialog.Title>{t("title")}</Dialog.Title>
        <Dialog.Description>
          <Text color="gray">{t("description")}</Text>
        </Dialog.Description>

        <DataList.Root mt="4">
          <DataList.Item>
            <DataList.Label>{t("book")}</DataList.Label>
            <DataList.Value>{book}</DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>{t("entryTitle")}</DataList.Label>
            <DataList.Value>{title}</DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>{t("author")}</DataList.Label>
            <DataList.Value>{author}</DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>{t("dialect")}</DataList.Label>
            <DataList.Value>
              <Badge>{dialect}</Badge>
            </DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>{t("url")}</DataList.Label>
            <DataList.Value>
              <Link href={url} target="_blank" rel="noreferrer">
                {url}
              </Link>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};
