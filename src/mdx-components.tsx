import { Heading, Link } from "@radix-ui/themes";
import type { MDXComponents } from "mdx/types";

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    ...components,
    h1: ({ children }) => <Heading as="h1">{children}</Heading>,
    h2: ({ children }) => <Heading as="h2">{children}</Heading>,
    h3: ({ children }) => <Heading as="h3">{children}</Heading>,
    h4: ({ children }) => <Heading as="h4">{children}</Heading>,
    h5: ({ children }) => <Heading as="h5">{children}</Heading>,
    h6: ({ children }) => <Heading as="h6">{children}</Heading>,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    a: ({ children, ...rest }) => <Link {...rest}>{children}</Link>,
  };
}
