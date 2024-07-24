import { useState } from "react";
import { Friend } from "../../types/types";
import { useFriends } from "../../hooks/useFriends";
import { Modal } from "../Modal";
import { Confirm } from "../Confirm";

export const FriendCard = ({
  userId,
  friend,
}: {
  userId: number;
  friend: Friend;
}) => {
  const [showModal, setShowModal] = useState(false);
  const showConfirmDeleteModal = () => setShowModal(true);
  const closeConfirmDeleteModal = () => setShowModal(false);
  const { handleDeleteFriend, handleConfirmFriend } = useFriends(userId);

  const colors: { [key: number]: string } = {
    1: "gray",
    2: "yellow",
    3: "green",
    4: "red",
  };
  const statusText: { [key: number]: string } = {
    1: "Not surfing",
    2: `Checking the waves at ${friend.spotName} in ${friend.city}`,
    3: `In the water at ${friend.spotName} in ${friend.city}`,
    4: `Done surfing at ${friend.spotName} in ${friend.city} Rating: ${friend.rating}`,
  };

  return (
    <li className="friend-card">
      <div className="friendCardHeader">
        <h5 className="friendName">{friend.username}</h5>
        <button onClick={showConfirmDeleteModal}>x</button>
        <Modal show={showModal} onClose={closeConfirmDeleteModal}>
          <Confirm
            header={`Are you sure you want to delete ${friend.username} from your friends list?`}
            backFn={closeConfirmDeleteModal}
            confirmFn={() => {
              handleDeleteFriend(friend.friendId);
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
