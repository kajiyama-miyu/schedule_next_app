import { Schedule } from "../type/type";
import Link from "next/link";
import { Grid } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import axios from "axios";
import { useRouter } from "next/router";
import dayjs from "dayjs";

export type Props = {
  schedule: Schedule;
  date: dayjs.Dayjs;
  changePage: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    scheduleId: number
  ) => void;
  deleteTask: any;
};

const ScheduleTitle: React.FC<Props> = (props) => {
  const { schedule, changePage, deleteTask, date } = props;

  const handleDelete = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    await axios.delete(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/delete/${schedule.scheduleId}`
    );

    deleteTask();
  };

  return (
    // <Link href={`/schedule/${schedule.scheduleId}`}>

    <>
      {schedule.categoryNum === 1 && (
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            changePage(e, schedule.scheduleId)
          }
          className="w-full bg-yellow-200 text-white rounded text-sm py-px px-1 my-mx mx-0 cursor-pointer"
        >
          {schedule.event}
        </div>
      )}
      {schedule.categoryNum === 2 && (
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            changePage(e, schedule.scheduleId)
          }
          className="w-full bg-red-300 text-white rounded text-sm py-px px-1 my-mx mx-0 cursor-pointer"
        >
          {schedule.event}
        </div>
      )}
      {schedule.categoryNum === 3 && (
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            changePage(e, schedule.scheduleId)
          }
          className="w-full bg-yellow-500 text-white rounded text-sm py-px px-1 my-mx mx-0 cursor-pointer"
        >
          {schedule.event}
        </div>
      )}
      {schedule.categoryNum === 4 && (
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            changePage(e, schedule.scheduleId)
          }
          className="w-full bg-purple-300 text-white rounded text-sm py-px px-1 my-mx mx-0 cursor-pointer"
        >
          {schedule.event}
        </div>
      )}
      {schedule.categoryNum === 5 && (
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            changePage(e, schedule.scheduleId)
          }
          className="w-full bg-pink-300 text-white rounded text-sm py-px px-1 my-mx mx-0 cursor-pointer"
        >
          {schedule.event}
        </div>
      )}
      {schedule.categoryNum === 6 && (
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            changePage(e, schedule.scheduleId)
          }
          className="w-full bg-green-300 text-white rounded text-sm py-px px-1 my-mx mx-0 cursor-pointer"
        >
          {schedule.event}
        </div>
      )}
      {schedule.categoryNum === 7 && (
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            changePage(e, schedule.scheduleId)
          }
          className="w-full bg-gray-300 text-white rounded text-sm py-px px-1 my-mx mx-0 cursor-pointer"
        >
          {schedule.event}
        </div>
      )}
      {schedule.categoryNum === 8 && (
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            changePage(e, schedule.scheduleId)
          }
          className="w-full bg-blue-300 text-white rounded text-sm py-px px-1 my-mx mx-0 cursor-pointer"
        >
          {schedule.event}
        </div>
      )}
    </>

    // </Link>
  );
};

export default ScheduleTitle;
