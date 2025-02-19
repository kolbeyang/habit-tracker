import { times } from "lodash";
import { DateTime } from "luxon";

const dateFormat = "yyyy-MM-dd";

export const formatDate = (date: DateTime) => {
  return date.toFormat(dateFormat);
};

export const getDaysBefore = (date: DateTime, num: number) => {
  const output = times(num, (i) => {
    return date.minus({ days: i });
  });
  output.reverse();
  return output;
};
