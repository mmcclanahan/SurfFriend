import { UserAttributes } from "./userTypes";
import { UserStatusAttributes } from "./userStatusTypes";

export interface UserInfoAttributes {
  username: string;
  status: UserStatusAttributes;
}
export interface FriendAttributes {
  id: number;
  userId: number;
  friendId: number;
  createdAt: Date;
  updatedAt: Date;
  info: UserInfoAttributes;
}

export interface FlattenedFriend {
  friendId: number;
  request: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  status: string;
  spotName: string | null;
  city: string | null;
  rating: number | null;
}
