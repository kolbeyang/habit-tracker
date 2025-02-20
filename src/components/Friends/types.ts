export enum FriendStatus {
  Pending = "pending",
  Denied = "denied",
  Accepted = "accepted",
}

export interface Friend {
  source_user_id: string;
  target_user_id: string;
  status: FriendStatus;
}
