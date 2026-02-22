import { FC } from "react";

import { formatDate, parseTimestamp } from "@/utils/timestamp";

export type TimestampProps = {
  value: string | null;
  mode: "year_only" | "full";
};

export const Timestamp: FC<TimestampProps> = (props) => {
  const { mode } = props;
  const timestamp = props.value ? parseTimestamp(props.value) : null;

  if (!timestamp) {
    return null;
  }

  if (timestamp.type === "range") {
    if (timestamp.start.year !== timestamp.end.year) {
      return (
        <span>
          {formatDate(timestamp.start, mode)}—{formatDate(timestamp.end, mode)}
        </span>
      );
    } else {
      return <span>{formatDate(timestamp.start, mode)}</span>;
    }
  } else {
    return <span>{formatDate(timestamp.value, mode)}</span>;
  }
};
