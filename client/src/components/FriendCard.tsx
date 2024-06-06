import { Friend } from "../types/types";

export const FriendCard = ({ friend }: { friend: Friend }) => {
  //0-4 rating
  //if
  const colors: { [key: number]: string } = {
    1: "gray",
    2: "yellow",
    3: "green",
    4: "red",
  };
  const statusText: { [key: number]: string } = {
    1: "Not surfing",
    2: "Checking the waves at",
    3: "In the water",
    4: "Done surfing",
  };

  return (
    <li
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
    </li>
  );
};
