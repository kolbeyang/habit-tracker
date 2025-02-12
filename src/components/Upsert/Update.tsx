"use client";

import { selectHabitById, updateHabit } from "@/store/habits/module";
import { Habit } from "@/store/habits/types";
import { isNil } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import Upsert from ".";
import { useRouter } from "next/navigation";

interface Props {
  habitId: string | undefined;
}

const Update = ({ habitId }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const habit = useSelector(
    habitId ? selectHabitById(habitId) : () => undefined,
  );

  if (isNil(habit)) {
    return "404 not found";
  }

  const update = (updatedHabit: Partial<Habit>) => {
    dispatch(updateHabit({ ...habit, ...updatedHabit }));
    router.push("/today");
  };
  return <Upsert habit={habit} onChange={update} />;
};

export default Update;
