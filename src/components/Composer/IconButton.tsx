import clsx from "clsx";
import { FC, ReactNode } from "react";

export type IconButtonProps = {
  children: ReactNode;
  "aria-label": string;
  onClick: () => void | Promise<void>;
};

export const IconButton: FC<IconButtonProps> = (props) => {
  const { children, "aria-label": ariaLabel, onClick } = props;

  return (
    <button
      className={clsx(
        "p-2 rounded-full",
        "text-gray-600 dark:text-zinc-400",
        "hover:bg-gray-200 dark:hover:bg-zinc-800",
        "outline-indigo-400 outline-2 focus:outline",
        "transition",
      )}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
