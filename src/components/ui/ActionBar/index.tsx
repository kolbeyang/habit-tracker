import { cn } from "@/utils/classNameMerge";
import { Icon, IconProps } from "@tabler/icons-react";
import { isEmpty, isNil } from "lodash";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

interface Props {
  className?: string;
  helperText?: boolean;
  isActive?: boolean;
  helperIconComponent?: ForwardRefExoticComponent<
    IconProps & RefAttributes<Icon>
  >;
  children?: ReactNode;
}

const ActionBar = ({
  className,
  isActive = false,
  helperText,
  helperIconComponent,
  children,
}: Props) => {
  const HelperIcon = helperIconComponent;
  return (
    <div
      className={cn(
        "flex flex-col w-full transition-all items-center duration-300 gap-2",
        className,
      )}
    >
      <div
        className={cn(
          "flex justify-center transition-all duration-300 max-h-[100px] overflow-hidden text-subtle-06 text-[20px] px-5 py-3 bg-subtle-03 items-center gap-2 rounded-[14px] w-fit",

          {
            "max-h-0 opacity-0": isEmpty(helperText) || isNil(helperText),
          },
        )}
      >
        {HelperIcon && <HelperIcon />}
        {helperText}
      </div>
      <div
        className={cn(
          "flex w-full bg-subtle-01 gap-[4px] p-[4px] rounded-[14px] flex-1",
          { "bg-subtle-03": isActive },
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ActionBar;
