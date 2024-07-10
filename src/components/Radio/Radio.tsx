import clsx from "clsx";
import { ComponentProps, FC, ReactNode } from "react";

export type RadioProps = ComponentProps<"input"> & {
  children: ReactNode;
};

export const Radio: FC<RadioProps> = (props) => {
  const { children, className, ...inputProps } = props;

  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        className={clsx("mr-0.5 peer", className)}
        {...inputProps}
      />

      <span>{children}</span>
    </label>
  );
};
