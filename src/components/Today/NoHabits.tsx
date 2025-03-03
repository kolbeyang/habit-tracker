import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import { IconPlus } from "@tabler/icons-react";

const NoHabits = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/habits/create");
  };

  return (
    <div className="w-full h-[300px] flex flex-col justify-center items-center gap-2">
      <Button
        size="xl"
        className="font-normal text-subtle-05"
        onClick={onClick}
      >
        <IconPlus size={36} />
        Create Habit
      </Button>
    </div>
  );
};

export default NoHabits;
