"use client";

import { IconUserPlus } from "@tabler/icons-react";
import { times } from "lodash";
import { useRouter } from "next/navigation";
import NavBar from "../shared/NavBar";
import { PageName } from "../shared/types";
import Button from "../ui/Button";
import FriendCard from "./FriendCard";

const Friends = () => {
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col w-full overflow-hidden relative max-w-[540px] lg:max-w-[840px] transition-all duration-500 gap-2">
      {/* Refactor NavBar to improve reusability */}
      <div className="flex justify-between w-full pt-[48px] px-[36px] transition-all sm:px-0 items-center">
        <h1 className="text-[36px] font-extrabold">FRIENDS</h1>
        <NavBar pageName={PageName.Friends} />
      </div>
      <div className="flex flex-col gap-[8px]">
        <Button
          size="md"
          className="rounded-[12px] outline-2 -outline-offset-2 text-subtle-03 font-semibold text-[20px] gap-[12px]"
          onClick={() => router.push("/friends/add")}
        >
          <IconUserPlus className="text-subtle-03" size={24} />
          ADD FRIENDS
        </Button>
        <div className="overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-[4px]">
            {times(10, (i) => (
              <FriendCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
