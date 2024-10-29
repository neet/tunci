import { FC, ReactNode } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export type DisclosureProps = {
  open: boolean;
  summary: ReactNode;
  children: ReactNode;
};

export const Disclosure: FC<DisclosureProps> = (props) => {
  const { open, summary, children } = props;

  return (
    <details className="group p-4" open={open}>
      <summary className="flex justify-between items-center list-none">
        <div className="font-bold text-gray-700 dark:text-zinc-300">
          {summary}
        </div>

        <div className="text-gray-400 dark:text-zinc-600">
          <FiChevronUp className="size-5 hidden group-open:inline" />
          <FiChevronDown className="size-5 inline group-open:hidden" />
        </div>
      </summary>

      {children}
    </details>
  );
};
