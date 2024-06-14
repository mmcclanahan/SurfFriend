import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getFriends,
  createFriendRequest,
  confirmFriendRequest,
  deleteFriend,
} from "../API/friends";

export const useFriends = (userId: number) => {
  const friendsQuery = useQuery({
    queryKey: ["friends"],
    queryFn: () => getFriends(userId),
  });

  const createFriendMutation = useMutation({
    mutationFn: (friendUserName: string) =>
      createFriendRequest(userId, friendUserName),
  });
  const confirmFriendMutation = useMutation({
    mutationFn: ({ userId, friendId }: { userId: number; friendId: number }) =>
      confirmFriendRequest(userId, friendId),
  });
  const deleteFriendMutation = useMutation({
    mutationFn: ({ userId, friendId }: { userId: number; friendId: number }) =>
      deleteFriend(userId, friendId),
  });

  return {
    friendsQuery,
    createFriendMutation,
    confirmFriendMutation,
    deleteFriendMutation,
  };
};
