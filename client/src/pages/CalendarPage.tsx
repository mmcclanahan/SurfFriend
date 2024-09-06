import { useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { useUser } from "../hooks/UserContext";
import { Session } from "../types/types";
import { parseISO, isSameDay } from "date-fns";
import { SessionDay } from "../components/Calendar/SessionDay";
import { SessionView } from "../components/Calendar/SessionView";
import { getAllSessions } from "../Supa/queries/sessionsQuery";
import { useNotification } from "../hooks/NotificationContext";

export const CalendarPage = () => {
  const initialValue = new Date();
  const { userId } = useUser();
  const { showNotification } = useNotification();
  const [value, setValue] = useState<Date>(initialValue);
  const [allSessions, setAllSessions] = useState<Session[]>([]);
  const [selectedSessions, setSelectedSessions] = useState<Session[]>([]);

  const fetchSessions = async () => {
    try {
      const { data: sessions, error } = await getAllSessions(userId);
      if (error) {
        showNotification("Error fetching sessions", 0, 3000);
        return;
      }
      setAllSessions(sessions);
      const sessionsForToday = sessions.filter((session: Session) =>
        isSameDay(session.created_at, value)
      );
      setSelectedSessions(sessionsForToday);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleDayClick = (newValue: Date) => {
    setValue(newValue);
    const sessions = allSessions.filter((session) =>
      isSameDay(session.created_at, newValue)
    );
    setSelectedSessions(sessions);
  };

  return (
    <div className="b flex mt-[10vh] h-[70vh] w-[80vw] mx-auto">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateCalendar
          className="border border-red-600"
          value={value}
          onChange={handleDayClick}
          onMonthChange={() => {}}
          slots={{
            day: SessionDay,
          }}
          slotProps={{
            day: {
              allSessions,
            } as any,
          }}
        />
        <SessionView sessions={selectedSessions} />
      </LocalizationProvider>
    </div>
  );
};
