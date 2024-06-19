import { Friend } from "../types/types";
import { useFriends } from "../hooks/useFriends";

export const FriendCard = ({
  userId,
  friend,
}: {
  userId: number;
  friend: Friend;
}) => {
  const { handleDeleteFriend, handleConfirmFriend } = useFriends(userId);

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

  return (
    <li className="friend-card">
      <div className="friendCardHeader">
        <h5 className="friendName">{friend.username}</h5>
        <button
          onClick={() => {
            handleDeleteFriend(friend.friendId);
          }}
        >
          x
        </button>
      </div>
      <div className="friendStatus">
        {friend.request === "sent" && (
          <p className="friendStatus">Pending Friend Request</p>
        )}
        {friend.request === "received" && (
          <button
            onClick={() => {
              handleConfirmFriend(friend.friendId);
            }}
          >
            Accept Friend Request
          </button>
        )}
        {friend.request === "accepted" && (
          <p className="friendStatus">{statusText[friend.status]}</p>
        )}
      </div>
    </li>
  );
};
