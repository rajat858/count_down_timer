import React from "react";
import { useState, useEffect } from "react";
import styles from "./countDownTimer.module.css";
function CountDownTimer({ selectedDateTime, setIsTimerOn, setDateTime}) {
  const [isTimerOver, setIsTimerOver] = useState(false);
  const calculateTime = () => {
    let timeLeftObj = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const currTime = new Date().getTime();
    const futureTime = new Date(selectedDateTime).getTime();
    const difference = futureTime - currTime;
    if (difference > 0) {
      timeLeftObj = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeftObj;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTime());
  useEffect(() => {
    if (selectedDateTime === null) {
      //to set counter to 00 00 00 00 when date is same day and past date or no date
      setTimeLeft(calculateTime());
    }

    var intervalId = null;
    if (selectedDateTime !== null && selectedDateTime) {
      // calculating time left every second using setInterval()

      intervalId = setInterval(() => {
        setTimeLeft(calculateTime());
        if (calculateTime().seconds === 0&& calculateTime().days ===0 && calculateTime().hours === 0 && calculateTime().minutes === 0) {
          setIsTimerOver(true);   //when timer runs out istimerOn should be false
          setIsTimerOn(() => false); //when timer runs out timer on should be false
          setDateTime(()=> ""); //when timer runs out the dateTime value should be empty
        } else {
          
          setIsTimerOver(false);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [selectedDateTime]);


  return (
    <>
      {isTimerOver ? (
        <h4 className={styles.error}>🎉The countdown is over! What's next on your adventure?🎉</h4>
      ) : (
        <div className={styles.timercontainer}>
          <div className={styles.timercard}>
            <div className="timer-info">
              <h1 className={styles.counter}>
                {timeLeft.days < 10 ? "0" + timeLeft.days : timeLeft.days}
              </h1>
              <h2>Days</h2>
            </div>
          </div>
          <div className={styles.timercard}>
            <div className="timer-info">
              <h1 className={styles.counter}>
                {timeLeft.hours < 10 ? "0" + timeLeft.hours : timeLeft.hours}
              </h1>
              <h2>Hours</h2>
            </div>
          </div>
          <div className={styles.timercard}>
            <div className="timer-info">
              <h1 className={styles.counter}>
                {timeLeft.minutes < 10
                  ? "0" + timeLeft.minutes
                  : timeLeft.minutes}
              </h1>
              <h2>Minutes</h2>
            </div>
          </div>
          <div className={styles.timercard}>
            <div className="timer-info">
              <h1 className={styles.counter}>
                {timeLeft.seconds < 10
                  ? "0" + timeLeft.seconds
                  : timeLeft.seconds}
              </h1>
              <h2>Seconds</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CountDownTimer;
