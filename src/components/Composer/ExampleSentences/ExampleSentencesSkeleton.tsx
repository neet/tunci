import { FC } from "react";

import { ExampleSentencesWrapper } from "./ExampleSentencesWrapper";

export const ExampleSentencesSkeleton: FC = () => {
  return (
    <ExampleSentencesWrapper>
      <div className="mt-1">
        <div className="space-y-1">
          <div className="w-1/3 h-[0.8lh] mt-[0.2lh] bg-gray-100 dark:bg-zinc-800 forced-colors:bg-[GrayText] rounded animate-pulse" />
          <div className="w-1/2 h-[0.8lh] mt-[0.2lh] bg-gray-100 dark:bg-zinc-800 forced-colors:bg-[GrayText] rounded animate-pulse" />
        </div>

        <div className="mt-2 flex gap-2 justify-between">
          <div className="w-2/4 text-sm h-[0.8lh] mt-[0.2lh] bg-gray-100 dark:bg-zinc-800 forced-colors:bg-[GrayText] rounded animate-pulse" />
          <div className="w-1/4 text-sm h-[0.8lh] mt-[0.2lh] bg-gray-100 dark:bg-zinc-800 forced-colors:bg-[GrayText] rounded animate-pulse" />
        </div>
      </div>
    </ExampleSentencesWrapper>
  );
};
