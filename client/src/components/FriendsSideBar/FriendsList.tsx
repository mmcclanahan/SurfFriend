import { useEffect, useState } from "react";
import { Loading } from "../Loading";
import { FriendCard } from "./FriendCard";
import { Friend } from "../../types/types";
import { useNotification } from "../../hooks/NotificationContext";
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
  const [addingFriend, setAddingFriend] = useState(false);

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
    setAddingFriend(false);
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

  const openAddFriendInput = () => {
    setAddingFriend(!addingFriend);
  };
  //for button and friends header try self aligning one to center and other to end and top
  return (
    <div className="right-0 h-[calc(100vh-4rem)] bg-red-500 p-4 overflow-y-auto">
      <div className="friendSideBar-content">
        <div className="flex justify-between rounded bg-black text-white">
          <h3 className="text-lg font-bold rounded bg-black text-white">
            Friends
          </h3>
          <button onClick={openAddFriendInput}>+</button>
        </div>
        {addingFriend && (
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
              Add
            </button>
          </div>
        )}
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
