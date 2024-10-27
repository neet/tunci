import { FC, ReactNode } from "react";

export type IconButtonGroupProps = {
  start: ReactNode;
  end?: ReactNode;
};

export const IconButtonGroup: FC<IconButtonGroupProps> = (props) => {
  const { start, end } = props;

  return (
    <div className="flex p-1">
      <div className="flex justify-start flex-1 gap-1">{start}</div>
      <div className="flex justify-end items-center gap-1">{end}</div>
    </div>
  );
};
