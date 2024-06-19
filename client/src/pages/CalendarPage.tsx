import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { getSessions } from "../API/sessions";

export const CalendarPage = () => {
  //get current date
  //show a calender for the current month
  //show time and rating and location for the incoming sessions
  //color code the sessions based on the rating
  const [value, setValue] = useState(new Date());
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Fetch session data when the component mounts
    const fetchSessions = async () => {
      const sessionData = await getSessions(1, 12);
      setSessions(sessionData);
    };

    fetchSessions();
  }, []);

  // Helper function to check if two dates are the same day
  const isSameDay = (d1, d2) => {
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
        isSameDay(new Date(session.date), date)
      );
      if (session) {
        return (
          <div style={{ backgroundColor: getColorForRating(session.rating) }}>
            <p>{session.date}</p>
            <p>{session.location}</p>
            <p>Rating: {session.rating}</p>
          </div>
        );
      }
    }
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

  return <Calendar onChange={change} value={value} tileContent={tileContent} />;
};
