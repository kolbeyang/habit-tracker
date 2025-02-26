import { FriendStatus } from "@/store/users/types";

export const dummyFriends = [
  {
    source_user_id: "test_1",
    target_user_id: "test_2",
    status: FriendStatus.Pending,
  },
  {
    source_user_id: "test_2",
    target_user_id: "test_1",
    status: FriendStatus.Pending,
  },
  {
    source_user_id: "test_1",
    target_user_id: "test_2",
    status: FriendStatus.Pending,
  },
  {
    source_user_id: "test_2",
    target_user_id: "test_1",
    status: FriendStatus.Pending,
  },
  {
    source_user_id: "test_1",
    target_user_id: "test_2",
    status: FriendStatus.Pending,
  },
];
