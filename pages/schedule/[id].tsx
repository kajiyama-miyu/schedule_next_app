import React, { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import { Schedule } from "../../type/type";
import { getScheduleData, getAllScheduleIds } from "../../lib/schedule";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import {
  Card,
  CssBaseline,
  Paper,
  CardContent,
  Grid,
  Typography,
  CardActions,
} from "@material-ui/core";
import {
  CategoryOutlined,
  NoteOutlined,
  AccessTime,
  Place,
} from "@material-ui/icons";
import EditcheduleDialog from "../../components/EditSchedule";
import dayjs from "dayjs";

const fetcher = (url: string) =>
  axios.get<Schedule>(url).then((res) => res.data);

type Props = {
  id: number;
  schedule: Schedule;
};

export default function ScheduleDetail({ id, schedule }: Props) {
  const router = useRouter();
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}detail-schedule/${id}`,
    fetcher,
    {
      initialData: schedule,
    }
  );

  const [isOpen, setOpen] = useState(false);

  const date = new Date();
  useEffect(() => {
    mutate();
  }, []);

  if (router.isFallback || !data) {
    return <div>Loading...</div>;
  }

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleColose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/delete/${schedule.scheduleId}`
    );
    router.push("/");
  };

  return (
    <Layout title={"detail"}>
      <div className="flex items-center justify-center ">
        <Card className="w-80">
          <CardContent>
            <Grid
              container
              spacing={1}
              alignItems="center"
              justify="center"
              className="pb-7"
            >
              <Grid item xs={10}>
                <Typography variant="h5" component="h3" className="text-center">
                  {data.event}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              alignItems="center"
              justify="center"
              className="text-center"
            >
              <Grid item>
                <AccessTime />
              </Grid>
              <Grid item xs={10}>
                <Typography>{data.startDate}</Typography>
              </Grid>
              {!data.switchStatus && (
                <Grid item xs={10}>
                  <Typography>{data.start}時</Typography>
                </Grid>
              )}
            </Grid>
            <Grid
              container
              spacing={1}
              alignItems="center"
              justify="center"
              className="pb-3 text-center"
            >
              <Grid item>
                <AccessTime />
              </Grid>
              <Grid item xs={10}>
                <Typography>{data.endDate}</Typography>
              </Grid>
              {!data.switchStatus && (
                <Grid item xs={10}>
                  <Typography>{data.end}時</Typography>
                </Grid>
              )}
            </Grid>
            <Grid
              container
              spacing={1}
              alignItems="center"
              justify="center"
              className="pb-3 text-center"
            >
              <Grid item>
                <Place />
              </Grid>
              <Grid item xs={10}>
                <Typography>{data.place}</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              alignItems="center"
              justify="center"
              className="pb-3 text-center"
            >
              <Grid item>
                <CategoryOutlined />
              </Grid>
              {data.categoryNum === 1 && (
                <Grid item xs={10}>
                  <Typography>Shopping</Typography>
                </Grid>
              )}
              {data.categoryNum === 2 && (
                <Grid item xs={10}>
                  <Typography>BirthDay</Typography>
                </Grid>
              )}
              {data.categoryNum === 3 && (
                <Grid item xs={10}>
                  <Typography>Eating Out</Typography>
                </Grid>
              )}
              {data.categoryNum === 4 && (
                <Grid item xs={10}>
                  <Typography>Movie</Typography>
                </Grid>
              )}
              {data.categoryNum === 5 && (
                <Grid item xs={10}>
                  <Typography>Beauty</Typography>
                </Grid>
              )}
              {data.categoryNum === 6 && (
                <Grid item xs={10}>
                  <Typography>Hospital</Typography>
                </Grid>
              )}
              {data.categoryNum === 7 && (
                <Grid item xs={10}>
                  <Typography>Gym・Training</Typography>
                </Grid>
              )}
              {data.categoryNum === 8 && (
                <Grid item xs={10}>
                  <Typography>Other</Typography>
                </Grid>
              )}
            </Grid>
            <Grid
              container
              spacing={1}
              alignItems="center"
              justify="center"
              className="pb-3 text-center"
            >
              <Grid item>
                <NoteOutlined />
              </Grid>
              <Grid item xs={10}>
                <Typography>{data.memo}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container spacing={1} alignItems="center" justify="center">
              <Grid item>
                <div className="flex cursor-pointer mt-12">
                  <svg
                    onClick={() => handleOpen()}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
              </Grid>
              <Grid item>
                <div className="flex cursor-pointer mt-12">
                  <svg
                    onClick={() => handleDelete()}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </div>
      <Grid container spacing={1} alignItems="center" justify="center">
        <Grid item>
          <Link href="/">
            <div className="flex cursor-pointer mt-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
              <span className="text-black">Back to Home</span>
            </div>
          </Link>
        </Grid>
      </Grid>

      <EditcheduleDialog
        isDialogOpen={isOpen}
        dialogClose={handleColose}
        mutate={mutate}
        schedule={data}
      />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllScheduleIds();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.id;

  const { schedule } = await getScheduleData(Number(id));

  console.log("schedule", schedule);
  return {
    props: {
      id: schedule.scheduleId,
      schedule,
    },
    revalidate: 3,
  };
};
