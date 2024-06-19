import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getFriends,
  createFriendRequest,
  confirmFriendRequest,
  deleteFriend,
} from "../API/friends";

export const useFriends = (userId: number) => {
  const queryClient = useQueryClient();

  const friendsQuery = useQuery({
    queryKey: ["friends"],
    queryFn: () => getFriends(userId),
  });

  const createFriendRequestMutation = useMutation({
    mutationFn: (friendUserName: string) =>
      createFriendRequest(userId, friendUserName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const confirmFriendRequestMutation = useMutation({
    mutationFn: (friendId: number) => confirmFriendRequest(userId, friendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
  const deleteFriendMutation = useMutation({
    mutationFn: (friendId: number) => deleteFriend(userId, friendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const handleAddFriend = (friendUsername: string) => {
    createFriendRequestMutation.mutate(friendUsername);
  };

  const handleConfirmFriend = (friendId: number) => {
    confirmFriendRequestMutation.mutate(friendId);
  };

  const handleDeleteFriend = (friendId: number) => {
    deleteFriendMutation.mutate(friendId);
  };

  return {
    friendsQuery,
    createFriendRequestMutation,
    confirmFriendRequestMutation,
    deleteFriendMutation,
    handleAddFriend,
    handleConfirmFriend,
    handleDeleteFriend,
  };
};
