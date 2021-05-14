import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Layout from "../components/Layout";
import Calender from "./calender";
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale("ja");
import { CalenderProvider } from "../context/CalenderContext";

const Home: React.FC = () => {
  return (
    <CalenderProvider>
      <Calender />
    </CalenderProvider>
  );
};
export default Home;
