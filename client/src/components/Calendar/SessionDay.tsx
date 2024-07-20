import Badge from "@mui/material/Badge";
import { getDate } from "date-fns";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";

export const SessionDay = (
  props: PickersDayProps<Date> & { highlightedDays?: number[] }
) => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isHighlighted =
    !outsideCurrentMonth && highlightedDays.indexOf(getDate(day)) >= 0;

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
