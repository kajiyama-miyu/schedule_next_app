import { Schedule } from "../type/type";
import Link from "next/link";
import { Grid } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import axios from "axios";
import { useRouter } from "next/router";

export type Props = {
  schedule: Schedule;
  changePage: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    scheduleId: number
  ) => void;
  deleteTask: any;
};

const ScheduleTitle: React.FC<Props> = (props) => {
  const { schedule, changePage, deleteTask } = props;

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

    <div
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        changePage(e, schedule.scheduleId)
      }
      className="w-full bg-green-200 text-white rounded text-sm py-px px-1 my-mx mx-0 cursor-pointer"
    >
      {schedule.event}
    </div>

    // </Link>
  );
};

export default ScheduleTitle;
