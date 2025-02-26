import ActionBar from "@/components/ui/ActionBar";
import {
  IconChartAreaFilled,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { capitalize, values } from "lodash";
import { useContext } from "react";
import PageContext from "../context";
import { PageMode } from "../types";
import { ActionBarAction } from "./types";
import ActionBarButton from "@/components/ui/ActionBar/ActionBarButton";

const iconMap = {
  [ActionBarAction.Stats]: IconChartAreaFilled,
  [ActionBarAction.Create]: IconPlus,
  [ActionBarAction.Edit]: IconPencil,
  [ActionBarAction.Delete]: IconTrash,
};

const helperText = {
  [PageMode.Normal]: undefined,
  [PageMode.Edit]: "Click on a habit to edit",
  [PageMode.Delete]: "Click on a habit to delete",
  [PageMode.Stats]: "Click on a habit to see stats",
};

interface Props {
  onClickMap: { [action in ActionBarAction]: () => void };
  isActiveMap: { [action in ActionBarAction]: boolean };
  className?: string;
}

const TodayActionBar = ({ className, onClickMap, isActiveMap }: Props) => {
  const { mode } = useContext(PageContext);

  return (
    <ActionBar
      className={className}
      isActive={mode !== PageMode.Normal}
      helperText={helperText[mode]}
    >
      {(values(ActionBarAction) as ActionBarAction[]).map((action) => (
        <ActionBarButton
          isActive={isActiveMap[action]}
          onClick={onClickMap[action]}
          key={action}
          iconComponent={iconMap[action]}
        >
          {capitalize(action)}
        </ActionBarButton>
      ))}
    </ActionBar>
  );
};

export default TodayActionBar;
