import { FC } from "react";

import { AlternativeTranslationsWrapper } from "./AlternativeTranslationsWrapper";

export const AlternativeTranslationsSkeleton: FC = () => {
  return (
    <AlternativeTranslationsWrapper>
      <div className="mt-1">
        <div className="w-4/5 h-[0.8lh] mt-[0.2lh] bg-gray-100 dark:bg-zinc-800 forced-colors:bg-[GrayText] rounded animate-pulse" />
        <div className="w-1/2 h-[0.8lh] mt-[0.2lh] bg-gray-100 dark:bg-zinc-800 forced-colors:bg-[GrayText] rounded animate-pulse" />
        <div className="w-1/3 h-[0.8lh] mt-[0.2lh] bg-gray-100 dark:bg-zinc-800 forced-colors:bg-[GrayText] rounded animate-pulse" />
      </div>
    </AlternativeTranslationsWrapper>
  );
};
