import { selectHabitById } from "@/store/habits/module";
import { useSelector } from "react-redux";

interface Props {
  habitId: string | undefined;
}

const Stats = ({ habitId }: Props) => {
  const habit = useSelector(selectHabitById(habitId));
  return <div className="flex">Stats on {habit?.name}</div>;
};

export default Stats;
