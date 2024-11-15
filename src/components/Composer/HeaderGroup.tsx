import clsx from "clsx";
import { FC, ReactNode } from "react";

export type HeaderGroupProps = {
  children: ReactNode;
};

export const HeaderGroup: FC<HeaderGroupProps> = (props) => {
  const { children } = props;

  return (
    <div
      className={clsx(
        "flex gap-4 p-4",
        "justify-between items-center",
        "border-b border-gray-300 dark:border-zinc-600",
      )}
    >
      {children}
    </div>
  );
};
