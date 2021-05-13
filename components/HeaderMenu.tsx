import Link from "next/link";
import React from "react";

const HeaderMenu: React.FC = () => {
  return (
    <div className="flex justify-center items-center pl-8 h-14">
      <div className="flex space-4">
        <Link href="/">
          <a className="text-gray-200 hover:bg-blue-700 px-3 py-2 rounderd">
            Month
          </a>
        </Link>
        <Link href="/calender">
          <a className="text-gray-200 hover:bg-blue-700 px-3 py-2 rounderd">
            Day
          </a>
        </Link>
      </div>
    </div>
  );
};

export default HeaderMenu;
