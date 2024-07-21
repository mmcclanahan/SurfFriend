import { useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { getAllSessions } from "../../API/sessions";
import { Session } from "../../types/types";
import { parseISO, isSameDay } from "date-fns";
import { SessionDay } from "./SessionDay";
import { SessionView } from "./SessionView";
import "../../styles/calendar.css";

export const Calendar = ({ userId }: { userId: number }) => {
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
    <div className="flex justify-between bg-myGray rounded shadow-white shadow-md p-5 mt-20 h-full w-full max-w-xl max-h-xl">
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
