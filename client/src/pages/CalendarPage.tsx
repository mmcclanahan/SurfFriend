import { useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { getAllSessions } from "../API/sessions";
import { Session } from "../types/types";
import { parseISO, isSameDay } from "date-fns";
import { SessionDay } from "../components/Calendar/SessionDay";
import { SessionView } from "../components/Calendar/SessionView";

export const CalendarPage = ({ userId }: { userId: number }) => {
  const initialValue = new Date();
  const [value, setValue] = useState<Date>(initialValue);
  const [allSessions, setAllSessions] = useState<Session[]>([]);
  const [selectedSessions, setSelectedSessions] = useState<Session[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessions = await getAllSessions(userId);
        setAllSessions(sessions);
        const sessionsForToday = sessions.filter((session: Session) =>
          isSameDay(session.createdAt, value)
        );
        setSelectedSessions(sessionsForToday);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSessions();
  }, [userId]);

  const handleDayClick = (newValue: Date) => {
    setValue(newValue);
    const sessions = allSessions.filter((session) =>
      isSameDay(session.createdAt, newValue)
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
