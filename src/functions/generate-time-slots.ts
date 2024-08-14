import type { IOpeningHours } from "@/constants/opening-hours";
import { addMinutes, isBefore } from "date-fns";
import { formatDate } from "./format-date";

export interface IFormattedOpeningHours {
  dayOfWeek: number;
  schedules: string[];
}

export function generateTimeSlots(
  openingHours: IOpeningHours[],
): IFormattedOpeningHours[] {
  return openingHours.map(({ dayOfWeek, schedules: { from, to, gap } }) => {
    const formattedSchedules: string[] = [];
    let currentTime = from;

    while (isBefore(currentTime, to)) {
      formattedSchedules.push(formatDate(currentTime, "HH:mm"));

      currentTime = addMinutes(currentTime, gap);
    }

    return {
      dayOfWeek,
      schedules: formattedSchedules,
    };
  });
}
