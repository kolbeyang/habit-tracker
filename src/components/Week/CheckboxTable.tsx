import { Habit } from "@/store/habits/types";
import { cn } from "@/utils/classNameMerge";
import { getDaysBefore } from "@/utils/date";
import { DateTime } from "luxon";
import { useEffect, useMemo, useRef } from "react";
import CheckboxButton from "./CheckboxButton";

const durationClassName = "duration-100";

interface Props {
  habits: Habit[];
  cellClassName?: string;
  endDate?: string;
  numDays?: number;
  className?: string;
  rowClassName?: string;
}

const CheckboxTable = ({
  habits,
  cellClassName,
  className,
  rowClassName,
  endDate,
  numDays = 7,
}: Props) => {
  const scrollRightIntoViewRef = useRef<HTMLDivElement>(null);

  const dates = useMemo(() => {
    const currentDate = endDate ? DateTime.fromISO(endDate) : DateTime.now();
    return getDaysBefore(currentDate, numDays);
  }, []);

  useEffect(() => {
    if (scrollRightIntoViewRef.current) {
      scrollRightIntoViewRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [scrollRightIntoViewRef.current]);

  return (
    <div className={cn("flex flex-col items-end", className)}>
      <div className={cn("flex", rowClassName)}>
        {dates.map((date) => (
          <div
            key={date.day}
            className={cn(
              "flex flex-col gap-1 text-subtle-03 items-center justify-center",
              cellClassName,
            )}
          >
            <span className="font-bold text-[12px] leading-[12px]">
              {date.toFormat("M/d")}
            </span>
            <span className="font-bold text-[16px] leading-[20px]">
              {date.toFormat("ccc")}
            </span>
          </div>
        ))}
      </div>
      {habits.map(({ id }) => {
        return (
          <div key={id} className={cn("flex", rowClassName)}>
            {dates.map((date) => (
              <CheckboxButton
                key={date.day}
                className={cn(
                  "transition-all",
                  durationClassName,
                  cellClassName,
                )}
                habitId={id}
                date={date}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxTable;
