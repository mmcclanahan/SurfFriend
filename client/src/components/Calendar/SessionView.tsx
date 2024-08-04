import { Session } from "../../types/types";
import { SessionCard } from "./SessionCard";

export const SessionView = ({ sessions }: { sessions: Session[] }) => {
  return (
    <div className="flex flex-col gap-4 overflow-auto">
      {sessions.length === 0 ? (
        <div className="flex flex-col max-w-sm p-2 border rounded-lg shadow border-[#FFE8A3]">
          <p className="text-l text-[#FFCD29]">No session</p>
        </div>
      ) : (
        sessions.map((session) => (
          <SessionCard key={session.createdAt} session={session} />
        ))
      )}
    </div>
  );
};
