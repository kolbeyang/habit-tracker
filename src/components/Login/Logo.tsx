import { IconCheck } from "@tabler/icons-react";

interface Props {
  size?: number;
}

const Logo = ({ size = 200 }: Props) => {
  return (
    <div
      className="aspect-square rounded-[14px] bg-primary-03 text-primary-06 p-[16px] flex flex-col justify-between"
      style={{ width: size }}
    >
      <IconCheck size={60} stroke={6} />
      <h1 className="text-primary-07 font-extrabold text-[36px] leading-[32px]">
        HABIT SQUARE
      </h1>
    </div>
  );
};

export default Logo;
