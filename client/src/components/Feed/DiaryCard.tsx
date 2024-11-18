import { FriendSession } from "../../types/types";
import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";

const formatTimeStamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  if (isToday(date)) return `${format(date, "h:mm a")}`;
  if (isYesterday(date)) return `Yesterday, ${format(date, "h:mm a")}`;
  return `${format(date, "MMM d, yyyy h:mm a")} (${formatDistanceToNow(date, {
    addSuffix: true,
  })})`;
};

export const DiaryCard = ({ session }: { session: FriendSession }) => (
  <div className="flex flex-col border p-4 w-full bg-white rounded shadow">
    <div className="flex justify-between items-center mb-2">
      <h4 className="text-lg font-semibold">
        @{session.UserStatus.display_name}
      </h4>
      <p className="text-sm text-gray-600">
        {formatTimeStamp(session.created_at)}
      </p>
    </div>
    <div className="flex justify-between items-center mb-4">
      <p>{session.spot_name}</p>
      <div className="flex justify-center items-center border border-black w-10 h-10">
        {session.rating}
      </div>
      <p>{session.city}</p>
    </div>
    <div className="bg-gray-100 rounded p-3">
      <p>{session.diary}</p>
    </div>
  </div>
);
