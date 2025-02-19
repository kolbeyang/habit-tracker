import ActionBar from "@/components/ui/ActionBar";
import ActionBarButton from "@/components/ui/ActionBar/ActionBarButton";
import { capitalize, values } from "lodash";
import { ActionBarAction } from "./types";
import {
  IconCircleMinus,
  IconMailFast,
  IconUsersPlus,
} from "@tabler/icons-react";

const iconMap = {
  [ActionBarAction.Add]: IconUsersPlus,
  [ActionBarAction.Requests]: IconMailFast,
  [ActionBarAction.Remove]: IconCircleMinus,
};

interface Props {
  onClickMap: { [action in ActionBarAction]: () => void };
  isActiveMap: { [action in ActionBarAction]: boolean };
  className?: string;
}

const FriendsActionBar = ({ className, onClickMap, isActiveMap }: Props) => {
  return (
    <ActionBar className={className}>
      {(values(ActionBarAction) as ActionBarAction[]).map((action) => (
        <ActionBarButton
          isActive={isActiveMap[action]}
          onClick={onClickMap[action]}
          iconComponent={iconMap[action]}
          key={action}
        >
          {capitalize(action)}
        </ActionBarButton>
      ))}
    </ActionBar>
  );
};

export default FriendsActionBar;
