import Button from "@/components/ui/Button";
import { isNil } from "lodash";
import { Friend } from "../types";
import { useSelector } from "react-redux";
import { selectUserById } from "@/store/users/module";

interface Props {
  friend?: Friend;
  userId?: string;
}

const FriendRequestCard = ({ friend, userId }: Props) => {
  // TODO: replace with my user Id
  //const user = useUser();
  //const myUserId = user?.user?.id;

  const myUserId = "test_1";

  const { source_user_id, target_user_id, status } = friend ?? {};

  const displayUserId = source_user_id ?? target_user_id ?? userId ?? "";

  const displayUser = useSelector(selectUserById(displayUserId));

  const isNoRelation = isNil(friend);
  const isWaitingForThem = myUserId === source_user_id;
  const isWaitingForMe = myUserId === target_user_id;

  return (
    <div className="flex px-[24px] py-[12px] justify-between">
      <div className="flex flex-col justify-center">
        <span className="text-xl leading-[20px] font-semibold">
          {displayUser?.display_name}
        </span>
        <span className="text-sm text-subtle-03 font-medium">
          {isWaitingForThem && "Request pending"}
          {isWaitingForMe && "Sent you a friend request"}
        </span>
      </div>
      <Button
        variant={isWaitingForThem ? "default" : "primary"}
        className="py-[12px] w-[100px] rounded-[10px]"
      >
        {isNoRelation && "Request"}
        {isWaitingForThem && "Cancel"}
        {isWaitingForMe && "Accept"}
      </Button>
    </div>
  );
};

export default FriendRequestCard;
