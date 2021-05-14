import CalenderElement from "../components/CalenderElement";
import { createCarender } from "../logic/calender";
import {
  CssBaseline,
  Grid,
  GridList,
  Paper,
  Typography,
} from "@material-ui/core";
import { CalederContext, DayState } from "../context/CalenderContext";
import React, { useContext, useMemo, useState } from "react";
import { getNextMonth, getPreviousMonth } from "../logic/calender";
import dayjs from "dayjs";
import AddScheduleDialog from "../components/AddScheduleDialog";
import axios from "axios";
import useSWR from "swr";
import { useEffect } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getAllSchedule } from "../lib/schedule";
import { Schedule } from "../type/type";
import { setSchedule } from "../logic/schedule";
import { useRouter } from "next/router";
import { isSameDay } from "../logic/calender";
import { CalenderProvider } from "../context/CalenderContext";
import Layout from "../components/Layout";
import { is } from "date-fns/locale";

const days: Array<string> = ["日", "月", "火", "水", "木", "金", "土"];

// const fetcher = (url: string) =>
//   axios.get<Array<Schedule>>(url).then((res) => res.data);
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const apiUrl = `http://localhost:8080/schedule`;

type Props = {
  schedules: Array<Schedule>;
};

export type CalenderType = Array<dayjs.Dayjs>;

//取得した予定をPropsとして受け取る
export default function Calender({ schedules }: Props) {
  const router = useRouter();
  const {
    calender,
    setCalenderData,
    setSelectDate,
    isOpen,
    select,
  } = useContext(CalederContext);
  const { data, mutate } = useSWR(apiUrl, fetcher, {
    initialData: schedules,
  });

  useEffect(() => {
    mutate();
    setCalenderData({ year: dayjs().year(), month: dayjs().month() + 1 });
  }, []);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [changeDate, setChangeDate] = useState(dayjs());
  const [selectStatus, setSelectStatus] = useState(false);

  const handleOpen = (c: dayjs.Dayjs): void => {
    // setDialogOpen(true);
    // setChangeDate(c);
    setSelectDate(c);
  };

  const handleClose = (): void => {
    setDialogOpen(false);
  };

  // const filterSchedule = data?.filter((s) => s.event === "live");

  // console.log("scheduleFilter", filterSchedule);

  const callbackCalender = useMemo(() => {
    const calenders = setSchedule(createCarender(calender), data);

    return calenders;
  }, [calender]);

  const setNextMonthData = (): void => {
    const nextMonth: DayState = getNextMonth(calender);
    setCalenderData(nextMonth);
  };

  const setPreviousData = (): void => {
    const preMonth: DayState = getPreviousMonth(calender);
    setCalenderData(preMonth);
  };

  const handleDetailPage = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    scheduleId: number
  ): void => {
    e.stopPropagation();
    router.push(`/schedule/${scheduleId}`);
  };

  return (
    <CalenderProvider>
      <Layout title={"Home"}>
        <div className="flex items-center justify-center max-w-6xl">
          <CssBaseline />
          <Paper className="my-7 mx-10 py-5 px-10">
            <Grid container justify="space-between">
              <Grid item>
                <div className="flex cursor-pointer mt-4">
                  <svg
                    onClick={setPreviousData}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mb-3 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                    />
                  </svg>
                </div>
              </Grid>
              <Grid item>
                <div className="flex cursor-pointer mt-4">
                  <svg
                    onClick={setNextMonthData}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mb-3 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Grid>
            </Grid>
            <Typography variant="h4" align="center" className="mt-2 ml-1">
              {calender.year}年 {calender.month}月
            </Typography>
            <GridList
              className={"border-l border-t border-solid border-gray-200"}
              cols={7}
              spacing={0}
              cellHeight="auto"
            >
              {days.map((d) => (
                <li key={d}>
                  <Typography
                    className="border-r border-solid border-gray-200 pt-3 w-36"
                    color="textSecondary"
                    align="center"
                    variant="caption"
                    component="div"
                  >
                    {d}
                  </Typography>
                </li>
              ))}
              {callbackCalender?.map(({ date, schedules }) => (
                <li key={date.toISOString()} onClick={() => handleOpen(date)}>
                  <CalenderElement
                    day={date}
                    month={calender}
                    schedules={schedules}
                    changePage={handleDetailPage}
                    deleteTask={mutate}
                  />
                </li>
              ))}
              {/* {callbackCalender.map((c) => (
            <li key={c.toISOString()} onClick={() => handleOpen(c)}>
              <CalenderElement day={c} month={calender} />
            </li>
          ))} */}
            </GridList>

            <AddScheduleDialog
              isDialogOpen={dialogOpen}
              dialogClose={handleClose}
              newDate={select}
              mutate={mutate}
            />
          </Paper>
        </div>
      </Layout>
    </CalenderProvider>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  //追加した予定を全件取得する
  const schedules = await getAllSchedule();
  console.log("schedules", schedules);

  return {
    props: {
      schedules,
    },
    revalidate: 3,
  };
};
