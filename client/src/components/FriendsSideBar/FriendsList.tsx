import { useState } from "react";
import { Loading } from "../Loading";
import { FriendCard } from "./FriendCard";
import { Friend } from "../../types/types";
import { useFriends } from "../../hooks/useFriends";
import { useNotification } from "../../hooks/NotificationContext";
import "../../styles/friendSideBar.css";

export const FriendsList = ({ userId }: { userId: number }) => {
  const { friendsQuery, createFriendRequestMutation } = useFriends(userId);
  const { showNotification } = useNotification();
  const [friendUsername, setFriendUsername] = useState("");

  if (friendsQuery.isLoading) return <Loading />;
  if (friendsQuery.isError) return <div>Error</div>;
  //do try catch block instead?

  const addFriend = async () => {
    try {
      await createFriendRequestMutation.mutateAsync(friendUsername);
      showNotification("Friend request sent", 1);
    } catch (error) {
      showNotification("User not found", 0);
    }
  };

  return (
    <div className="friendSideBar">
      <div className="friendSideBar-content">
        <h3 className="text-lg font-bold rounded bg-black text-white">
          Friends
        </h3>
        <div className="flex items-center gap-1 ">
          <input
            className="rounded-md p-1 w-40"
            type="text"
            placeholder="UserName"
            onChange={(e) => {
              setFriendUsername(e.target.value);
            }}
          />
          <button
            className="bg-myGreen hover:bg-myGreenHover text-myBlack py-2 px-4 rounded"
            onClick={addFriend}
          >
            I
          </button>
        </div>
        {friendsQuery.data?.length === 0 ? (
          <div className="items-center content-center">No Friends</div>
        ) : (
          <ul>
            {friendsQuery.data?.map((friend: Friend) => (
              <FriendCard
                key={friend.friendId}
                userId={userId}
                friend={friend}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
