import clsx from "clsx";
import mixpanel from "mixpanel-browser";
import { useTranslations } from "next-intl";
import { FC, use, useId, useState } from "react";

export type TranslatorAlternativesProps = {
  readonly text: string;
  readonly translationsPromise: Promise<string[]>;
  readonly className?: string;
};

export const TranslatorAlternatives: FC<TranslatorAlternativesProps> = (
  props,
) => {
  const { className, translationsPromise } = props;

  const translations = use(translationsPromise);
  const contentId = useId();
  const t = useTranslations("components.TranslatorAlternatives");
  const [expanded, setExpanded] = useState(false);

  if (translations.length === 0) {
    return null;
  }

  const handleExpand = (): void => {
    setExpanded((prev) => !prev);
    document.getElementById(contentId)?.focus();

    mixpanel.track("Translator::alternatives::expand", {
      expanded: !expanded,
    });
  };

  return (
    <div
      className={clsx(
        "rounded-lg",
        "p-3",
        "bg-zinc-100 border-zinc-300 border",
        "dark:bg-zinc-900 dark:border-zinc-600",
        className,
      )}
    >
      <header className="flex justify-between items-center">
        <h2 className="font-bold leading-relaxed block">{t("alternatives")}</h2>
      </header>

      <div className="mt-2">
        <TranslatorAlternativesContent
          id={contentId}
          className="mt-2"
          expanded={expanded}
          translations={translations}
        />
      </div>

      <TranslatorAlternativesExpandButton
        className="mt-2"
        expanded={expanded}
        contentId={contentId}
        translations={translations}
        handleExpand={handleExpand}
      />
    </div>
  );
};

// ---

type TranslatorAlternativesContentProps = {
  readonly id: string;
  readonly translations: string[];
  readonly expanded?: boolean;
  readonly className?: string;
};

const TranslatorAlternativesContent: FC<TranslatorAlternativesContentProps> = (
  props,
) => {
  const { id, className, expanded, translations } = props;
  const translationsToShow = expanded ? translations : translations.slice(0, 1);

  return (
    <ul
      id={id}
      className={clsx(
        "space-y-1",
        "focus-visible:outline outline-2 outline-blue-500",
        className,
      )}
      tabIndex={-1}
    >
      {translationsToShow.map((translation, index) => (
        <li
          key={index}
          className={clsx("leading-relaxed", expanded ? "" : "w-full truncate")}
        >
          {translation}
        </li>
      ))}
    </ul>
  );
};

// ---

type TranslatorAlternativesExpandButtonProps = {
  readonly className?: string;
  readonly expanded: boolean;
  readonly contentId: string;
  readonly translations: string[];
  readonly handleExpand: () => void;
};

const TranslatorAlternativesExpandButton: FC<
  TranslatorAlternativesExpandButtonProps
> = (props) => {
  const { className, expanded, contentId, translations, handleExpand } = props;
  const t = useTranslations("components.TranslatorAlternatives");
  const count = translations.length;

  if (count <= 1) {
    return null;
  }

  return (
    <button
      type="button"
      className={clsx("text-zinc-600 dark:text-zinc-400 underline", className)}
      aria-expanded={expanded}
      aria-controls={contentId}
      onClick={handleExpand}
    >
      {expanded ? t("collapse") : t("expand", { count: count - 1 })}
    </button>
  );
};

// ---

export type TranslatorAlternativesSkeletonProps = {
  readonly className?: string;
};

export const TranslatorAlternativesSkeleton: FC<
  TranslatorAlternativesSkeletonProps
> = (props) => {
  const { className } = props;
  const t = useTranslations("components.TranslatorAlternatives");

  return (
    <div
      className={clsx(
        "rounded-lg",
        "p-3",
        "bg-zinc-100 border-zinc-300 border",
        "dark:bg-zinc-900 dark:border-zinc-600",
        className,
      )}
    >
      <header className="flex justify-between items-center">
        <h2 className="font-bold leading-relaxed block">{t("alternatives")}</h2>
      </header>

      <div className="animate-pulse space-y-2">
        <div className="h-[0.8lh] bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
        <div className="h-[0.8lh] bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
      </div>
    </div>
  );
};
