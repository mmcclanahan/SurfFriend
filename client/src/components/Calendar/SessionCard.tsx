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

  const time = format(parseISO(session.created_at), "hh:mm a");
  const header = "Delete this session from the Calendar?";

  return (
    <div className="flex flex-col max-w-sm p-2 border rounded-lg shadow border-[#FFE8A3]">
      <button className="self-end mb-2" onClick={showConfirmDeleteModal}>
        x
      </button>
      <div className="flex justify-between items-center">
        <p className="text-sm text-[#FFCD29]">{time}</p>
        <p className="text-l text-[#FFCD29]">{`${session.rating}/5`}</p>
      </div>
      <div onClick={toggleConditions}>
        <div className="flex border-b-2 pb-1 border-[#d7c07b]">
          <p className="text-xl font-bold text-[#FFE8A3]">{`${session.spot_name} in ${session.city}`}</p>
        </div>
        <h3 className="text-sm mt-2 text-[#FFCD29]">Diary Entry</h3>
        <p
          className={`p-1 text-[#FFE8A3] ${
            showConditions === true ? "border-b-2 border-[#d7c07b]" : ""
          }`}
        >
          {session.diary}
        </p>

        {showConditions ? (
          <SessionCondition
            conditions={session.conditions}
            diary={session.diary}
          />
        ) : (
          <p className="text-xs mt-2 text-center">click for conditions</p>
        )}
      </div>
      <Modal show={confirm} onClose={() => setConfirm(false)}>
        <Confirm
          header={header}
          backFn={() => setConfirm(false)}
          confirmFn={() => {}}
          info={[
            time,
            session.spot_name,
            session.city,
            `Rating: ${session.rating}`,
          ]}
        />
      </Modal>
    </div>
  );
};
