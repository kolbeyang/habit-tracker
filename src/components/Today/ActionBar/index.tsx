import { values } from "lodash";
import ActionBarButton from "./ActionBarButton";
import { ActionBarAction } from "./types";

interface Props {
  onClickMap: { [action in ActionBarAction]: () => void };
  isActiveMap: { [action in ActionBarAction]: boolean };
}

const ActionBar = ({ onClickMap, isActiveMap }: Props) => {
  return (
    <div className="flex w-full bg-subtle-01 p-[4px] gap-[4px] rounded-[14px]">
      {values(ActionBarAction).map((action) => (
        <ActionBarButton
          key={action}
          isActive={isActiveMap[action]}
          action={action}
          className="flex-1"
          onClick={onClickMap[action]}
        />
      ))}
    </div>
  );
};

export default ActionBar;
