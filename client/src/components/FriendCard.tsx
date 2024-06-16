import { Friend } from "../types/types";
import { deleteFriend, confirmFriendRequest } from "../API/friends";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const FriendCard = ({ friend }: { friend: Friend }) => {
  const colors: { [key: number]: string } = {
    1: "gray",
    2: "yellow",
    3: "green",
    4: "red",
  };
  const statusText: { [key: number]: string } = {
    1: "Not surfing",
    2: `Checking the waves at ${friend.location}`,
    3: `In the water at ${friend.location}`,
    4: `Done surfing at ${friend.location} Rating: ${friend.rating}`,
  };
  const queryClient = useQueryClient();

  const deleteFriendMutation = useMutation({
    mutationFn: (friendId: number) => deleteFriend(friend.userId, friendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const confirmFriendRequestMutation = useMutation({
    mutationFn: (friendId: number) =>
      confirmFriendRequest(friend.userId, friendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const handleConfirmFriend = () => {
    confirmFriendRequestMutation.mutate(friend.friendId);
  };

  const handleDeleteFriend = () => {
    deleteFriendMutation.mutate(friend.friendId);
  };
  //sent, received, accepted, rejected
  return (
    <li className="friend-card">
      <div className="friendCardHeader">
        <h5 className="friendName">{friend.username}</h5>
        <button onClick={handleDeleteFriend}>x</button>
      </div>
      <div className="friendStatus">
        {friend.request === "sent" && (
          <p className="friendStatus">Pending Friend Request</p>
        )}
        {friend.request === "received" && (
          <button onClick={handleConfirmFriend}>Accept Friend Request</button>
        )}
        {friend.request === "accepted" && (
          <p className="friendStatus">{statusText[friend.status]}</p>
        )}
      </div>
    </li>
  );
};
