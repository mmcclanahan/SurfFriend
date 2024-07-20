import Badge from "@mui/material/Badge";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { isSameDay } from "date-fns";

interface SessionDayProps extends PickersDayProps<Date> {
  highlightedDays: Date[];
}

export const SessionDay = ({
  highlightedDays,
  day,
  outsideCurrentMonth,
  ...other
}: SessionDayProps) => {
  const isHighlighted = highlightedDays.some((highlightedDay) =>
    isSameDay(day, highlightedDay)
  );

  return (
    <Badge
      overlap="circular"
      badgeContent={isHighlighted ? "🌊" : undefined}
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
