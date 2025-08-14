import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";
import { FC, ReactNode } from "react";

export type ErrorMessageProps = {
  children: ReactNode;
};

export const ErrorMessage: FC<ErrorMessageProps> = (props) => {
  const { children } = props;

  return (
    <Callout.Root color="red" role="alert">
      <Callout.Icon>
        <ExclamationTriangleIcon aria-hidden />
      </Callout.Icon>

      <Callout.Text size="2">{children}</Callout.Text>
    </Callout.Root>
  );
};
