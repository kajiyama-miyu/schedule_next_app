import dayjs from "dayjs";

export type Schedule = {
  scheduleId: number;
  startDate: Date;
  endDate: Date;
  start?: string;
  end?: string;
  event: string;
  categoryNum: number;
  place: string;
  memo: string;
  switchStatus: boolean;
};
