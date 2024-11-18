import { useEffect, useState } from "react";
import { getAllRelatedSessions } from "../Supa/queries/friendQuery";
import { useUser } from "../hooks/UserContext";
import { FeedView } from "../components/Feed/FeedView";
import { ToggleButton } from "../components/ToggleButton";
import { FriendSession } from "../types/types";

export const FeedPage = () => {
  const { userId } = useUser();
  const [allSessions, setAllSessions] = useState<FriendSession[]>([]);
  const [viewAll, setViewAll] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      const { data, error } = await getAllRelatedSessions(userId);
      if (error) {
        setError("Failed to fetch sessions.");
      } else {
        setAllSessions(data || []);
      }
      setLoading(false);
    };
    fetchSessions();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col items-center mt-[10vh] h-[70vh] w-[80vw] mx-auto">
      <div className="flex gap-4 mb-4">
        <ToggleButton
          active={viewAll}
          onClick={() => setViewAll(true)}
          label="View All"
        />
        <ToggleButton
          active={!viewAll}
          onClick={() => setViewAll(false)}
          label="My Sessions"
        />
      </div>
      <FeedView allSessions={allSessions} viewAll={viewAll} userId={userId} />
    </div>
  );
};
