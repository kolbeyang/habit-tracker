import { cn } from "@/utils/classNameMerge";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface LoginButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  // TODO: standardize this across the app with a shared button component
  isActive?: boolean;
}

const LoginButton = forwardRef<HTMLButtonElement, LoginButtonProps>(
  ({ className, isActive = false, ...props }, ref) => {
    return (
      <button
        className={cn(
          "flex justify-center items-center rounded-[12px] bg-base font-bold text-[18px] flex-1 px-[24px] py-[20px]",
          { "bg-primary-03 outline-primary-06 outline": isActive },
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
LoginButton.displayName = "Button";

export default LoginButton;
