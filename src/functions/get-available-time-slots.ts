import { getDay, getHours, getMinutes, isToday } from "date-fns";
import type { IFormattedOpeningHours } from "./generate-time-slots";

export function getAvailableTimeSlots(
  formattedOpeningHours: IFormattedOpeningHours[],
  dateSelected: Date | null,
) {
  if (!dateSelected) return [];

  const now = new Date();
  const currentHour = getHours(now);
  const currentMinutes = getMinutes(now);
  const dayOfWeekSelected = getDay(dateSelected);

  return (
    formattedOpeningHours
      .find((item) => item.dayOfWeek === dayOfWeekSelected)
      ?.schedules.filter((time) => {
        if (isToday(dateSelected)) {
          const [hours, minutes] = time.split(":").map(Number);

          if (hours > currentHour) {
            return true;
          }

          if (hours === currentHour && minutes > currentMinutes) {
            return true;
          }

          return false;
        }

        return true;
      }) || []
  );
}
