import { useEffect, useState } from "react";
import { Loading } from "../Loading";
import { FriendCard } from "./FriendCard";
import { Friend } from "../../types/types";
import { useNotification } from "../../hooks/NotificationContext";
import "../../styles/friendSideBar.css";
import {
  getAllFriends,
  createFriendRequest,
  acceptFriendRequest,
  deleteFriend,
} from "../../Supa/queries/friendQuery";

export const FriendsList = ({ userId }: { userId: string }) => {
  const { showNotification } = useNotification();
  const [friendUsername, setFriendUsername] = useState("");
  const [allFriends, setAllFriends] = useState<Friend[]>([]);

  const fetchFriends = async () => {
    const { data, error } = await getAllFriends();
    if (error) {
      showNotification("Error getting friends", 0);
      return;
    }
    setAllFriends(data);
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const addFriend = async () => {
    const response = await createFriendRequest(friendUsername);
    if (response.error) {
      showNotification("User not found", 0);
      return;
    }
    showNotification("Friend request sent", 1);
    fetchFriends();
  };

  const deleteFriendAndReload = async (friendId: string) => {
    const response = await deleteFriend(friendId);
    if (response.error) {
      showNotification("Error deleting friend", 0);
      return;
    }
    fetchFriends();
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
            name="friendUsername"
            type="text"
            placeholder="User Name"
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
        {allFriends.length === 0 ? (
          <div className="items-center content-center">No Friends</div>
        ) : (
          <ul>
            {allFriends.map((friend: Friend) => {
              return (
                <FriendCard
                  key={friend.friend_id}
                  userId={userId}
                  friend={friend}
                  fetchFriends={fetchFriends}
                  acceptFriendRequest={acceptFriendRequest}
                  deleteFriendAndReload={deleteFriendAndReload}
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
