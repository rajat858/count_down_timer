import React from "react";
import { useState } from "react";
import styles from "./dateTimePicker.module.css";
import CountDownTimer from "./CountDownTimer";
function DateTimePicker() {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [dateTime, setDateTime] = useState("");
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [isPastOrNoTime, setisPastOrNoTime] = useState(false);
  const [isMorethan100Days, setIsMoreThan100Days] = useState(false);

  const currTime = new Date().getTime(); //getting current time in milliseconds
  const futureTime = new Date(dateTime).getTime(); //getting future time in milliseconds
  const differenceDays = Math.floor(
    (futureTime - currTime) / (1000 * 60 * 60 * 24)
  ); //finding number of days between current and future time
  const moreThanHundredDays = () => {
    if (differenceDays > 100) {
      return true;
    }
    return false;
  };

  const handleBlur = (e) => {
    const futureDateTime = e.target.value;
    setDateTime(futureDateTime);
  };

  const handleClear = (e) => {
    if (e.target.value.length === 0) {
      setDateTime(null);
    }
  };
  const handleDateTimeChange = (v) => { //to change this state from child by passing as prop
    setDateTime(v);
  }
  const handleisTimerOn = (v) => { //to change this state from child by passing as prop
    setIsTimerOn(v);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dateTime);
    if (moreThanHundredDays()) {
      setIsMoreThan100Days(true);
      setisPastOrNoTime(false);
    } else if (dateTime === "" || differenceDays < 0) {
      //check if dateTime currently selected is empty or past date is selected
      console.log("are we here");
      setIsMoreThan100Days(false);
      setisPastOrNoTime(true);
      setSelectedDateTime(null);
    } else if (isTimerOn) {
      //if timer is ON then stop it and reset the count Down
      setIsTimerOn(false);
      setSelectedDateTime(null);
    } else {
      setIsMoreThan100Days(false);
      setisPastOrNoTime(false);
      setIsTimerOn(true); //if timer is OFF then start it and set the count Down to the current date time selected in picker
      setSelectedDateTime(dateTime);
    }
  };

  return (
    <>
      <div>
        <form className="date-time-form" onSubmit={handleSubmit}>
          <input
            className={styles.datetimeinput}
            type="datetime-local"
            id="datetime"
            name="datetime"
            onBlur={handleBlur}
            onChange={handleClear}
            disabled={isTimerOn}
          />
          <button className={styles.datetimebtn} type="submit">
            {isTimerOn ? "Cancel Timer" : "Start Timer"}
          </button>
        </form>

        {isPastOrNoTime ? (
          <h4 className={styles.error}>Past time, no time or same time is selected</h4>
        ) : (
          <></>
        )}

        {isMorethan100Days ? (
          <h4 className={styles.error}>Selected time is more than 100 days</h4>
        ) : (
          <CountDownTimer
            selectedDateTime={selectedDateTime}
            setIsTimerOn={handleisTimerOn}
            setDateTime = {handleDateTimeChange}
          />
        )}
      </div>
    </>
  );
}

export default DateTimePicker;
