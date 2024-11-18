import { FriendSession } from "../../types/types";
import { DiaryCard } from "./DiaryCard";

interface FeedViewProps {
  allSessions: FriendSession[];
  viewAll: boolean;
  userId: string;
}

export const FeedView = ({ allSessions, viewAll, userId }: FeedViewProps) => {
  const filteredSessions = viewAll
    ? allSessions
    : allSessions.filter((session) => session.user_id === userId);

  if (filteredSessions.length === 0) {
    return <p className="text-center">No sessions to display.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {filteredSessions.map((session) => (
        <DiaryCard key={session.id} session={session} />
      ))}
    </div>
  );
};
