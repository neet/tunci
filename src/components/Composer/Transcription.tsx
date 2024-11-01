import clsx from "clsx";
import { ReactNode } from "react";

export type TranscriptionProps = {
  children: ReactNode;
  className?: string;
};

export const Transcription = (props: TranscriptionProps) => {
  const { children, className } = props;

  return (
    <p className={clsx("text-gray-600 dark:text-zinc-400", className)}>
      {children}
    </p>
  );
};
