import React from "react";
import { useState, useEffect } from "react";
import "./countDownTimer.css";
function CountDownTimer({ selectedDateTime }) {

  const calculateTime = () => {

    let timeLeft = {days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0};
    const currTime = new Date().getTime();
    const futureTime = new Date(selectedDateTime).getTime();
    const difference = futureTime - currTime;
    if(difference > 0 ){
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
      
    }
    

    return timeLeft;
  }

  const [timeLeft, setTimeLeft] = useState(calculateTime());
  useEffect(() => {
    if(selectedDateTime === null){
      setTimeLeft(calculateTime());
    }
    
    var intervalId = null;
    if (selectedDateTime !== null && selectedDateTime) {
      intervalId = setInterval(() => {
        setTimeLeft(calculateTime());
      }, 1000);
    }
    
    return () => clearInterval(intervalId);
  }, [selectedDateTime]);

  return (
    <div className="timer-container">
      <div className="timer-card">{timeLeft.days<10?"0"+timeLeft.days:timeLeft.days}</div>
      <div className="timer-card">{timeLeft.hours<10?"0"+timeLeft.hours:timeLeft.hours}</div>
      <div className="timer-card">{timeLeft.minutes<10?"0"+timeLeft.minutes:timeLeft.minutes}</div>
      <div className="timer-card">{timeLeft.seconds<10?"0"+timeLeft.seconds:timeLeft.seconds}</div>
    </div>
  );
}

export default CountDownTimer;
