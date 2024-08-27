import clsx from "clsx";
import { ComponentProps, FC } from "react";

export type AlertProps = ComponentProps<"div"> & {
  children: string;
};

export const Alert: FC<AlertProps> = (props) => {
  const { children, className, ...rest } = props;

  const formattedChildren = children.replace(/\n/g, "<br />");

  return (
    <div
      className={clsx(
        "p-4",
        "rounded-lg",
        "bg-red-50 border border-red-400 text-red-800",
        "dark:bg-red-950 dark:border-red-600 dark:text-red-200",
        className,
      )}
      {...rest}
    >
      <p
        className="leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formattedChildren }}
      />
    </div>
  );
};
