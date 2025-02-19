"use client";

import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import NavBar from "../shared/NavBar";
import { PageName } from "../shared/types";
import FriendCard from "./FriendCard";
import { times } from "lodash";
import FriendsActionBar from "./FriendsActionBar";

const Friends = () => {
  const dispatch = useDispatch<AppDispatch>();

  //useEffect(() => {
  //  dispatch(fetchHabits());
  //  const endDate = DateTime.now();
  //  const startDate = endDate.minus({ days: numDays });
  //  const range = { start: formatDate(startDate), end: formatDate(endDate) };
  //  dispatch(fetchHabitCompletions(range));
  //}, [dispatch]);
  //

  return (
    <div className="flex-1 flex flex-col w-full overflow-hidden relative max-w-[540px] lg:max-w-[840px] transition-all duration-500">
      <div className="flex justify-between w-full pt-[48px] pb-[8px] px-[36px] transition-all sm:px-0 items-center">
        <h1 className="text-[36px] font-extrabold">FRIENDS</h1>
        <NavBar pageName={PageName.Friends} />
      </div>
      <div className="overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-[4px]">
          {times(10, () => (
            <FriendCard />
          ))}
        </div>
      </div>
      <FriendsActionBar
        className="absolute bottom-[4px]"
        isActiveMap={{}}
        onClickMap={{}}
      />
    </div>
  );
};

export default Friends;
