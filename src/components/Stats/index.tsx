import { selectHabitById } from "@/store/habits/module";
import { useSelector } from "react-redux";
import NavBar from "../shared/NavBar";

interface Props {
  habitId: string | undefined;
}

const Stats = ({ habitId }: Props) => {
  const habit = useSelector(selectHabitById(habitId));
  return (
    <div className="flex flex-col size-full max-w-[540px] lg:max-w-[640px] relative">
      <div className="flex justify-between w-full pt-[48px] pb-[8px] px-[36px] transition-all sm:px-0 items-center">
        <h1 className="text-[36px] font-extrabold">{habit?.name}</h1>
        <NavBar />
      </div>
      This Stats Page is a work in progress.
    </div>
  );
};

export default Stats;
