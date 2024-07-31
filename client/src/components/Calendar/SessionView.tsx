import { Session } from "../../types/types";
import { SessionCard } from "./SessionCard";

export const SessionView = ({ sessions }: { sessions: Session[] }) => {
  return (
    <div className="session-view bg-myGray border border-red-600">
      {sessions.length === 0 ? (
        <p>No session</p>
      ) : (
        sessions.map((session) => (
          <SessionCard key={session.createdAt} session={session} />
        ))
      )}
    </div>
  );
};