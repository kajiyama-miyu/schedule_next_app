import { isSameDay } from "./calender";
import { CalenderType } from "../components/Calender";
import { Schedule } from "../type/type";

export const setSchedule = (
  calender: CalenderType,
  schedules: Array<Schedule>
) =>
  calender.map((c) => ({
    date: c,
    schedules: schedules?.filter((e) => isSameDay(e.startDate, c)),
  }));
