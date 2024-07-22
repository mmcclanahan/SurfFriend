import { useState } from "react";
import { Session } from "../../types/types";
import { SessionCondition } from "./SessionCondition";
import { parseISO, format } from "date-fns";

export const SessionCard = ({ session }: { session: Session }) => {
  const [showConditions, setShowConditions] = useState(false);
  const toggleConditions = () => setShowConditions(!showConditions);

  const time = format(parseISO(session.createdAt), "hh:mm a");

  return (
    <div
      key={session.createdAt}
      className="border border-black"
      onClick={toggleConditions}
    >
      <p>Time: {time}</p>
      <p>Spot Name: {session.spotName}</p>
      <p>City: {session.city}</p>
      <p>Rating: {session.rating}</p>
      {showConditions && <SessionCondition conditions={session.conditions} />}
    </div>
  );
};
