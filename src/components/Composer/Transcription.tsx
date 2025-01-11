import { Text } from "@radix-ui/themes";
import { ReactNode } from "react";

export type TranscriptionProps = {
  children?: ReactNode;
};

export const Transcription = (props: TranscriptionProps) => {
  const { children } = props;

  return (
    <Text size="2" color="gray" aria-hidden={!children}>
      {children ?? "\u00A0"}
    </Text>
  );
};
