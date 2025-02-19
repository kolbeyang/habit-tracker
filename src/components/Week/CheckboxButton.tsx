import {
  selectHabitCompletion,
  toggleHabitCompletion,
} from "@/store/habits/module";
import { AppDispatch } from "@/store/store";
import { cn } from "@/utils/classNameMerge";
import { formatDate } from "@/utils/date";
import { IconCheck } from "@tabler/icons-react";
import { isNil } from "lodash";
import { DateTime } from "luxon";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  // TODO: standardize this across the app with a shared button component
  isActive?: boolean;
  habitId: string;
  date: DateTime;
}

const CheckboxButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, habitId, date, ...props }, ref) => {
    const habitCompletion = useSelector(
      selectHabitCompletion(habitId, formatDate(date)),
    );
    const dispatch = useDispatch<AppDispatch>();

    const onClick = () => {
      dispatch(
        toggleHabitCompletion({
          habit_id: habitId,
          date: formatDate(date),
        }),
      );
    };

    const isChecked = !isNil(habitCompletion);

    return (
      <button
        className={cn(
          "aspect-square flex items-center justify-center bg-subtle-01 rounded-[8px]",
          {
            "bg-primary-03 text-primary-06": isChecked,
          },
          className,
        )}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {isChecked && <IconCheck stroke={5} size={30} />}
      </button>
    );
  },
);
CheckboxButton.displayName = "CheckboxButton";

export default CheckboxButton;
