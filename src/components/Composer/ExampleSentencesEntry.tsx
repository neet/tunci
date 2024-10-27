import clsx from "clsx";
import {
  default as _parse,
  DOMNode,
  domToReact,
  Element,
} from "html-react-parser";
import { useTranslations } from "next-intl";
import { FC, ReactNode } from "react";
import { FiExternalLink, FiMapPin } from "react-icons/fi";

const isElement = (node: DOMNode): node is Element => "name" in node;

export function parse(html: string) {
  return _parse(html, {
    replace: (domNode) => {
      if (isElement(domNode) && domNode.name === "em") {
        return (
          <em className="not-italic bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400">
            {domToReact(domNode.children as DOMNode[])}
          </em>
        );
      }
    },
  });
}

export type ExampleSentencesEntryProps = {
  textHTML: string;
  translationHTML: string;
  book: string;
  title: string;
  url: string;
  dialect: string | null;
};

export const ExampleSentencesEntry: React.FC<ExampleSentencesEntryProps> = (
  props,
) => {
  const { textHTML, translationHTML, book, title, url, dialect } = props;

  const t = useTranslations("components.ExampleSentences");

  return (
    <div>
      <div className="leading-normal">
        <div className="lowercase">{parse(textHTML)}</div>
        <div>{parse(translationHTML)}</div>
      </div>

      <div className="mt-1 flex justify-between items-center">
        <div className="min-w-0 shrink grow-0">
          <p className="text-gray-600 dark:text-zinc-400 truncate text-sm w-full block">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              <span className="sr-only">{t("source")}</span>
              {book}『{title}』
              <FiExternalLink
                aria-hidden
                className="inline-block size-3 mr-1 align-baseline"
              />
            </a>
          </p>
        </div>

        <div className={"shrink-0 grow flex gap-4 justify-end"}>
          {dialect && (
            <Tag icon={<FiMapPin aria-label={t("dialect")} />}>{dialect}</Tag>
          )}
        </div>
      </div>
    </div>
  );
};

export type TagProps = {
  children: ReactNode;
  icon?: ReactNode;
};

export const Tag: FC<TagProps> = (props) => {
  const { icon, children } = props;

  return (
    <div
      className={clsx(
        "flex items-center gap-1",
        "text-sm",
        "text-gray-600 dark:text-zinc-400",
      )}
    >
      {icon && <div>{icon}</div>}
      {children}
    </div>
  );
};
