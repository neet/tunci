import clsx from "clsx";
import { FC, ReactNode } from "react";

export type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export const Badge: FC<BadgeProps> = (props) => {
  const { children, className } = props;

  return (
    <div
      className={clsx(
        "text-xs text-zinc-600 dark:text-zinc-400 p-1 leading-none rounded border border-zinc-500",
        className,
      )}
    >
      {children}
    </div>
  );
};
