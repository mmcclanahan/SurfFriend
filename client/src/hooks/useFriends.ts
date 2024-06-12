import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFriends, createFriendRequest } from "../API/friends";

export const useFriends = (userId: number) => {
  const friendsQuery = useQuery({
    queryKey: ["friends", userId],
    queryFn: () => getFriends(userId),
  });

  return { friendsQuery };
};
