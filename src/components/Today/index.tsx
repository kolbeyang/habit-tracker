"use client";

import useLogin from "@/hooks/useLogin";
import {
  deleteHabit,
  fetchHabitCompletions,
  fetchHabits,
  selectHabitCompletions,
  selectHabits,
  toggleHabitCompletion,
} from "@/store/habits/module";
import { AppDispatch } from "@/store/store";
import { formatDate } from "@/utils/date";
import { isNil } from "lodash";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../shared/NavBar";
import { PageName } from "../shared/types";
import HabitButton from "./HabitButton";
import PageContext, { defaultPageState } from "./context";
import { PageMode } from "./types";
import { ActionBarAction } from "./TodayActionBar/types";
import TodayActionBar from "./TodayActionBar";

const Today = () => {
  const habits = useSelector(selectHabits);
  const habitCompletions = useSelector(selectHabitCompletions);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [pageState, setPageState] = useState(defaultPageState);
  const { logout } = useLogin();

  const sortedHabits = useMemo(() => {
    return [...habits].sort(
      (a, b) =>
        DateTime.fromISO(a.created_at).toMillis() -
        DateTime.fromISO(b.created_at).toMillis(),
    );
  }, [habits]);

  useEffect(() => {
    dispatch(fetchHabits());
    dispatch(fetchHabitCompletions({ start: formatDate(DateTime.now()) }));
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
        dispatch(
          toggleHabitCompletion({
            habit_id: habitId,
            date: formatDate(DateTime.now()),
          }),
        );
    }
  };

  return (
    <PageContext.Provider value={{ ...pageState, setState: setPageState }}>
      <div className="flex flex-col size-full max-w-[540px] lg:max-w-[640px] relative">
        <div className="flex flex-col pb-[4px] overflow-y-auto pb-[84px] scrollbar-hide">
          <div className="flex justify-between w-full pt-[48px] pb-[8px] px-[36px] items-center transition-all sm:px-0">
            <h1 className="text-[36px] font-extrabold">TODAY</h1>
            <NavBar pageName={PageName.Today} />
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-[2px] justify-items-center">
            {sortedHabits.map((habit) => (
              <HabitButton
                key={habit.id}
                habit={habit}
                isChecked={!isNil(getHabitCompletion(habit.id))}
                onClick={() => onHabitButtonClick(habit.id)}
              />
            ))}
          </div>
        </div>
        <TodayActionBar
          className="absolute bottom-[4px]"
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
