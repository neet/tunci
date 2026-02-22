export type ArbitaryPrecisionDate = {
  year: number;
  month: number | null;
  day: number | null;
};

const parseDate = (date: string): ArbitaryPrecisionDate => {
  const [year, month, day] = date.split("-").map((d) => Number(d));
  return { year, month: month ?? null, day: day ?? null };
};

export const formatDate = (
  date: ArbitaryPrecisionDate,
  mode: "year_only" | "full",
): string => {
  let value = "";

  const { year, month, day } = date;

  if (year) {
    if (mode === "year_only") {
      value += year;
    } else {
      value += `${year}年`;
    }
  }

  if (mode === "full") {
    if (month) {
      value += `${month}月`;
    }
    if (day) {
      value += `${day}日`;
    }
  }

  return value;
};

export type Timestamp =
  | { type: "point"; value: ArbitaryPrecisionDate }
  | { type: "range"; start: ArbitaryPrecisionDate; end: ArbitaryPrecisionDate };

export const parseTimestamp = (dateOrRange: string): Timestamp => {
  if (dateOrRange.includes("/")) {
    const [start, end] = dateOrRange.split("/");

    return {
      type: "range",
      start: parseDate(start),
      end: parseDate(end),
    };
  } else {
    return {
      type: "point",
      value: parseDate(dateOrRange),
    };
  }
};
