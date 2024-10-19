import clsx from "clsx";
import { useTranslations } from "next-intl";
import { FC, Suspense, use } from "react";

export type TranslatorAlternativesProps = {
  readonly text: string;
  readonly translationsPromise: Promise<string[]>;
  readonly className?: string;
};

export const TranslatorAlternatives: FC<TranslatorAlternativesProps> = (
  props,
) => {
  const { text, className, translationsPromise } = props;
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
      <h2 className="font-bold leading-relaxed">{t("alternatives")}</h2>

      <div className="mt-2">
        <Suspense fallback={<TranslatorAlternativesSkeleton />} key={text}>
          <TranslatorAlternativesContent
            className="mt-2"
            translationsPromise={translationsPromise}
          />
        </Suspense>
      </div>
    </div>
  );
};

// ---

type TranslatorAlternativesContentProps = {
  readonly translationsPromise: Promise<string[]>;
  readonly className?: string;
};

const TranslatorAlternativesContent: FC<TranslatorAlternativesContentProps> = (
  props,
) => {
  const { className, translationsPromise } = props;
  const translations = use(translationsPromise);

  return (
    <ul className={clsx("space-y-1", className)}>
      {translations.map((translation, index) => (
        <li key={index}>{translation}</li>
      ))}
    </ul>
  );
};

// ---

const TranslatorAlternativesSkeleton = () => {
  return (
    <div className="animate-pulse space-y-2">
      <div className="h-[0.8lh] bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
      <div className="h-[0.8lh] bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
      <div className="h-[0.8lh] bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
    </div>
  );
};
