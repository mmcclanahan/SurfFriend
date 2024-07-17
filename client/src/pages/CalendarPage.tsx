import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { getAllSessions } from "../API/sessions";
import "react-calendar/dist/Calendar.css";
import { Session } from "../types/types";

export const CalendarPage = ({ userId }: { userId: number }) => {
  const [value, setValue] = useState(new Date());
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    getAllSessions(userId)
      .then((allSessions) => {
        setSessions(allSessions);
        console.log(allSessions);
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

  // Function to provide content for calendar tiles
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const session = sessions.find((session) =>
        isSameDay(new Date(session.createdAt), date)
      );
      if (session) {
        return <div className="dot"></div>;
      }
    }
    return null;
  };

  // Function to provide background color based on rating
  const getColorForRating = (rating) => {
    switch (rating) {
      case 1:
        return "red";
      case 2:
        return "orange";
      case 3:
        return "yellow";
      case 4:
        return "lightgreen";
      case 5:
        return "green";
      default:
        return "white";
    }
  };

  const change = (value) => {
    setValue(value);
  };

  return (
    <div className="flex justify-center bg-myBlack min-h-screen">
      <Calendar
        className="bg-myGray rounded shadow-white shadow-md p-5 mt-20 max-h-96 max-w-96"
        onChange={change}
        value={value}
        tileContent={tileContent}
      />
    </div>
  );
};
