import { useState } from "react";
import { Session } from "../../types/types";
import { SessionCondition } from "./SessionCondition";
import { parseISO, format } from "date-fns";
import { Modal } from "../Modal";
import { Confirm } from "../Confirm";

export const SessionCard = ({ session }: { session: Session }) => {
  const [showConditions, setShowConditions] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const showConfirmDeleteModal = () => setConfirm(true);

  const toggleConditions = () => setShowConditions(!showConditions);

  const time = format(parseISO(session.createdAt), "hh:mm a");
  const header = "Delete this session from the Calendar?";

  return (
    <div className="border border-black">
      <button onClick={showConfirmDeleteModal}>x</button>
      <div onClick={toggleConditions}>
        <p>Time: {time}</p>
        <p>Spot Name: {session.spotName}</p>
        <p>City: {session.city}</p>
        <p>Rating: {session.rating}</p>
        {showConditions && (
          <SessionCondition
            conditions={session.conditions}
            diary={session.diary}
          />
        )}
      </div>
      <Modal show={confirm} onClose={() => setConfirm(false)}>
        <Confirm
          header={header}
          backFn={() => setConfirm(false)}
          confirmFn={() => {}}
          info={[
            time,
            session.spotName,
            session.city,
            `Rating: ${session.rating}`,
          ]}
        />
      </Modal>
    </div>
  );
};
