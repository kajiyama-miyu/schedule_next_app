import dayjs, { Dayjs } from "dayjs";
import { Typography } from "@material-ui/core";
import {
  isFirstDay,
  isSameDay,
  isSameMonth,
  getMonth,
} from "../logic/calender";
import { DayState } from "../context/CalenderContext";
import ScheduleTitle from "./ScheduleTitle";
import { Schedule } from "../type/type";

const styles: { [key: string]: React.CSSProperties } = {
  schedules: {
    overflow: "scroll",
    height: "calc(18vh - 50px)",
  },
};

type Props = {
  day: dayjs.Dayjs;
  month: DayState;
  schedules: Array<Schedule>;
  changePage: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    scheduleId: number
  ) => void;
  deleteTask: any;
};

const CalenderElement: React.FC<Props> = (props) => {
  const { day, month, schedules, changePage, deleteTask } = props;

  const format: string = isFirstDay(day) ? "M月D日" : "D";

  const today = dayjs();
  const isToday = isSameDay(day.toDate(), today);

  const currenyMonth = getMonth(month);
  const isCurrentMonth = isSameMonth(day, currenyMonth);
  const textColor = isCurrentMonth ? "textPrimary" : "textSecondary";

  return (
    <div className="border-r border-b border-solid border-gray-200 h-40 w-36 cursor-pointer">
      <Typography
        className="p-1 h-6"
        align="center"
        variant="caption"
        component="div"
        color={textColor}
      >
        <span
          className={
            isToday
              ? "inline-block leading-6 w-6 bg-blue-500 text-white rounded-full"
              : ""
          }
        >
          {day.format(format)}
        </span>
      </Typography>
      <div style={styles.schedules}>
        {schedules?.map((e) => (
          <ScheduleTitle
            key={e.scheduleId}
            schedule={e}
            changePage={changePage}
            deleteTask={deleteTask}
            date={day}
          />
        ))}
      </div>
    </div>
  );
};

export default CalenderElement;
