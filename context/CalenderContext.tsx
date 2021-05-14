import React, { createContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { formatMonth } from "../logic/calender";
import { Schedule } from "../type/type";

type CalenderContextProps = {
  calender: DayState;
  setCalenderData: (calender: DayState) => void;
  setSelectDate: (date: dayjs.Dayjs) => void;
  setSchedule: (schedule: Schedule) => void;
  select: dayjs.Dayjs;
  scheduleCtx: Schedule;
  isOpen: boolean;
  isOpenDialog: () => void;
  isCloseDialog: () => void;
};

export type DayState = {
  year: number;
  month: number;
};

export const CalederContext = createContext<CalenderContextProps>({
  calender: { year: dayjs().year(), month: dayjs().month() + 1 },
  setCalenderData: () => {},
  setSelectDate: () => {},
  setSchedule: () => {},
  select: dayjs(),
  scheduleCtx: {
    scheduleId: 0,
    startDate: new Date(),
    endDate: new Date(),
    start: "1",
    end: "1",
    event: "",
    categoryNum: 1,
    place: "",
    memo: "",
    switchStatus: true,
  },
  isOpen: false,
  isOpenDialog: () => {},
  isCloseDialog: () => {},
});

export const CalenderProvider: React.FC = ({ children }) => {
  const day = dayjs();
  const [calender, setCalender] = useState<DayState>(formatMonth(day));
  const [select, setSelect] = useState(dayjs());
  const [scheduleCtx, setScheduleCtx] = useState<Schedule>({
    scheduleId: 0,
    startDate: new Date(),
    endDate: new Date(),
    start: "1",
    end: "1",
    event: "",
    categoryNum: 1,
    place: "",
    memo: "",
    switchStatus: true,
  });
  const [isOpen, setIsOpen] = useState(false);

  const isOpenDialog = () => {
    setIsOpen(true);
  };

  const isCloseDialog = () => {
    setIsOpen(false);
  };
  const setSelectDate = (date: dayjs.Dayjs) => {
    setSelect(date);
  };

  const setSchedule = (schedule: Schedule) => {
    setScheduleCtx(schedule);
  };

  const setCalenderData = (calender: DayState) => {
    setCalender({ year: calender.year, month: calender.month });
  };

  return (
    <CalederContext.Provider
      value={{
        calender,
        setCalenderData: setCalenderData,
        setSelectDate: setSelectDate,
        setSchedule: setSchedule,
        select,
        scheduleCtx,
        isOpenDialog: isOpenDialog,
        isOpen,
        isCloseDialog: isCloseDialog,
      }}
    >
      {children}
    </CalederContext.Provider>
  );
};
