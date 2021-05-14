import axios from "axios";
import { Schedule } from "../type/type";
import fetch from "node-fetch";
import dayjs from "dayjs";

export async function getAllSchedule() {
  // const res = await axios.get<Array<Schedule>>(
  //   `${process.env.NEXT_PUBLIC_RESTAPI_URL}schedule`
  // );

  const res = await fetch(new URL(`http://localhost:8080/schedule`));
  const schedule: Array<Schedule> = await res.json();
  console.log("res", res.json());
  // console.log("fetch", schedule);

  return schedule;
}

export async function getScheduleData(id: number) {
  const res = await axios.get<Schedule>(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}detail-schedule/${id}`
  );

  const schedule = {
    schedule: res.data,
  };
  return schedule;
}

export async function getScheduleDataByStartDate(startDate: dayjs.Dayjs) {
  const res = await axios.get<Array<Schedule>>(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}date-schedul/${startDate}`
  );

  const schedules = {
    schedules: res.data,
  };
  return schedules;
}

export async function getAllScheduleIds() {
  const res = await axios.get<Array<Schedule>>(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}schedule`
  );

  const schedules = await res.data;

  return schedules.map((schedule) => {
    return {
      params: {
        id: String(schedule.scheduleId),
      },
    };
  });
}

export async function getAllScheduleStartId() {
  const res = await axios.get<Array<Schedule>>(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}schedule`
  );

  const schedules = await res.data;

  return schedules.map((schedule) => {
    return {
      params: {
        startDate: schedule.startDate,
      },
    };
  });
}
