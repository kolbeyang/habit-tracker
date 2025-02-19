import { Habit } from "@/store/habits/types";
import { cn } from "@/utils/classNameMerge";
import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";
import { useState } from "react";
import Button from "../ui/Button";
import HabitIcon from "../ui/HabitIcon";

export const durationClassName = "duration-500";

interface Props {
  className?: string;
  cellClassName?: string;
  habits: Habit[];
}

const IconColumn = ({ className, habits, cellClassName }: Props) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const CollapseIcon = isExpanded ? IconChevronsRight : IconChevronsLeft;

  return (
    <div className={cn("flex flex-col items-start", className)}>
      <Button
        className={cn("rounded-[12px]", cellClassName)}
        size="sm"
        variant="minimal"
        isIcon
        onClick={() => setIsExpanded((p) => !p)}
      >
        <CollapseIcon className="text-subtle-03" />
      </Button>
      {habits.map(({ id, icon, name }) => (
        <div key={id} className="flex flex-row items-center">
          <div
            className={cn(
              "aspect-square flex justify-center items-center",
              { "text-subtle-03": isExpanded },
              cellClassName,
            )}
          >
            <HabitIcon
              className={cn("transition-all", durationClassName)}
              name={icon}
              size={isExpanded ? 30 : 44}
            />
          </div>
          <div
            className={cn(
              "p-0 transition-all w-0 overflow-hidden",
              durationClassName,
              { "w-[200px] pr-[24px]": isExpanded },
            )}
          >
            {isExpanded && (
              <label className={cn("text-lg font-medium text-text truncate")}>
                {name}
              </label>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IconColumn;
