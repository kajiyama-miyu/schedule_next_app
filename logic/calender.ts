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

export const isEventOnSameDay = (
  d1: Date,
  d2: dayjs.Dayjs | null,
  d3: Date
) => {
  const format = "YYYYMMDD";

  return (
    dayjs(d1).format(format) === d2!.format(format) ||
    dayjs(d3).format(format) === d2!.format(format) ||
    (dayjs(d3).month() === d2.month() &&
      dayjs(d1).date() < d2.date() &&
      d2.date() < dayjs(d3).date())
  );
};

export const isSameHour = (h1: string, h2: string, h3: string) => {
  return (
    h1 === h2 ||
    Number(h1) === Number(h3) - 1 ||
    (Number(h2) < Number(h1) && Number(h1) < Number(h3))
  );
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
