import { FriendSession } from "../../types/types";
import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";

//look at notes for me only view for feed
export const DiaryCard = ({ session }: { session: FriendSession }) => {
  const formatTimeStamp = (timestamp: string) => {
    const date = new Date(timestamp);
    if (isToday(date)) {
      return `${format(date, "h:mm a")}`;
    } else if (isYesterday(date)) {
      return `a day ago ${format(date, "h:mm a")}`;
    } else {
      const timeAgo = formatDistanceToNow(date, { addSuffix: true });
      return `${format(date, "MM d, yyyy h:mm a")} (${timeAgo})`;
    }
  };

  return (
    <div className="flex flex-col border p-2 w-[100%] bg-white">
      <div className="flex justify-between">
        <h4 className="text-lg">@{session.UserStatus.display_name}</h4>
        <p className="text-sm">{formatTimeStamp(session.created_at)}</p>
      </div>
      <div className="flex justify-evenly items-center">
        <p>{session.spot_name}</p>
        <p className="flex justify-center items-center border border-black w-10 h-10">
          {session.rating}
        </p>
        <p>{session.city}</p>
      </div>
      <div className="flex justify-between border rounded-xl p-4">
        <p>{session.diary}</p>
      </div>
    </div>
  );
};
