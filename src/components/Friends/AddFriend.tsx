"use client";

import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useState } from "react";

const AddFriend = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const onCTAClick = () => {};

  return (
    <div className="flex flex-col size-full max-w-[540px] lg:max-w-[640px] relative justify-between transition-all duration-700 overflow-hidden gap-[12px]">
      <div className="flex flex-col pt-[48px] px-[36px] sm:px-0 gap-[8px] pb-[2px] transition-all duration-700 flex-1 overflow-hidden">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-[36px] font-extrabold">ADD FRIEND</h1>
        </div>
        <Input
          size="lg"
          onChange={(e) => setSearchValue(e.target.value)}
          autoFocus
          placeholder="Name"
          value={searchValue}
        />
      </div>
      <div className="flex gap-1">
        <Button
          isIcon
          className="aspect-square h-full"
          onClick={() => router.push("/today")}
        >
          <IconArrowLeft size={36} />
        </Button>
        <Button
          variant="primary"
          size="xl"
          className="flex-1"
          onClick={onCTAClick}
        >
          ADD
        </Button>
      </div>
    </div>
  );
};

export default AddFriend;
