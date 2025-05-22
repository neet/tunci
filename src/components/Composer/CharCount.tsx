import { Box, Text } from "@radix-ui/themes";
import { FC } from "react";

export type CharCountProps = {
  count: number;
  limit: number;
};

export const CharCount: FC<CharCountProps> = (props) => {
  const { count, limit } = props;

  const remaining = limit - count;

  return (
    <Box px="2">
      {remaining >= 0 ? (
        <Text size="2" color="gray">
          {count}/{limit}
        </Text>
      ) : (
        <Text size="2" color="red">
          {count}/{limit}
        </Text>
      )}
    </Box>
  );
};
