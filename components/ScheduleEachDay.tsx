import { Schedule } from "../type/type";
import React from "react";

type Props = {
  schedule: Schedule;
  hour: number;
};

const ScheduleEachDay: React.FC<Props> = (props) => {
  const { schedule, hour } = props;

  return (
    <div>
      {schedule.categoryNum === 1 && (
        <div className=" h-48 w-full flex items-center bg-yellow-200 bg-opacity-80 text-white rounded text-2xl py-px px-1 cursor-pointer">
          {String(hour) === schedule.start && (
            <div>
              {schedule.event} : {schedule.start}時~{schedule.end}時
            </div>
          )}
        </div>
      )}
      {schedule.categoryNum === 2 && (
        <div className=" h-48 w-full flex items-center bg-red-300 bg-opacity-80 text-white rounded text-2xl py-px px-1 cursor-pointer">
          {String(hour) === schedule.start && (
            <div>
              {schedule.event} : {schedule.start}時~{schedule.end}時
            </div>
          )}
        </div>
      )}
      {schedule.categoryNum === 3 && (
        <div className=" h-48 w-full flex items-center bg-yellow-500 bg-opacity-80 text-white rounded text-2xl py-px px-1 cursor-pointer">
          {String(hour) === schedule.start && (
            <div>
              {schedule.event} : {schedule.start}時~{schedule.end}時
            </div>
          )}
        </div>
      )}
      {schedule.categoryNum === 4 && (
        <div className=" h-48 w-full flex items-center bg-purple-300 bg-opacity-80 text-white rounded text-2xl py-px px-1 cursor-pointer">
          {String(hour) === schedule.start && (
            <div>
              {schedule.event} : {schedule.start}時~{schedule.end}時
            </div>
          )}
        </div>
      )}
      {schedule.categoryNum === 5 && (
        <div className=" h-48 w-full flex items-center bg-pink-300 bg-opacity-80 text-white rounded text-2xl py-px px-1 cursor-pointer">
          {String(hour) === schedule.start && (
            <div>
              {schedule.event} : {schedule.start}時~{schedule.end}時
            </div>
          )}
        </div>
      )}
      {schedule.categoryNum === 6 && (
        <div className=" h-48 w-full flex items-center bg-green-300 bg-opacity-80 text-white rounded text-2xl py-px px-1 cursor-pointer">
          {String(hour) === schedule.start && (
            <div>
              {schedule.event} : {schedule.start}時~{schedule.end}時
            </div>
          )}
        </div>
      )}
      {schedule.categoryNum === 7 && (
        <div className=" h-48 w-full flex items-center bg-gray-300 bg-opacity-80 text-white rounded text-2xl py-px px-1 cursor-pointer">
          {String(hour) === schedule.start && (
            <div>
              {schedule.event} : {schedule.start}時~{schedule.end}時
            </div>
          )}
        </div>
      )}
      {schedule.categoryNum === 8 && (
        <div className=" h-48 w-full flex items-center bg-blue-300 bg-opacity-80 text-white rounded text-2xl py-px px-1 cursor-pointer">
          {String(hour) === schedule.start && (
            <div>
              {schedule.event} : {schedule.start}時~{schedule.end}時
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduleEachDay;
