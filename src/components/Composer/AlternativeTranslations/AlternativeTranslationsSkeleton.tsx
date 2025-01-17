import { Skeleton, Text } from "@radix-ui/themes";
import { FC } from "react";

import { AlternativeTranslationsWrapper } from "./AlternativeTranslationsWrapper";

export const AlternativeTranslationsSkeleton: FC = () => {
  return (
    <AlternativeTranslationsWrapper>
      <div className="mt-1">
        <Skeleton>
          <Text>irankarapte. tanto sirpirka wa.</Text>
          <Text>irankarapte. tanto sirpirka wa.</Text>
          <Text>irankarapte. tanto sirpirka wa.</Text>
        </Skeleton>
      </div>
    </AlternativeTranslationsWrapper>
  );
};
