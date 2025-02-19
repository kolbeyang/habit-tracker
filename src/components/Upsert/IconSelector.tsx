import { HabitIconMap, HabitIconName } from "@/types/habitIcon";
import { keys, map } from "lodash";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { cn } from "@/utils/classNameMerge";
import { useMemo, useState } from "react";
import fuzzysort from "fuzzysort";

interface Props {
  value: HabitIconName | undefined;
  onChange: (name: HabitIconName) => void;
  className?: string;
}

const IconSelector = ({ value, onChange, className }: Props) => {
  const [searchValue, setSearchValue] = useState("");

  const filteredIconNames = useMemo(() => {
    const fuzzyResults = fuzzysort.go(searchValue, keys(HabitIconMap), {
      all: true,
    });
    return map(fuzzyResults, "target");
  }, [searchValue]);

  return (
    <div
      className={cn(
        "w-full flex flex-col outline -outline-offset-1 outline-subtle-03/50 p-2 rounded-[8px] scrollbar-hide",
        className,
      )}
    >
      <Input
        isMinimal
        placeholder="Search icons"
        size="md"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div className="grid w-full grid-cols-5 sm:grid-cols-6 gap-[4px]">
        {filteredIconNames.map((n) => {
          const name = n as HabitIconName;
          const IconComponent = HabitIconMap[name as HabitIconName];

          return (
            <Button
              key={name}
              isIcon
              variant={value === name ? "primary" : "minimal"}
              onClick={() => onChange(name)}
            >
              <IconComponent
                className={
                  value === name ? "text-primary-06" : "text-subtle-05"
                }
                size={45}
              />
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default IconSelector;
