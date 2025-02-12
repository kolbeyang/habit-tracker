import { IconBrandGoogleFilled } from "@tabler/icons-react";
import LoginButton, { LoginButtonProps } from "./LoginButton";
import { cn } from "@/utils/classNameMerge";

type Props = LoginButtonProps;

const LoginWithGoogle = ({ className, ...props }: Props) => {
  return (
    <LoginButton
      className={cn(
        "bg-subtle-01 gap-[12px] text-[20px] text-subtle-06",
        className,
      )}
      {...props}
    >
      <IconBrandGoogleFilled />
      Sign in with Google
    </LoginButton>
  );
};

export default LoginWithGoogle;
