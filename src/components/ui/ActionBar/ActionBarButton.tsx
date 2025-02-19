import Button from "@/components/ui/Button";
import { cn } from "@/utils/classNameMerge";
import { Icon, IconProps } from "@tabler/icons-react";
import { capitalize } from "lodash";
import {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  isActive?: boolean;
  iconComponent?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
}

const ActionBarButton = ({
  className,
  children,
  isActive = false,
  iconComponent,
  ...rest
}: Props) => {
  const IconComponent = iconComponent;
  return (
    <Button
      size="md"
      className={cn(
        "flex-1",
        {
          "outline -outline-[px] outline-text/50 font-bold bg-subtle-01":
            isActive,
        },
        className,
      )}
      {...rest}
    >
      {IconComponent && (
        <IconComponent
          size={24}
          className={cn("text-subtle-03", { "text-subtle-05": isActive })}
        />
      )}
      <span className="hidden sm:block">{children}</span>
    </Button>
  );
};

export default ActionBarButton;
