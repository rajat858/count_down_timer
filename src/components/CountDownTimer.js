import React from "react";
import { useState, useEffect } from "react";
import "./countDownTimer.css";
function CountDownTimer({ selectedDateTime, setIsTimerOn, setDateTime }) {
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
      //to set counter to 00 00 00 00 when date same day and past date or no date
      setTimeLeft(calculateTime());
    }

    var intervalId = null;
    if (selectedDateTime !== null && selectedDateTime) {
      // calculating time left every second using setInterval()

      intervalId = setInterval(() => {
        setTimeLeft(calculateTime());
        if (calculateTime().seconds === 0) {
          setIsTimerOver(true);
          setIsTimerOn(() => false);
          setDateTime(()=> "");
        } else {
          setIsTimerOver(false);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [selectedDateTime]);

  // const TimeisOverMsg = () => {
  //   let secondsLeft = calculateTime().seconds;
  //   if(secondsLeft === 0){
  //     console.log("timer is done");
  //   }
  // }

  return (
    <>
      {isTimerOver ? (
        <div>TIMER KHATAM</div>
      ) : (
        <div className="timer-container">
          <div className="timer-card">
            <div className="timer-info">
              <h1>
                {timeLeft.days < 10 ? "0" + timeLeft.days : timeLeft.days}
              </h1>
              <h2>Days</h2>
            </div>
          </div>
          <div className="timer-card">
            <div className="timer-info">
              <h1>
                {timeLeft.hours < 10 ? "0" + timeLeft.hours : timeLeft.hours}
              </h1>
              <h2>Hours</h2>
            </div>
          </div>
          <div className="timer-card">
            <div className="timer-info">
              <h1>
                {timeLeft.minutes < 10
                  ? "0" + timeLeft.minutes
                  : timeLeft.minutes}
              </h1>
              <h2>Minutes</h2>
            </div>
          </div>
          <div className="timer-card">
            <div className="timer-info">
              <h1>
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
