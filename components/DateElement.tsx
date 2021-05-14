import { GridList, Typography } from "@material-ui/core";
import React from "react";
import { Schedule } from "../type/type";
import ScheduleEachDay from "../components/ScheduleEachDay";

type Props = {
  hour: number;
  schedules: Array<Schedule>;
};

const DateElement: React.FC<Props> = (props) => {
  const { hour, schedules } = props;

  const newSchedules = schedules.filter((s) => s.switchStatus === false);

  return (
    <div className="border-b border-solid border-gray-200 h-48 w-full">
      <Typography
        className="p-0 h-0"
        variant="caption"
        component="div"
        align="left"
      >
        {hour} 時
      </Typography>
      <GridList cols={newSchedules.length} spacing={0} cellHeight="auto">
        {newSchedules.map((schedule) => (
          <span key={schedule.scheduleId}>
            <ScheduleEachDay schedule={schedule} hour={hour} />
          </span>
        ))}
      </GridList>
    </div>
  );
};

export default DateElement;
