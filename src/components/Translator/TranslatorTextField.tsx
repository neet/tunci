import clsx from "clsx";
import { FC } from "react";

export type TranslatorTextFieldProps = {
  id?: string;
  className?: string;
  name: string;
  error: string | null;
  "aria-errormessage": string;
};

export const TranslatorTextField: FC<TranslatorTextFieldProps> = (props) => {
  const { id = "translator-text-field", className, name, error } = props;

  return (
    <div className={className}>
      <label className="sr-only" htmlFor={id}>
        翻訳したいテキストを入力
      </label>

      <textarea
        id={id}
        name={name}
        className={clsx(
          "w-full min-h-48 md:min-h-64 lg:h-full",
          "p-3 rounded-lg",
          "text-xl",
          "border bg-white border-zinc-300",
          "dark:bg-black dark:border-zinc-600",
          "outline-blue-400 outline-2 focus:outline outline-offset-4",
        )}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        aria-invalid={error != null}
        aria-errormessage={props["aria-errormessage"]}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        style={{ fieldSizing: "content" } as any}
      />
    </div>
  );
};
