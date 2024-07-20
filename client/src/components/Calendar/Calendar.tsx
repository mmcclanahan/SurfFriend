import { useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { getAllSessions } from "../../API/sessions";
import { Session } from "../../types/types";
import { getDate, parseISO, format } from "date-fns";
import { SessionDay } from "./SessionDay";
import { SessionView } from "./SessionView";
import "../../styles/calendar.css";

export const Calendar = ({ userId }: { userId: number }) => {
  const initialValue = new Date();
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);
  const [value, setValue] = useState<Date | null>(initialValue);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [session, setSession] = useState<Session[] | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessions = await getAllSessions(userId);
        setSessions(sessions);
        const daysToHighlight = sessions.map((session: Session) =>
          parseISO(session.createdAt)
        );
        setHighlightedDays(daysToHighlight);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSessions();
  }, [userId]);
  //make calendar wider and
  //when value changes get the session that matches the createdAt date
  const handleDayClick = (newValue: Date) => {
    setValue(newValue);
    const selectedDate = format(newValue, "yyyy-MM-dd");
    const selectedSession = sessions.filter(
      (session) => session.createdAt.split("T")[0] === selectedDate
    );
    console.log(selectedDate, "selectedDate");
    console.log(selectedSession, "selectedSession");
    console.log(newValue, "newValue");
    setSession(selectedSession || null);
  };

  return (
    <div className="flex mt-20">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateCalendar
          className="bg-myGray rounded shadow-white shadow-md"
          value={value}
          onChange={handleDayClick}
          onMonthChange={() => {}}
          slots={{
            day: SessionDay,
          }}
          slotProps={{
            day: {
              highlightedDays,
            } as any,
          }}
        />
        <SessionView session={session} />
      </LocalizationProvider>
    </div>
  );
};
