import * as Collapsible from "@radix-ui/react-collapsible";
import { Card, ChevronDownIcon, Flex, Heading, Reset } from "@radix-ui/themes";
import { FC, ReactNode, useId, useState } from "react";

export type ComposerCollapsibleProps = {
  title: string;
  children: ReactNode;
};

export const ComposerCollapsible: FC<ComposerCollapsibleProps> = (props) => {
  const { title, children } = props;

  const [open, setOpen] = useState(true);
  const id = useId();

  return (
    <Card role="region" aria-labelledby={id} size="2">
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Flex direction="column" gap="3">
          <Collapsible.Trigger asChild>
            <Flex justify="between" align="center" width="100%" asChild>
              <Reset>
                <button style={{ width: "100%" }}>
                  <Heading as="h3" size="3" id={id}>
                    {title}
                  </Heading>

                  <ChevronDownIcon
                    style={{
                      transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
              </Reset>
            </Flex>
          </Collapsible.Trigger>

          <Collapsible.Content>{children}</Collapsible.Content>
        </Flex>
      </Collapsible.Root>
    </Card>
  );
};
