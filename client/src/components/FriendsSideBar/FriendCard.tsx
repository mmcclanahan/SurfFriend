import { useState } from "react";
import { Friend } from "../../types/types";
import { Modal } from "../Modal";
import { Confirm } from "../Confirm";

export const FriendCard = ({
  userId,
  friend,
  fetchFriends,
  acceptFriendRequest,
  deleteFriendAndReload,
}: {
  userId: string;
  friend: Friend;
  fetchFriends: () => void;
  acceptFriendRequest: (
    friendId: string,
    userId: string
  ) => Promise<{
    data: { userResponse: any; friendResponse: any } | null;
    error: string | null;
  }>;
  deleteFriendAndReload: (friendId: string, userId: string) => Promise<void>;
}) => {
  const [showModal, setShowModal] = useState(false);
  const showConfirmDeleteModal = () => setShowModal(true);
  const closeConfirmDeleteModal = () => setShowModal(false);

  const colors: { [key: number]: string } = {
    1: "gray",
    2: "yellow",
    3: "green",
    4: "red",
  };
  const statusText: { [key: number]: string } = {
    1: "Not surfing",
    2: `Checking the waves at ${friend.spot_name} in ${friend.city}`,
    3: `In the water at ${friend.spot_name} in ${friend.city}`,
    4: `Done surfing at ${friend.spot_name} in ${friend.city} Rating: ${friend.rating}`,
  };

  return (
    <li className="items-center p-2">
      <div className="flex ">
        <h5 className="bg-slate-500 rounded-md">{friend.display_name}</h5>
        <button onClick={showConfirmDeleteModal}>x</button>
        <Modal show={showModal} onClose={closeConfirmDeleteModal}>
          <Confirm
            header={`Are you sure you want to delete ${friend.display_name} from your friends list?`}
            backFn={closeConfirmDeleteModal}
            confirmFn={async () => {
              deleteFriendAndReload(friend.friend_id, userId);
              closeConfirmDeleteModal();
            }}
            info={[]}
          />
        </Modal>
      </div>
      <div className="friendStatus">
        {friend.request === "sent" && (
          <p className="friendStatus">Pending Friend Request</p>
        )}
        {friend.request === "received" && (
          <button
            onClick={() => {
              acceptFriendRequest(userId, friend.friend_id);
              fetchFriends();
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
