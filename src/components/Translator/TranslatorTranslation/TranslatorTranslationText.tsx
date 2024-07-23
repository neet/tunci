import { FC, ReactNode } from "react";
import { useFormStatus } from "react-dom";

export type TranslatorTranslationTextProps = {
  children: ReactNode;
};

export const TranslatorTranslationText: FC<TranslatorTranslationTextProps> = (
  props,
) => {
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
