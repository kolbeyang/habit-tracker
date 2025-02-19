"use client";

import {
  fetchHabitCompletions,
  fetchHabits,
  selectHabits,
} from "@/store/habits/module";
import { AppDispatch } from "@/store/store";
import { formatDate } from "@/utils/date";
import { DateTime } from "luxon";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../shared/NavBar";
import { PageName } from "../shared/types";
import CheckboxTable from "./CheckboxTable";
import IconColumn from "./IconColumn";

const numDays = 14;

const Week = () => {
  const habits = useSelector(selectHabits);
  const dispatch = useDispatch<AppDispatch>();
  const scrollRightIntoViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchHabits());
    const endDate = DateTime.now();
    const startDate = endDate.minus({ days: numDays });
    const range = { start: formatDate(startDate), end: formatDate(endDate) };
    dispatch(fetchHabitCompletions(range));
  }, [dispatch]);

  useEffect(() => {
    if (scrollRightIntoViewRef.current) {
      scrollRightIntoViewRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [scrollRightIntoViewRef.current]);

  const cellSizeClassName = "size-[48px]";

  return (
    <div className="flex-1 flex flex-col w-full overflow-hidden max-w-[540px] lg:max-w-[840px] transition-all duration-500">
      <div className="flex justify-between w-full pt-[48px] pb-[8px] px-[36px] transition-all sm:px-0 items-center">
        <h1 className="text-[36px] font-extrabold">WEEK</h1>
        <NavBar pageName={PageName.Week} />
      </div>
      <div className="flex-1 overflow-y-scroll scrollbar-hide -outline-offset-2 outline outline-2 outline-subtle-03/50 rounded-[14px]">
        <div className="flex items-end divide-x-2 ">
          <div className="flex-1 scrollbar-hide overflow-x-scroll border-r-2 border-r-subtle-03/50">
            <div className="min-w-fit overflow-hidden pl-[4px] gap-[4px] py-[4px] flex">
              <CheckboxTable
                habits={habits}
                className="gap-[2px]"
                rowClassName="gap-[2px]"
                cellClassName={cellSizeClassName}
                numDays={numDays}
              />
              <div ref={scrollRightIntoViewRef} />
            </div>
          </div>
          <div className="p-[4px]">
            <IconColumn
              habits={habits}
              className="gap-[2px]"
              cellClassName={cellSizeClassName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Week;
