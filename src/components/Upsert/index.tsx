"use client";

import { Habit } from "@/store/habits/types";
import { HabitIconName } from "@/types/habitIcon";
import { IconX } from "@tabler/icons-react";
import { isEmpty, isNil } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import IconSelector from "./IconSelector";

const defaultIconName: HabitIconName = "list";

interface Props {
  habit?: Partial<Habit>;
  onChange: (habit: Partial<Habit>) => void;
}

const Upsert = ({ habit, onChange }: Props) => {
  const isEdit = !isNil(habit);

  const router = useRouter();
  const [name, setName] = useState(habit ? habit.name : "");
  const [iconName, setIconName] = useState<HabitIconName>(
    habit?.icon ? habit.icon : defaultIconName,
  );

  const isDisabled = isNil(iconName) || isEmpty(name);

  const onCTAClick = () => {
    onChange({
      ...habit,
      name,
      icon: iconName,
    });
  };

  return (
    <div className="flex flex-col size-full justify-between">
      <div className="flex overflow-y-auto flex-col pt-[48px] px-[36px] gap-[16px] pb-[2px]">
        <div className="flex justify-between w-full">
          <h1 className="text-[36px] font-extrabold">NEW HABIT</h1>
          <IconX
            size={48}
            className="text-text"
            onClick={() => router.push("/today")}
          />
        </div>
        <input
          className="bg-subtle-03 px-[20px] py-[16px] rounded-[20px] text-[32px] placeholder-subtle-05 font-extrabold text-text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          value={name}
        />
        <IconSelector value={iconName} onChange={setIconName} />
      </div>
      <button
        className="w-full bg-primary-03 text-primary-07 text-[28px] px-[32px] py-[24px] rounded-[12px] font-extrabold"
        disabled={isDisabled}
        onClick={onCTAClick}
      >
        {isEdit ? "UPDATE" : "CREATE"}
      </button>
    </div>
  );
};

export default Upsert;
