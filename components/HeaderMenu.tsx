import Link from "next/link";
import React, { useContext } from "react";
import { CalederContext, CalenderProvider } from "../context/CalenderContext";

const HeaderMenu: React.FC = () => {
  const { isOpenDialog } = useContext(CalederContext);
  const handleDialogOpen = () => {
    isOpenDialog();
  };

  return (
    <CalenderProvider>
      <svg
        onClick={() => handleDialogOpen()}
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-200 ml-11"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div className="flex space-4 ml-14 mr-32">
        <Link href="/">
          <a className="text-gray-200 hover:bg-blue-700 px-6 py-2 rounderd">
            Month
          </a>
        </Link>
        <Link href="/date_sample">
          <a className="text-gray-200 hover:bg-blue-700 px-6 py-2 rounderd">
            Day
          </a>
        </Link>
      </div>
    </CalenderProvider>
  );
};

export default HeaderMenu;
