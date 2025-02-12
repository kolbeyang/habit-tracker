import { cn } from "@/utils/classNameMerge";
import {
  IconChartAreaFilled,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { capitalize } from "lodash";
import { HTMLAttributes } from "react";
import { ActionBarAction } from "./types";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  isActive?: boolean;
  action: ActionBarAction;
}

const iconMap = {
  [ActionBarAction.Stats]: IconChartAreaFilled,
  [ActionBarAction.Create]: IconPlus,
  [ActionBarAction.Edit]: IconPencil,
  [ActionBarAction.Delete]: IconTrash,
};

const ActionBarButton = ({
  className,
  action,
  isActive = false,
  ...rest
}: Props) => {
  const IconComponent = iconMap[action];
  return (
    <button
      className={cn(
        "flex rounded-[12px] px-[24px] py-[20px] bg-base justify-center item-center font-medium gap-1",
        {
          "outline -outline-[px] outline-text/50 font-bold bg-subtle-01":
            isActive,
        },
        className,
      )}
      {...rest}
    >
      <IconComponent
        size={24}
        className={cn("text-subtle-03", { "text-subtle-05": isActive })}
      />
      {capitalize(action)}
    </button>
  );
};

export default ActionBarButton;
