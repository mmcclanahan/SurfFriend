import Badge from "@mui/material/Badge";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { isSameDay } from "date-fns";
import { Session } from "../../types/types";

interface SessionDayProps extends PickersDayProps<Date> {
  allSessions: Session[];
}
const ratingIcon = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
};

export const SessionDay = ({
  allSessions,
  day,
  outsideCurrentMonth,
  ...other
}: SessionDayProps) => {
  const sessions = allSessions.filter((session) =>
    isSameDay(day, session.createdAt)
  );
  const rating = Math.round(
    sessions.reduce((acc, session) => acc + session.rating, 0) / sessions.length
  ) as 1 | 2 | 3 | 4 | 5;
  const isHighlighted = sessions !== undefined;
  const badgeContent = isHighlighted ? ratingIcon[rating] : undefined;

  //Pickers day is the day badge is the badge that goes on top of the day

  return (
    <Badge
      overlap="circular"
      badgeContent={badgeContent}
      color={isHighlighted ? "primary" : "default"}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
};
