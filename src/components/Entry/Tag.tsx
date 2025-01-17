import { Flex, Text } from "@radix-ui/themes";
import { FC, ReactNode } from "react";

export type TagProps = {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
};

export const Tag: FC<TagProps> = (props) => {
  const { icon, children } = props;

  return (
    <Text color="gray" size="2">
      <Flex gap="1" align="center">
        {icon}
        {children}
      </Flex>
    </Text>
  );
};
