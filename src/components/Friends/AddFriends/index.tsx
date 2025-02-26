"use client";

import Button from "@/components/ui/Button";
import { AppDispatch } from "@/store/store";
import { searchUsers, selectUsers } from "@/store/users/module";
import { IconArrowLeft } from "@tabler/icons-react";
import { isEmpty, throttle } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../shared/NavBar";
import { PageName } from "../../shared/types";
import Input from "../../ui/Input";
import { dummyFriends } from "../dummyFriends";
import FriendRequestCard from "./FriendRequestCard";

const searchThrottle = 500;

const AddFriends = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const users = useSelector(selectUsers);
  const dispatch = useDispatch<AppDispatch>();

  const throttledSearch = useCallback(
    throttle(
      (searchValue: string) => dispatch(searchUsers(searchValue)),
      searchThrottle,
    ),
    [],
  );

  const filteredUsers = useMemo(() => {
    return users.filter(({ display_name }) =>
      isEmpty(searchValue)
        ? []
        : display_name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [searchValue, users]);

  const onSearchChange = (newValue: string) => {
    throttledSearch(newValue);
    setSearchValue(newValue);
  };

  return (
    <div className="flex-1 flex flex-col w-full overflow-hidden relative max-w-[540px] lg:max-w-[840px] transition-all duration-500 gap-2">
      <div className="flex justify-between w-full pt-[48px] px-[36px] transition-all sm:px-0 items-center">
        <h1 className="text-[36px] font-extrabold">FRIENDS</h1>
        <NavBar pageName={PageName.Friends} />
      </div>
      <div className="flex flex-col gap-2 flex-1 overflow-hidden">
        <Button
          size="md"
          className="rounded-[12px] outline-2 -outline-offset-2 text-subtle-03 font-semibold text-[20px] gap-[12px]"
          onClick={() => router.push("/friends")}
        >
          <IconArrowLeft className="text-subtle-03" size={24} />
          MY FRIENDS
        </Button>
        <div className="flex flex-col outline-2 -outline-offset-2 outline-subtle-03/50 outline rounded-[14px] overflow-hidden bg-subtle-01/50">
          <Input
            placeholder="Search user by name or email"
            className="rounded-[14px] bg-subtle-01"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <div className="flex flex-col">
            {filteredUsers.map(({ id }) => (
              <FriendRequestCard key={id} userId={id} />
            ))}
          </div>
        </div>
        <div
          className="overflow-y-scroll scrollbar-hide -outline-offset-2 outline outline-2
        outline-subtle-03/50 rounded-[14px] flex flex-col divide-y-2 divide-subtle-03/50"
        >
          {dummyFriends.map((friend, i) => (
            <FriendRequestCard key={i} friend={friend} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddFriends;
