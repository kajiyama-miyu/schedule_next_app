import { isEventOnSameDay, isSameHour } from "./calender";
import { CalenderType } from "../pages/calender";
import { Schedule } from "../type/type";

export const setSchedule = (
  calender: CalenderType,
  schedules: Array<Schedule>
) =>
  calender.map((c) => ({
    date: c,
    schedules: schedules?.filter((e) =>
      isEventOnSameDay(e.startDate, c, e.endDate)
    ),
  }));

export const setScheduleHours = (
  hours: Array<number>,
  schedules: Array<Schedule>
) =>
  hours.map((h) => ({
    hour: h,
    schedule: schedules?.filter((e) => isSameHour(String(h), e.start, e.end)),
  }));
