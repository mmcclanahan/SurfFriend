import { useState } from "react";

import { FriendCard } from "./FriendCard";
import { Friend } from "../types/types";
import { getFriends, createFriendRequest } from "../API/friends";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "../styles/friendSideBar.css";

export const FriendsList = ({ userId }: { userId: number }) => {
  const queryClient = useQueryClient();
  const [friendUsername, setFriendUsername] = useState("");

  const friendsQuery = useQuery({
    queryKey: ["friends"],
    queryFn: () => getFriends(userId),
  });
  //sent, recieved, accepted, rejected
  const createFriendRequestMutation = useMutation({
    mutationFn: (friendUserName: string) =>
      createFriendRequest(userId, friendUserName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  if (friendsQuery.isLoading) return <div>Loading...</div>;
  if (friendsQuery.isError) return <div>Error</div>;
  if (!friendsQuery.data) return <div>No friends</div>;

  const handleAddFriend = () => {
    createFriendRequestMutation.mutate(friendUsername);
  };

  return (
    <div className="friendSideBar">
      <div className="friendSideBar-content">
        <h3>Friends</h3>
        <input
          type="text"
          placeholder="UserName"
          onChange={(e) => {
            setFriendUsername(e.target.value);
          }}
        />
        <button onClick={handleAddFriend}>Add Friend</button>
        <ul>
          {friendsQuery.data?.map((friend: Friend) => (
            <FriendCard key={friend.friendId} friend={friend} />
          ))}
        </ul>
      </div>
    </div>
  );
};
