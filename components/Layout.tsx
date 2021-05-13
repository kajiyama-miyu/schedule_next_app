import Head from "next/head";
import Link from "next/link";
import React from "react";
import Image from "next/image";

type Props = {
  title: string;
};

const Layout: React.FC<Props> = ({ children, title = "Schedule" }) => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 text-m=sm font-mono">
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav className="bg-blue-800 w-screen">
          <div className="inline-flex justify-center items-center pl-8 h-14">
            <div className="flex items-center mr-64 ml-10 text-xl">
              <Image
                priority
                src="/images/calender.png"
                height={45}
                width={45}
                alt="schedule"
              />
              <a className="text-gray-200 ml-3">Schedule</a>
            </div>
            <svg
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
              <Link href="/calender_demo">
                <a className="text-gray-200 hover:bg-blue-700 px-6 py-2 rounderd">
                  Day
                </a>
              </Link>
            </div>
            <div className="flex items-center ml-64">
              <a className="text-gray-200 hover:bg-blue-700 px-6 py-2 rounder">
                Logout
              </a>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-1 justify-center items-center flex-col w-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;
