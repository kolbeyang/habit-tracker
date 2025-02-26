import {
  getGradientBackgroundColor,
  getGradientTextColor,
} from "@/utils/color";
import { getDaysBefore } from "@/utils/date";
import { times } from "lodash";
import { DateTime } from "luxon";
import { useMemo } from "react";

const numDays = 7;

interface Props {}

const FriendCard = ({}: Props) => {
  const testPercentages = useMemo(() => times(20, () => Math.random()), []);

  const dates = useMemo(() => {
    const currentDate = DateTime.now();
    return getDaysBefore(currentDate, numDays);
  }, []);

  return (
    <div
      className="flex-1 flex rounded-[14px] text-primary-06 flex-col font-bold overflow-hidden divide-y-2 divide-base"
      style={{
        color: getGradientTextColor(testPercentages[0]),
        backgroundColor: getGradientBackgroundColor(testPercentages[0]),
      }}
    >
      <div className="px-[28px] py-[24px] flex-1 flex items-end justify-between">
        <div className="text-[24px] leading-[30px]">Brandon</div>
        <div className="flex flex-col items-end text-[12px]">
          <label>TODAY</label>
          <label className="text-[28px] leading-[30px] font-extrabold">
            4/14
          </label>
        </div>
      </div>
      <div className="flex">
        {dates.map((date, i) => (
          <div
            key={date.toSeconds()}
            className="flex-1 flex justify-center py-[8px]"
            style={{
              color: getGradientTextColor(testPercentages[i]),
              backgroundColor: getGradientBackgroundColor(testPercentages[i]),
            }}
          >
            {date.toFormat("ccc")[0]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendCard;
