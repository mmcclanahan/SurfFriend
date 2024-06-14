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
    2: "Checking the waves at",
    3: "In the water at ",
    4: "Done surfing, Rating: ",
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
    <li>
      <div className="friend-card">
        <div className="friendCardHeader">
          <h5 className="friendName">{friend.username}</h5>
          <button onClick={handleDeleteFriend}>x</button>
        </div>
        {friend.request === "sent" && (
          <p className="friendStatus">Pending Friend Request</p>
        )}
        {friend.request === "received" && (
          <button onClick={handleConfirmFriend}>Accept Friend Request</button>
        )}
        {friend.request === "accepted" && (
          <p className="friendStatus">
            {statusText[friend.status]}
            {(friend.status === 2 || friend.status === 3) &&
              friend.location &&
              `${friend.location}`}
            {friend.status === 4 && friend.rating && `${friend.rating}`}
          </p>
        )}
      </div>
    </li>
  );
};

/**<li
      className="friend-card"
      style={{
        backgroundColor: colors[friend.status],
      }}
    >
      <h5 className="friendName">{friend.displayName}</h5>
      <p className="friendStatus">
        {statusText[friend.status]}
        {friend.location && ` @ ${friend.location}`}
        {friend.rating && ` ${friend.rating}`}
        {` ${friend.sessionTime}`}
      </p>
    </li> */
