import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Callout, Text } from "@radix-ui/themes";
import { FC, ReactNode } from "react";

export type ErrorMessageProps = {
  children: ReactNode;
};

export const ErrorMessage: FC<ErrorMessageProps> = (props) => {
  const { children } = props;

  return (
    <Callout.Root color="red" role="alert">
      <Callout.Icon>
        <ExclamationTriangleIcon />
      </Callout.Icon>

      <Callout.Text>
        <Text as="p" size="2">
          {children}
        </Text>
      </Callout.Text>
    </Callout.Root>
  );
};
