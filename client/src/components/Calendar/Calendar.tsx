import { useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { getAllSessions } from "../../API/sessions";
import { Session } from "../../types/types";
import { getDate, parseISO } from "date-fns";
import { SessionDay } from "./SessionDay";

export const Calendar = ({ userId }: { userId: number }) => {
  const initialValue = new Date();
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);
  const [value, setValue] = useState<Date | null>(initialValue);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessions = await getAllSessions(userId);
        const daysToHighlight = sessions.map((session: Session) =>
          getDate(parseISO(session.createdAt))
        );
        setHighlightedDays(daysToHighlight);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSessions();
  }, [userId]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateCalendar
        className="bg-myGray rounded shadow-white shadow-md"
        value={value}
        onChange={(newValue) => setValue(newValue)}
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
    </LocalizationProvider>
  );
};
