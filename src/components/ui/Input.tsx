import { cn } from "@/utils/classNameMerge";
import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "disabled"> {
  variant?: "default";
  size?: "sm" | "md" | "lg" | "xl";
  isMinimal?: boolean;
  isDisabled?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      isMinimal = false,
      isDisabled = false,
      ...props
    },
    ref,
  ) => {
    return (
      <input
        className={cn(
          "-outline-offset-1 font-medium bg-base flex flex-row justify-center items-center",
          {
            "text-md px-[12px] py-[6px] rounded-[4px] gap-1": size === "sm",
            "text-[20px] px-[24px] py-[16px] rounded-[8px] gap-1":
              size === "md",
            "text-2xl px-[30px] py-[22px] rounded-[8px] gap-2": size === "lg",
            "text-3xl font-semibold px-[44px] py-[28px] rounded-[8px] gap-3":
              size === "xl",

            "outline outline-subtle-03/50 bg-subtle-06/15 text-text placeholder:text-subtle-03 focus:-outline-offset-[3px] focus:bg-subtle-06/20 focus:outline-primary-04 focus:outline-[3px]":
              variant === "default",

            "opacity-70 cursor-not-allowed": isDisabled,

            "bg-transparent outline-transparent focus:bg-subtle-06/15 focus:outline-transparent":
              isMinimal,
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
Input.displayName = "Input";

export default Input;
