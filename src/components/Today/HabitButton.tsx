import { cn } from "@/utils/classNameMerge";
import HabitIcon from "../ui/HabitIcon";
import { useCallback, useContext } from "react";
import { Habit } from "@/store/habits/types";
import PageContext from "./context";
import { PageMode } from "./types";
import { HabitIconName } from "@/types/habitIcon";

interface Props {
  habit: Habit;
  isChecked?: boolean;
  className?: string;
  onClick: () => void;
}

const HabitButton = ({
  habit,
  className,
  isChecked = false,
  onClick,
}: Props) => {
  const { mode } = useContext(PageContext);
  const { name, icon } = habit;

  const getIconName = useCallback((): HabitIconName => {
    if (mode === PageMode.Edit) return "pencil";
    if (mode === PageMode.Stats) return "stats";
    if (mode === PageMode.Delete) return "trash";
    return isChecked ? "check" : icon;
  }, [icon, isChecked, mode]);

  return (
    <button
      className={cn(
        "flex flex-col w-full aspect-square bg-subtle-01 rounded-[14px] p-4  justify-between",
        isChecked && mode === PageMode.Normal
          ? "text-primary-06 bg-primary-03"
          : "text-subtle-06",
        {
          "": mode === PageMode.Delete,
        },
        className,
      )}
      onClick={onClick}
    >
      <HabitIcon size={50} name={getIconName()} />
      <label className={cn("text-[16px] font-semibold leading-4")}>
        {name}
      </label>
    </button>
  );
};

export default HabitButton;
