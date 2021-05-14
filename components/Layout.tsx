import Head from "next/head";
import Link from "next/link";
import React, { useContext } from "react";
import Image from "next/image";
import { CalederContext, CalenderProvider } from "../context/CalenderContext";
import HeaderMenu from "./HeaderMenu";

type Props = {
  title: string;
};

const Layout: React.FC<Props> = ({ children, title = "Schedule" }) => {
  return (
    <CalenderProvider>
      <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 text-m=sm font-mono">
        <Head>
          <title>{title}</title>
        </Head>
        <header>
          <nav className="bg-blue-500 w-screen">
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
              <HeaderMenu />
            </div>
          </nav>
        </header>
        <main className="flex flex-1 justify-center items-center flex-col w-screen">
          {children}
        </main>
      </div>
    </CalenderProvider>
  );
};

export default Layout;
