import {
  Dialog,
  DialogContent,
  Grid,
  MenuItem,
  Select,
  Switch,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import {
  CategoryOutlined,
  NoteOutlined,
  AccessTime,
  Place,
} from "@material-ui/icons";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React, { useState, useCallback, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";

export type Props = {
  isDialogOpen: boolean;
  dialogClose: () => void;
  newDate: dayjs.Dayjs;
  mutate: any;
};

// const url = "http://localhost:8080/";

const AddScheduleDialog: React.FC<Props> = (props) => {
  const { isDialogOpen, dialogClose, newDate, mutate } = props;

  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [switchState, setSwithcState] = useState(true);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [event, setEvent] = useState("");
  const [category, setCategory] = useState("1");
  const [place, setPlace] = useState("");
  const [memo, setMemo] = useState("");

  const handkeSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwithcState(e.target.checked);

    setStart(new Date());
    setEnd(new Date());
  };

  useEffect(() => {
    setStartDate(newDate);
    setEndDate(newDate);
  }, [newDate]);

  const handleDate = useCallback(
    (value: Date) => {
      //   setDeliveryDate(event.target.value);
      let newDay = null;
      if (value != null) {
        newDay = dayjs(value);
      }

      setStartDate(newDay);
    },
    [setStartDate]
  );

  const handleEndDate = useCallback(
    (value: Date) => {
      let newDay = null;
      if (value != null) {
        newDay = dayjs(value);
      }

      setEndDate(newDay);
    },
    [setEndDate]
  );

  const handleClose = () => {
    setEvent("");
    setPlace("");
    setMemo("");
    setCategory("1");
    setStartDate(dayjs());
    setEndDate(dayjs());
    setStart(new Date());
    setEnd(new Date());

    dialogClose();
  };

  const saveData = async () => {
    console.log("saveData", event, startDate, endDate, category, place, memo);
    await axios
      .post(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/save`, {
        event: event,
        startDate: startDate,
        start: start,
        endDate: endDate,
        end: end,
        categoryNum: Number(category),
        place: place,
        memo: memo,
      })
      .then(() => {
        setEvent("");
        setPlace("");
        setMemo("");
        setCategory("1");
        setStartDate(dayjs());
        setEndDate(dayjs());
        setStart(new Date());
        setEnd(new Date());
      });

    dialogClose();

    mutate();
  };

  return (
    <Dialog open={isDialogOpen} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <TextField
          autoFocus
          autoComplete="off"
          fullWidth
          type="text"
          placeholder="新規イベント"
          value={event}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEvent(e.target.value)
          }
        />
        <Grid
          container
          spacing={1}
          alignItems="center"
          justify="space-between"
          className="py-1 pt-5"
        >
          <Grid item>
            <AccessTime /> {"   "}開始
          </Grid>
          <Grid item xs={10}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <>
                <DatePicker
                  value={startDate}
                  onChange={(d) => handleDate(d)}
                  variant="inline"
                  format="yyyy年M月d日"
                  animateYearScrolling
                  disableToolbar
                  fullWidth
                />
                {!switchState && (
                  <TimePicker
                    value={end}
                    onChange={setEnd}
                    todayLabel="now"
                    showTodayButton
                    minutesStep={5}
                  />
                )}
              </>
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          alignItems="center"
          justify="space-between"
          className="py-1 pt-5"
        >
          <Grid item>
            <AccessTime /> {"   "}終了
          </Grid>
          <Grid item xs={10}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <>
                <DatePicker
                  value={endDate}
                  onChange={(d) => handleEndDate(d)}
                  variant="inline"
                  format="yyyy年M月d日"
                  animateYearScrolling
                  disableToolbar
                  fullWidth
                />
                {!switchState && (
                  <TimePicker
                    value={start}
                    onChange={setStart}
                    todayLabel="now"
                    showTodayButton
                    minutesStep={5}
                  />
                )}
              </>
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          alignItems="center"
          justify="space-between"
          className="py-1 pt-5"
        >
          <Grid item>終日</Grid>
          <Grid item xs={10}>
            <Switch
              checked={switchState}
              onChange={(e) => handkeSwitch(e)}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          alignItems="center"
          justify="space-between"
          className="py-1 pt-5"
        >
          <Grid item>
            <CategoryOutlined />
          </Grid>
          <Grid item xs={10}>
            <Select
              fullWidth
              autoFocus
              value={category}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCategory(e.target.value)
              }
            >
              <MenuItem value="1">仕事</MenuItem>
              <MenuItem value="2">誕生日</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          alignItems="center"
          justify="space-between"
          className="py-1 pt-5"
        >
          <Grid item>
            <Place />
          </Grid>
          <Grid item xs={10}>
            <TextField
              autoFocus
              autoComplete="off"
              fullWidth
              placeholder="場所"
              value={place}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPlace(e.target.value)
              }
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          alignItems="center"
          justify="space-between"
          className="py-1 pt-5"
        >
          <Grid item>
            <NoteOutlined />
          </Grid>
          <Grid item xs={10}>
            <TextField
              autoFocus
              autoComplete="off"
              fullWidth
              placeholder="メモ"
              value={memo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMemo(e.target.value)
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <DialogActions>
            <svg
              onClick={saveData}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mb-3 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
          </DialogActions>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default AddScheduleDialog;
