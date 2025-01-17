import { FC } from "react";

import { Entry } from "@/components/Entry";

import { ExampleSentencesWrapper } from "./ExampleSentencesWrapper";

export const ExampleSentencesSkeleton: FC = () => {
  return (
    <ExampleSentencesWrapper>
      {Array.from({ length: 3 }, (_, i) => (
        <Entry.Skeleton key={i} />
      ))}
    </ExampleSentencesWrapper>
  );
};
