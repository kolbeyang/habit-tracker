"use client";

import { Habit } from "@/store/habits/types";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Upsert from ".";
import { createHabit } from "@/store/habits/module";
import { AppDispatch } from "@/store/store";

const defaultHabit: Habit = {
  id: "",
  name: "",
  description: "",
  is_archived: false,
  icon: "list",
  user_id: "",
};

const Create = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const create = (habit: Partial<Habit>) => {
    dispatch(
      createHabit({
        ...defaultHabit,
        ...habit,
      }),
    );
    router.push("/today");
  };

  return <Upsert onChange={create} />;
};

export default Create;
