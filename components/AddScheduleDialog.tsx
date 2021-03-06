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
  FiberManualRecord,
} from "@material-ui/icons";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React, { useState, useCallback, useEffect, useContext } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { CalederContext, CalenderProvider } from "../context/CalenderContext";

export type Props = {
  isDialogOpen: boolean;
  dialogClose: () => void;
  newDate: dayjs.Dayjs;
  mutate: any;
};

const hours: Array<number> = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
];

// const url = "http://localhost:8080/";

const AddScheduleDialog: React.FC<Props> = (props) => {
  const { isDialogOpen, dialogClose, newDate, mutate } = props;
  const { isOpen, isCloseDialog, setSelectDate } = useContext(CalederContext);

  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [switchState, setSwithcState] = useState(true);
  const [start, setStart] = useState(String(dayjs().hour()));
  const [end, setEnd] = useState(String(dayjs().hour()));
  const [event, setEvent] = useState("");
  const [category, setCategory] = useState("1");
  const [place, setPlace] = useState("");
  const [memo, setMemo] = useState("");

  const handkeSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwithcState(e.target.checked);

    setStart(String(dayjs().hour()));
    setEnd(String(dayjs().hour()));
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
    setStart(String(dayjs().hour()));
    setEnd(String(dayjs().hour()));
    setSelectDate(dayjs());

    isCloseDialog();
  };

  const saveData = async () => {
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
        switchStatus: switchState,
      })
      .then(() => {
        setEvent("");
        setPlace("");
        setMemo("");
        setCategory("1");
        setStartDate(dayjs());
        setEndDate(dayjs());
        setStart(String(dayjs().hour()));
        setEnd(String(dayjs().hour()));
      });

    setSelectDate(dayjs());
    isCloseDialog();

    mutate();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <TextField
          autoFocus
          autoComplete="off"
          fullWidth
          type="text"
          placeholder="??????????????????"
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
            <AccessTime /> {"   "}??????
          </Grid>
          <Grid item xs={10}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <>
                <DatePicker
                  value={startDate}
                  onChange={(d) => handleDate(d)}
                  variant="inline"
                  format="yyyy???M???d???"
                  animateYearScrolling
                  disableToolbar
                  fullWidth
                />
                {!switchState && (
                  <Select
                    fullWidth
                    autoFocus
                    value={start}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setStart(e.target.value)
                    }
                  >
                    {hours.map((hour) => (
                      <MenuItem value={String(hour)} key={hour}>
                        {hour} ???
                      </MenuItem>
                    ))}
                  </Select>
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
            <AccessTime /> {"   "}??????
          </Grid>
          <Grid item xs={10}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <>
                <DatePicker
                  value={endDate}
                  onChange={(d) => handleEndDate(d)}
                  variant="inline"
                  format="yyyy???M???d???"
                  animateYearScrolling
                  disableToolbar
                  fullWidth
                />
                {!switchState && (
                  <Select
                    fullWidth
                    autoFocus
                    value={end}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEnd(e.target.value)
                    }
                  >
                    {hours.map((hour) => (
                      <MenuItem value={String(hour)} key={hour}>
                        {hour} ???
                      </MenuItem>
                    ))}
                  </Select>
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
          <Grid item>??????</Grid>
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
              <MenuItem value="1">
                <span className="text-xs mr-3 text-yellow-200">
                  <FiberManualRecord />
                </span>{" "}
                Shopping
              </MenuItem>
              <MenuItem value="2">
                <span className="text-xs mr-3 text-red-300">
                  <FiberManualRecord />
                </span>{" "}
                Birthday
              </MenuItem>
              <MenuItem value="3">
                <span className="text-xs mr-3 text-yellow-500">
                  <FiberManualRecord />
                </span>{" "}
                Eating Out
              </MenuItem>
              <MenuItem value="4">
                <span className="text-xs mr-3 text-purple-300 ">
                  <FiberManualRecord />
                </span>{" "}
                Movie
              </MenuItem>
              <MenuItem value="5">
                <span className="text-xs mr-3 text-pink-300">
                  <FiberManualRecord />
                </span>{" "}
                Beauty
              </MenuItem>
              <MenuItem value="6">
                <span className="text-xs mr-3 text-green-300">
                  <FiberManualRecord />
                </span>{" "}
                Hospital
              </MenuItem>
              <MenuItem value="7">
                <span className="text-xs mr-3 text-gray-300">
                  <FiberManualRecord />
                </span>{" "}
                Gym???Training
              </MenuItem>
              <MenuItem value="8">
                <span className="text-xs mr-3 text-blue-300">
                  <FiberManualRecord />
                </span>{" "}
                Others
              </MenuItem>
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
              placeholder="??????"
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
              placeholder="??????"
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
