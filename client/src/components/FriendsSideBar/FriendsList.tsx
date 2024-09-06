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
import { useUser } from "../../hooks/UserContext";

export const FriendsList = () => {
  const { showNotification } = useNotification();
  const { userId } = useUser();
  const [friendUsername, setFriendUsername] = useState("");
  const [allFriends, setAllFriends] = useState<Friend[]>([]);

  const fetchFriends = async () => {
    const { data, error } = await getAllFriends(userId);
    if (error) {
      showNotification("Error getting friends", 0, 2000);
      return;
    }
    setAllFriends(data);
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const addFriend = async () => {
    const response = await createFriendRequest(friendUsername, userId);
    if (response.error) {
      showNotification("User not found", 0, 2000);
      return;
    }
    showNotification("Friend request sent", 1, 2000);
    fetchFriends();
  };

  const deleteFriendAndReload = async (friendId: string) => {
    const response = await deleteFriend(friendId, userId);
    if (response.error) {
      showNotification("Error deleting friend", 0, 2000);
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
