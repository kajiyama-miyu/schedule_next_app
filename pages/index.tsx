import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Layout from "../components/Layout";
import Calender from "./calender";
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale("ja");
import { CalenderProvider } from "../context/CalenderContext";
import Blog from "./calender_demo";

const Home: React.FC = () => {
  return (
    <CalenderProvider>
      <Layout title="Home">
        <Calender />
      </Layout>
    </CalenderProvider>
  );
};
export default Home;
