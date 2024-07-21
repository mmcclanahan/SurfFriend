import { useState } from "react";
import { Session } from "../../types/types";
import { SessionCondition } from "./SessionCondition";

export const SessionCard = ({ session }: { session: Session }) => {
  const [showConditions, setShowConditions] = useState(false);
  const toggleConditions = () => setShowConditions(!showConditions);
  return (
    <div
      key={session.createdAt}
      className="border border-black"
      onClick={toggleConditions}
    >
      <p>Date: {new Date(session.createdAt).toLocaleDateString()}</p>
      <p>Spot Name: {session.spotName}</p>
      <p>City: {session.city}</p>
      <p>Rating: {session.rating}</p>
      {showConditions && <SessionCondition conditions={session.conditions} />}
    </div>
  );
};
