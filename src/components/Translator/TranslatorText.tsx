import { FC } from "react";
import { useFormStatus } from "react-dom";

export type TranslatorTextProps = {
  children?: string | null;
};

export const TranslatorText: FC<TranslatorTextProps> = (props) => {
  const { children } = props;

  const { pending } = useFormStatus();

  if (pending) {
    return <p className="text-zinc-500 dark:text-zinc-400">翻訳中...</p>;
  }

  if (!children || children === "") {
    return (
      <p className="text-zinc-500 dark:text-zinc-400">テキストを翻訳する</p>
    );
  }

  return <p>{children}</p>;
};
