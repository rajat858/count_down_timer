import React from 'react'
import { useState } from 'react';
import './dateTimePicker.css';
import CountDownTimer from './CountDownTimer';
function DateTimePicker() {

  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [dateTime, setDateTime] = useState("");
  const [isTimerOn, setIsTimerOn] = useState(false);

  const currTime = new Date().getTime();
  const futureTime = new Date(dateTime).getTime();
  const differenceDays = Math.floor((futureTime - currTime)/ (1000 * 60 * 60 * 24));
  const moreThanHundredDays = ()=> {
    if(differenceDays>100){
      return true;
    }
    return false;
  }
const handleBlur = (e) =>{
    //e.preventDefault();
    const futureDateTime = e.target.value;
    //console.log(dateTime);
     setDateTime(futureDateTime);
}

const handleClear = (e) => {
 
  if(e.target.value.length === 0){
    // console.log("cleared", typeof(e.target.value));
    setDateTime(null);
  }
  
}
const handleSubmit = (e) => {
  e.preventDefault();
  if(moreThanHundredDays()){
    console.log("more than 100 days");
  }
  else if(dateTime === "" || differenceDays < 0){
    console.log("future time is not selected")
    setSelectedDateTime(null);
  }
  else if(isTimerOn){
    setIsTimerOn(false);
    setSelectedDateTime(null);
  }
  else{
    setIsTimerOn(true);
    setSelectedDateTime(dateTime);
  }
  
  
}

  return (<>
  <div className="reddit">

    <form onSubmit={handleSubmit}>
     <input type="datetime-local" id="datetime" name="datetime"  onBlur={handleBlur} onChange={handleClear} disabled = {isTimerOn} /> 
     <button type='submit'>{isTimerOn?"stop":"start"}</button>
    </form>
  
  
  {/* <p>{selectedDateTime}</p> */}
  <CountDownTimer selectedDateTime = {selectedDateTime}/>
  
  </div>

  
  </>
  )
}

export default DateTimePicker