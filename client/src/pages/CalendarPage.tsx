import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { getAllSessions } from "../API/sessions";
import "../styles/calendarPage.css";
import { Session } from "../types/types";

export const CalendarPage = ({ userId }: { userId: number }) => {
  const [value, setValue] = useState(new Date());
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    getAllSessions(userId)
      .then((allSessions) => {
        setSessions(allSessions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  // Helper function to check if two dates are the same day
  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const ratingColorBank = {
    1: "cal-1",
    2: "cal-2",
    3: "cal-3",
    4: "cal-4",
    5: "cal-5",
  };

  // Function to provide content for calendar tiles
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const session = sessions.find((session: Session) =>
        isSameDay(new Date(session.createdAt), date)
      );
      if (session) {
        return (
          <div style={{ position: "relative", height: "100%" }}>
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                height: "10px",
                width: "10px",
                backgroundColor: "red",
                borderRadius: "50%",
              }}
            ></span>
          </div>
        );
      }
    }
    return null;
  };

  const change = (value) => {
    setValue(value);
  };
  //bigger calender to fill more of the screen
  //want all the days to be the same size just bigger

  return (
    <div className="flex justify-center bg-myBlack min-h-screen">
      <Calendar
        className="calendar max-h-96 w-full max-w-3xl"
        onChange={change}
        value={value}
        tileContent={tileContent}
        calendarType="gregory"
      />
    </div>
  );
};
