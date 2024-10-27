import clsx from "clsx";
import { ComponentProps, FC, ReactNode } from "react";

export type RadioProps = ComponentProps<"input"> & {
  children: ReactNode;
};

export const Radio: FC<RadioProps> = (props) => {
  const { children, className, ...inputProps } = props;

  return (
    <label>
      <input
        type="radio"
        className={clsx(
          "mr-0.5 peer accent-indigo-500",
          "outline-indigo-400 outline-2 focus:outline outline-offset-4",
          className,
        )}
        {...inputProps}
      />

      <span>{children}</span>
    </label>
  );
};
