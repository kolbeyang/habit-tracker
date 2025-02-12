"use client";

import useLogin from "@/hooks/useLogin";
import { useUser } from "@/hooks/useUser";
import {
  deleteHabit,
  fetchHabits,
  selectHabitCompletions,
  selectHabits,
} from "@/store/habits/module";
import { AppDispatch } from "@/store/store";
import { IconDots } from "@tabler/icons-react";
import { isNil } from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionBar from "./ActionBar";
import { ActionBarAction } from "./ActionBar/types";
import HabitButton from "./HabitButton";
import PageContext, { defaultPageState } from "./context";
import { PageMode } from "./types";

const Today = () => {
  const habits = useSelector(selectHabits);
  const habitCompletions = useSelector(selectHabitCompletions);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [pageState, setPageState] = useState(defaultPageState);
  const { logout } = useLogin();
  const { user } = useUser();

  useEffect(() => {
    console.log("user is", user);
  }, [user]);

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  const { mode } = pageState;

  const setMode = (mode: PageMode) => {
    setPageState((prev) => ({ ...prev, mode }));
  };

  const getHabitCompletion = (habitId: string) => {
    return habitCompletions.find(({ habit_id: id }) => id === habitId);
  };

  const onHabitButtonClick = (habitId: string) => {
    switch (mode) {
      case PageMode.Edit:
        router.push(`/habits//${habitId}/edit`);
        break;
      case PageMode.Stats:
        router.push(`/habits/${habitId}/stats`);
        break;
      case PageMode.Delete:
        // TODO: todo add confirmation dialog
        dispatch(deleteHabit(habitId));
        break;
      default:
        // TODO toggle habit completion
        //dispatch(toggleHabitCompletion(habitId));
        console.log("toggling habit completion");
    }
  };

  return (
    <PageContext.Provider value={{ ...pageState, setState: setPageState }}>
      <div className="flex flex-col size-full justify-between">
        <div className="flex flex-col pb-[4px] overflow-y-auto">
          <div className="flex justify-between w-full pt-[48px] pb-[8px] px-[36px]">
            <h1 className="text-[36px] font-extrabold">TODAY</h1>
            {/* TODO: replace with an actual sign out button*/}
            <IconDots size={48} className="text-text" onClick={logout} />
          </div>
          <div className="grid grid-cols-3 gap-[2px] justify-items-center">
            {habits.map((habit) => (
              <HabitButton
                key={habit.id}
                habit={habit}
                isChecked={!isNil(getHabitCompletion(habit.id))}
                onClick={() => onHabitButtonClick(habit.id)}
              />
            ))}
          </div>
        </div>
        <ActionBar
          isActiveMap={{
            [ActionBarAction.Create]: false,
            [ActionBarAction.Edit]: mode === PageMode.Edit,
            [ActionBarAction.Stats]: mode === PageMode.Stats,
            [ActionBarAction.Delete]: mode === PageMode.Delete,
          }}
          onClickMap={{
            [ActionBarAction.Create]: () => router.push("/habits/create"),
            [ActionBarAction.Edit]: () => {
              if (mode !== PageMode.Edit) setMode(PageMode.Edit);
              else setMode(PageMode.Normal);
            },
            [ActionBarAction.Stats]: () => {
              if (mode !== PageMode.Stats) setMode(PageMode.Stats);
              else setMode(PageMode.Normal);
            },
            [ActionBarAction.Delete]: () => {
              if (mode !== PageMode.Delete) setMode(PageMode.Delete);
              else setMode(PageMode.Normal);
            },
          }}
        />
      </div>
    </PageContext.Provider>
  );
};

export default Today;
