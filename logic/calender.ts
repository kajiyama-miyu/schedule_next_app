import dayjs from "dayjs";
import { DayState } from "../context/CalenderContext";

type calendarType = Array<dayjs.Dayjs>;

export const createCarender = (month: DayState): calendarType => {
  const firstDay = getMonth(month);
  const firstDayIndex = firstDay.day();

  return Array(35)
    .fill(0)
    .map((_, i) => {
      const diffFromFirstDay = i - firstDayIndex;
      const day = firstDay.add(diffFromFirstDay, "day");

      return day;
    });
};

export const isSameDay = (d1: Date, d2: dayjs.Dayjs | null) => {
  const format = "YYYYMMDD";
  return dayjs(d1).format(format) === d2!.format(format);
};

export const isSameMonth = (m1: dayjs.Dayjs, m2: dayjs.Dayjs) => {
  const format = "YYYYMM";
  return m1.format(format) === m2.format(format);
};

export const isFirstDay = (day: dayjs.Dayjs) => day.date() === 1;

export const getMonth = ({ year, month }: DayState) => {
  return dayjs(`${year}-${month}`);
};

export const getNextMonth = (month: DayState) => {
  const day = getMonth(month).add(1, "month");

  return formatMonth(day);
};

export const getPreviousMonth = (month: DayState) => {
  const day = getMonth(month).add(-1, "month");

  return formatMonth(day);
};

export const formatMonth = (day: dayjs.Dayjs): DayState => ({
  month: day.month() + 1,
  year: day.year(),
});
