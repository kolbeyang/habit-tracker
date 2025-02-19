import { IconCalendar, IconHome, IconUsers } from "@tabler/icons-react";
import { capitalize } from "lodash";
import { ButtonHTMLAttributes, useMemo } from "react";
import Button from "../ui/Button";
import { PageName } from "./types";

const iconMap = {
  [PageName.Today]: IconHome,
  [PageName.Week]: IconCalendar,
  [PageName.Friends]: IconUsers,
};

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  pageName: PageName;
}

const PageButton = ({ pageName, ...props }: Props) => {
  const ButtonIcon = useMemo(() => iconMap[pageName], [pageName]);
  return (
    <Button
      size="sm"
      isIcon
      variant="minimal"
      className="flex gap-[4px]"
      {...props}
    >
      <ButtonIcon />
      <label className="hidden sm:block">{capitalize(pageName)}</label>
    </Button>
  );
};

export default PageButton;
