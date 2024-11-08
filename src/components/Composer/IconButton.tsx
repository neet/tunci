import clsx from "clsx";
import { FC, ReactNode } from "react";

export type IconButtonProps = {
  children: ReactNode;
  title: string;
  show?: boolean;
  className?: string;
  onClick: () => void | Promise<void>;
};

export const IconButton: FC<IconButtonProps> = (props) => {
  const { children, className, title, show = true, onClick } = props;

  return (
    <button
      className={clsx(
        "p-2 rounded-full",
        "text-gray-600 dark:text-zinc-400",
        "hover:bg-gray-200 dark:hover:bg-zinc-800",
        "outline-indigo-400 outline-2 focus:outline",
        "transition",
        !show && "invisible",
        className,
      )}
      type="button"
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
