import dayjs from "dayjs";

export type Schedule = {
  scheduleId: number;
  startDate: Date;
  endDate: Date;
  start?: Date;
  end?: Date;
  event: string;
  categoryNum: number;
  place: string;
  memo: string;
};
