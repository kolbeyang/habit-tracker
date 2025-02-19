import { cn } from "@/utils/classNameMerge";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  variant?: "primary" | "default" | "minimal";
  size?: "sm" | "md" | "lg" | "xl";
  isDisabled?: boolean;
  isIcon?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      isDisabled = false,
      isIcon = false,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={cn(
          "-outline-offset-1 font-medium bg-base flex flex-row justify-center items-center",
          {
            "text-sm px-[12px] py-[8px] rounded-[4px] gap-1": size === "sm",
            "text-[16px] px-[24px] py-[18px] rounded-[8px] gap-1":
              size === "md",
            "text-xl px-[30px] py-[24px] rounded-[8px] gap-2": size === "lg",
            "text-3xl font-semibold px-[44px] py-[30px] rounded-[8px] gap-3":
              size === "xl",

            "outline outline-subtle-03/50 bg-base text-text hover:bg-base-01 active:bg-subtle-01":
              variant === "default",
            "outline outline-primary-06/50 bg-primary-03 text-primary-07 hover:bg-primary-04 active:bg-primary-05":
              variant === "primary",
            "outline-none bg-transparent hover:bg-subtle-03/15 active:bg-subtle-03/30":
              variant === "minimal",

            "opacity-70 cursor-not-allowed": isDisabled,

            "text-sm px-[8px] py-[8px] rounded-[4px] gap-1":
              size === "sm" && isIcon,
            "text-[16px] px-[18px] py-[18px] rounded-[8px] gap-1":
              size === "md" && isIcon,
            "text-lg px-[24px] py-[24px] rounded-[8px] gap-2":
              size === "lg" && isIcon,
            "text-xl px-[30px] py-[30px] rounded-[8px] gap-3":
              size === "xl" && isIcon,
          },
          className,
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export default Button;
