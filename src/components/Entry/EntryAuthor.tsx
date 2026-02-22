import { Text, VisuallyHidden } from "@radix-ui/themes";
import { FC } from "react";

type EntryAuthorProps = {
  author: string | null;
  dialect: string | null;
};

export const EntryAuthor: FC<EntryAuthorProps> = (props) => {
  const { author, dialect } = props;

  if (author) {
    return (
      <Text color="gray" size="2">
        <VisuallyHidden>話者：</VisuallyHidden>
        {dialect ? `${author}（${dialect}）` : author}
      </Text>
    );
  }

  if (dialect) {
    return (
      <Text color="gray" size="2">
        <VisuallyHidden>方言：</VisuallyHidden>
        {dialect}
      </Text>
    );
  }

  return null;
};
