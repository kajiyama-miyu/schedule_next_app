import { Typography, CssBaseline, Paper, GridList } from "@material-ui/core";
import useSWR from "swr";
import Layout from "../components/Layout";
import { CalenderProvider, CalederContext } from "../context/CalenderContext";
import dayjs from "dayjs";
import DateElement from "../components/DateElement";
import { setScheduleHours } from "../logic/schedule";
import { useMemo, useContext, useEffect } from "react";
import { Schedule } from "../type/type";
import ScheduleEventOnEachDay from "../components/ScheduleEventOnEachDay";

const hours: Array<number> = [
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  0,
  1,
  2,
  3,
  4,
  5,
];

export default function CalenderDate() {
  const scheduleSample: Array<Schedule> = [
    {
      scheduleId: 2,
      startDate: new Date(),
      endDate: new Date(),
      start: "8",
      end: "10",
      event: "event",
      categoryNum: 1,
      place: "tokyo",
      memo: "live",
      switchStatus: false,
    },
    {
      scheduleId: 4,
      startDate: new Date(),
      endDate: new Date(),
      start: "9",
      end: "14",
      event: "live",
      categoryNum: 8,
      place: "tokyo",
      memo: "live",
      switchStatus: false,
    },
  ];

  const callbackHour = useMemo(() => {
    const calender = setScheduleHours(hours, scheduleSample);

    return calender;
  }, [hours]);

  return (
    <CalenderProvider>
      <Layout title="Date">
        <div className="flex items-center justify-center　max-w-6xl">
          <CssBaseline />
          <Paper className="my-7 mx-10 py-5 px-10">
            <Typography variant="h4" align="center" className="mt-2 ml-1 pb-7">
              {dayjs().month() + 1}月 {dayjs().date()}日
            </Typography>
            {scheduleSample.map((s) => (
              <span key={s.scheduleId}>
                <ScheduleEventOnEachDay schedule={s} />
              </span>
            ))}
            <GridList
              cols={1}
              spacing={0}
              cellHeight="auto"
              className="border-t border-solid border-gray-200"
            >
              {callbackHour.map(({ hour, schedule }) => (
                <li key={hour}>
                  <DateElement hour={hour} schedules={schedule} />
                </li>
              ))}
            </GridList>
          </Paper>
        </div>
      </Layout>
    </CalenderProvider>
  );
}
