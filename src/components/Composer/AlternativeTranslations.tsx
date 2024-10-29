import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { FC, ReactNode, Suspense, use } from "react";

import { Disclosure } from "./Disclosure";

type AlternativeTranslationsProps = {
  alternativeTranslationsPromise?: Promise<string[]>;
};

export const AlternativeTranslations: FC<AlternativeTranslationsProps> = (
  props,
) => {
  const { alternativeTranslationsPromise } = props;
  const searchParams = useSearchParams();

  if (!alternativeTranslationsPromise) {
    return null;
  }

  return (
    <Suspense
      key={searchParams.get("text")}
      fallback={<AlternativeTranslationsSkeleton />}
    >
      <AlternativeTranslationsContent
        alternativeTranslationsPromise={alternativeTranslationsPromise}
      />
    </Suspense>
  );
};

/*-----------------------------------------*/

type AlternativeTranslationsWrapperProps = {
  children: ReactNode;
};

const AlternativeTranslationsWrapper: FC<
  AlternativeTranslationsWrapperProps
> = (props) => {
  const { children } = props;
  const t = useTranslations("components.Composer");

  return (
    <Disclosure open={true} summary={<h2>{t("alternativeTranslations")}</h2>}>
      {children}
    </Disclosure>
  );
};

/*-----------------------------------------*/

type AlternativeTranslationsContentProps = {
  alternativeTranslationsPromise: Promise<string[]>;
};

const AlternativeTranslationsContent: FC<
  AlternativeTranslationsContentProps
> = (props) => {
  const { alternativeTranslationsPromise } = props;
  const alternativeTranslations = use(alternativeTranslationsPromise);

  if (alternativeTranslations.length <= 0) {
    return null;
  }

  return (
    <AlternativeTranslationsWrapper>
      <ul className="mt-1 space-y-1 text-gray-600 dark:text-zinc-400 list-disc list-outside pl-4">
        {alternativeTranslations.map((alternativeTranslation, index) => (
          <li key={index}>{alternativeTranslation}</li>
        ))}
      </ul>
    </AlternativeTranslationsWrapper>
  );
};

/*-----------------------------------------*/

const AlternativeTranslationsSkeleton: FC = () => {
  return (
    <AlternativeTranslationsWrapper>
      <div className="mt-1 space-y-1">
        <div className="w-4/5 h-[1lh] bg-gray-100 dark:bg-zinc-900 forced-colors:bg-[GrayText] rounded animate-pulse" />
        <div className="w-1/2 h-[1lh] bg-gray-100 dark:bg-zinc-900 forced-colors:bg-[GrayText] rounded animate-pulse" />
        <div className="w-1/3 h-[1lh] bg-gray-100 dark:bg-zinc-900 forced-colors:bg-[GrayText] rounded animate-pulse" />
      </div>
    </AlternativeTranslationsWrapper>
  );
};
