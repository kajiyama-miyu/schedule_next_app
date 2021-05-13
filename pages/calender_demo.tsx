import {
  Card,
  CardContent,
  Grid,
  Typography,
  CssBaseline,
  GridList,
  Paper,
} from "@material-ui/core";
import CalenderElement from "../components/CalenderElement";
import { createCarender } from "../logic/calender";
import { CalederContext, DayState } from "../context/CalenderContext";
import React, { useContext, useMemo, useState } from "react";
import { getNextMonth, getPreviousMonth } from "../logic/calender";
import dayjs from "dayjs";
import AddScheduleDialog from "../components/AddScheduleDialog";
import axios from "axios";
import useSWR from "swr";
import { useEffect } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getAllSchedule } from "../lib/schedule";
import { Schedule } from "../type/type";
import { setSchedule } from "../logic/schedule";
import { useRouter } from "next/router";
import { isSameDay } from "../logic/calender";
import { CalenderProvider } from "../context/CalenderContext";
import Layout from "../components/Layout";

type Props = {
  schedules: Array<Schedule>;
};

export default function Blog({ schedules }: Props) {
  return (
    <Layout title={"demo"}>
      <div className="flex items-center justify-center max-w-6xl">
        <Grid container alignItems="center" justify="center">
          <Grid>
            {schedules &&
              schedules.map((schedule) => {
                <Typography component="h2" variant="h2">
                  {schedule.scheduleId} {" : "} {schedule.event}
                </Typography>;
              })}
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const schedules = await getAllSchedule();

  return {
    props: { schedules },
  };
}
