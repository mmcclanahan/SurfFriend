import { useState } from "react";
import { Loading } from "../Loading";
import { FriendCard } from "./FriendCard";
import { Friend } from "../../types/types";
import { useFriends } from "../../hooks/useFriends";
import "../../styles/friendSideBar.css";

export const FriendsList = ({ userId }: { userId: number }) => {
  const { friendsQuery, handleAddFriend } = useFriends(userId);
  const [friendUsername, setFriendUsername] = useState("");

  if (friendsQuery.isLoading) return <Loading />;
  if (friendsQuery.isError) return <div>Error</div>;
  if (!friendsQuery.data || friendsQuery.data.length === 0)
    return <div>No friends</div>;

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
        <button
          onClick={() => {
            handleAddFriend(friendUsername);
          }}
        >
          Add Friend
        </button>
        <ul>
          {friendsQuery.data?.map((friend: Friend) => (
            <FriendCard key={friend.friendId} userId={userId} friend={friend} />
          ))}
        </ul>
      </div>
    </div>
  );
};
