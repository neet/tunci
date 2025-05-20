import * as Collapsible from "@radix-ui/react-collapsible";
import {
  Card,
  ChevronDownIcon,
  Flex,
  Heading,
  IconButton,
  Tooltip,
  VisuallyHidden,
} from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC, ReactNode, useId, useState } from "react";

export type ComposerCollapsibleProps = {
  title: string;
  children: ReactNode;
};

export const ComposerCollapsible: FC<ComposerCollapsibleProps> = (props) => {
  const { title, children } = props;

  const [open, setOpen] = useState(true);
  const id = useId();
  const t = useTranslations("components.Composer.ComposerCollapsible");

  return (
    <Card role="region" aria-labelledby={id} size="2">
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Flex direction="column" gap="3">
          <Flex justify="between" align="center" width="100%">
            <Heading as="h3" size="3" id={id}>
              {title}
            </Heading>

            <Tooltip content={open ? t("collapse") : t("expand")}>
              <Collapsible.Trigger asChild>
                <IconButton variant="ghost" color="gray">
                  <ChevronDownIcon
                    style={{
                      transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                  <VisuallyHidden>
                    {open ? t("collapse") : t("expand")}
                  </VisuallyHidden>
                </IconButton>
              </Collapsible.Trigger>
            </Tooltip>
          </Flex>

          <Collapsible.Content>{children}</Collapsible.Content>
        </Flex>
      </Collapsible.Root>
    </Card>
  );
};
