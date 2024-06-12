import { useFriends } from "../hooks/useFriends";
import { FriendCard } from "./FriendCard";
import { Friend } from "../types/types";
import "../styles/friendSideBar.css";

export const FriendsList = ({ userId }: { userId: number }) => {
  const { friendsQuery } = useFriends(1);
  if (friendsQuery.isLoading) return <div>Loading...</div>;
  if (friendsQuery.isError) return <div>Error</div>;
  const friends = friendsQuery.data;

  return (
    <div className="friendSideBar">
      <div className="friendSideBar-content">
        <h3>Friends</h3>
        <ul>
          {friends}
          {/*friends.map((friend: Friend) => (
            <li key={friend.id}>
              <FriendCard friend={friend} />
            </li>
          ))*/}
        </ul>
      </div>
    </div>
  );
};
