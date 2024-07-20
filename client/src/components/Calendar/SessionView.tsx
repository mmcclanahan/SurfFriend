import { Session } from "../../types/types";

export const SessionView = ({ session }: { session: Session[] | null }) => {
  return (
    <div className="session-view">
      {session === null ? (
        <p>No session</p>
      ) : (
        session.map((session) => (
          <div key={session.createdAt} className="session">
            <p>Date: {new Date(session.createdAt).toLocaleDateString()}</p>
            <p>City: {session.city}</p>
            <p>Spot Name: {session.spotName}</p>
            <p>Rating: {session.rating}</p>
            <p>Conditions: null</p>
          </div>
        ))
      )}
    </div>
  );
};
