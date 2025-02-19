import { HabitIconMap, HabitIconName } from "@/types/habitIcon";
import { IconProps } from "@tabler/icons-react";

interface Props extends IconProps {
  name: HabitIconName;
}

const HabitIcon = ({ name, ...rest }: Props) => {
  const Component = HabitIconMap[name] ?? HabitIconMap.questionMark;
  return <Component {...rest} />;
};

export default HabitIcon;
