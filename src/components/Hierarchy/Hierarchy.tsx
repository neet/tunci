import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import { FC, ReactNode, useMemo } from "react";

export type HierarchyProps = {
  children: string | null;
};

export const Hierarchy: FC<HierarchyProps> = (props) => {
  const { children } = props;

  const nodes = useMemo(() => {
    const nodes: ReactNode[] = [];

    if (!children) {
      return null;
    }

    for (const [key, fragment] of Object.entries(children.split("/"))) {
      if (nodes.length !== 0) {
        nodes.push(<ChevronRightIcon color="gray" key={key} aria-label="→" />);
      }

      nodes.push(fragment);
    }

    return nodes;
  }, [children]);

  if (!nodes) {
    return null;
  }

  return (
    <Flex align="center" wrap="wrap">
      {nodes}
    </Flex>
  );
};
