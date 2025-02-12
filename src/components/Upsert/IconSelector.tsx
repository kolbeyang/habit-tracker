import { HabitIconMap, HabitIconName } from "@/types/habitIcon";
import { cn } from "@/utils/classNameMerge";
import { keys } from "lodash";

interface Props {
  value: HabitIconName | undefined;
  onChange: (name: HabitIconName) => void;
}

const IconSelector = ({ value, onChange }: Props) => {
  return (
    <div className="grid w-full grid-cols-5 gap-[4px]">
      {keys(HabitIconMap).map((n) => {
        const name = n as HabitIconName;
        const IconComponent = HabitIconMap[name as HabitIconName];

        return (
          <button
            key={name}
            className={cn(
              "w-full aspect-square text-subtle-03 flex justify-center items-center rounded-[12px]",
              {
                "bg-primary-03 text-primary-06": value === name,
              },
            )}
            onClick={() => onChange(name)}
          >
            <IconComponent size={60} />
          </button>
        );
      })}
    </div>
  );
};

export default IconSelector;
