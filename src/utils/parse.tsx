import {
  default as _parse,
  DOMNode,
  domToReact,
  Element,
} from "html-react-parser";

const isElement = (node: DOMNode): node is Element => "name" in node;

export function parse(html: string) {
  return _parse(html, {
    replace: (domNode) => {
      if (isElement(domNode) && domNode.name === "em") {
        return <em>{domToReact(domNode.children as DOMNode[])}</em>;
      }
    },
  });
}
