"use client";

import { Habit } from "@/store/habits/types";
import { HabitIconName } from "@/types/habitIcon";
import { IconArrowLeft } from "@tabler/icons-react";
import { isEmpty, isNil } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
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
    <div className="flex flex-col size-full max-w-[540px] lg:max-w-[640px] relative justify-between transition-all duration-700 overflow-hidden gap-[12px]">
      <div className="flex flex-col pt-[48px] px-[36px] sm:px-0 gap-[8px] pb-[2px] transition-all duration-700 flex-1 overflow-hidden">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-[36px] font-extrabold">NEW HABIT</h1>
        </div>
        <Input
          size="lg"
          onChange={(e) => setName(e.target.value)}
          autoFocus
          placeholder="Name"
          value={name}
        />
        <IconSelector
          className="flex-1 overflow-auto"
          value={iconName}
          onChange={setIconName}
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
          isDisabled={isDisabled}
          onClick={onCTAClick}
        >
          {isEdit ? "UPDATE" : "CREATE"}
        </Button>
      </div>
    </div>
  );
};

export default Upsert;
