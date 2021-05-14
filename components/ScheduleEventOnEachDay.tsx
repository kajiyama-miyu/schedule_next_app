import { Schedule } from "../type/type";

type Props = {
  schedule: Schedule;
};

const ScheduleEventOnEachDay: React.FC<Props> = (props) => {
  const { schedule } = props;
  return (
    <div>
      {schedule.switchStatus && schedule.categoryNum === 1 && (
        <div className=" h-8 w-full flex items-center bg-yellow-200 text-white rounded text-xl py-px px-1 cursor-pointer">
          {schedule.event} : 終日
        </div>
      )}
      {schedule.switchStatus && schedule.categoryNum === 2 && (
        <div className=" h-8 w-full flex items-center bg-red-200 text-white rounded text-xl py-px px-1 cursor-pointer">
          {schedule.event} : 終日
        </div>
      )}
      {schedule.switchStatus && schedule.categoryNum === 3 && (
        <div className=" h-8 w-full flex items-center bg-yellow-500 text-white rounded text-xl py-px px-1 cursor-pointer">
          {schedule.event} : 終日
        </div>
      )}
      {schedule.switchStatus && schedule.categoryNum === 4 && (
        <div className=" h-8 w-full flex items-center bg-pink-300 text-white rounded text-xl py-px px-1 cursor-pointer">
          {schedule.event} : 終日
        </div>
      )}
      {schedule.switchStatus && schedule.categoryNum === 5 && (
        <div className=" h-8 w-full flex items-center bg-green-300 text-white rounded text-xl py-px px-1 cursor-pointer">
          {schedule.event} : 終日
        </div>
      )}
      {schedule.switchStatus && schedule.categoryNum === 6 && (
        <div className=" h-8 w-full flex items-center bg-gray-300 text-white rounded text-xl py-px px-1 cursor-pointer">
          {schedule.event} : 終日
        </div>
      )}
      {schedule.switchStatus && schedule.categoryNum === 7 && (
        <div className=" h-8 w-full flex items-center bg-blue-300 text-white rounded text-xl py-px px-1 cursor-pointer">
          {schedule.event} : 終日
        </div>
      )}
      {schedule.switchStatus && schedule.categoryNum === 8 && (
        <div className=" h-8 w-full flex items-center bg-purple-300 text-white rounded text-xl py-px px-1 cursor-pointer">
          {schedule.event} : 終日
        </div>
      )}
    </div>
  );
};

export default ScheduleEventOnEachDay;
