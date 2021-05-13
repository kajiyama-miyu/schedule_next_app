import React, { createContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { formatMonth } from "../logic/calender";

type CalenderContextProps = {
  calender: DayState;
  setCalenderData: (calender: DayState) => void;
};

export type DayState = {
  year: number;
  month: number;
};

export const CalederContext = createContext<CalenderContextProps>({
  calender: { year: dayjs().year(), month: dayjs().month() },
  setCalenderData: () => {},
});

export const CalenderProvider: React.FC = ({ children }) => {
  const day = dayjs();
  const [calender, setCalender] = useState<DayState>(formatMonth(day));

  const setCalenderData = (calender: DayState) => {
    setCalender({ year: calender.year, month: calender.month });
  };

  return (
    <CalederContext.Provider
      value={{ calender, setCalenderData: setCalenderData }}
    >
      {children}
    </CalederContext.Provider>
  );
};
