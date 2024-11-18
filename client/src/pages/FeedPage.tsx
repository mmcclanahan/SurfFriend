import { useEffect, useState } from "react";
import { getFriendsSessions } from "../Supa/queries/friendQuery";
import { useUser } from "../hooks/UserContext";
import { FriendSession } from "../types/types";
import { DiaryCard } from "../components/Feed/DiaryCard";

export const FeedPage = () => {
  //get all friends sessions
  //get users friends
  //make a view for the feed
  //have a toggle to do friends vs just you
  const { userId } = useUser();
  const [friendsSessions, setFriendsSessions] = useState<FriendSession[]>([]);

  useEffect(() => {
    const getFriends = async () => {
      const { data, error } = await getFriendsSessions(userId);
      if (error) {
        console.log("Error getting friends sessions:", error);
        return;
      }
      if (data) {
        setFriendsSessions(data);
      }
    };
    getFriends();
  }, []);
  //add message if no sessions from friends
  return (
    <div className="flex justify-center mt-[10vh] h-[70vh] w-[80vw] mx-auto">
      <div>
        {friendsSessions.map((session) => {
          return <DiaryCard key={session.created_at} session={session} />;
        })}
      </div>
    </div>
  );
};
