import { Calendar } from "../components/Calendar/Calendar";

export const CalendarPage = ({ userId }: { userId: number }) => {
  return <Calendar userId={userId} />;
};
