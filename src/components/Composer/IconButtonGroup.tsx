import clsx from "clsx";
import { FC, ReactNode } from "react";

export type IconButtonGroupProps = {
  className?: string;
  start: ReactNode;
  end?: ReactNode;
};

export const IconButtonGroup: FC<IconButtonGroupProps> = (props) => {
  const { className, start, end } = props;

  return (
    <div className={clsx("flex", className)}>
      <div className="flex justify-start flex-1 gap-1">{start}</div>
      <div className="flex justify-end items-center gap-1">{end}</div>
    </div>
  );
};
