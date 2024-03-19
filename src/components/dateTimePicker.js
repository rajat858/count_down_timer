import React from 'react'
import { useState } from 'react';
import './dateTimePicker.css';
import CountDownTimer from './CountDownTimer';
function DateTimePicker() {

  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [dateTime, setDateTime] = useState("");
  const [isTimerOn, setIsTimerOn] = useState(false);

  const currTime = new Date().getTime(); //getting current time in milliseconds
  const futureTime = new Date(dateTime).getTime();//getting future time in milliseconds
  const differenceDays = Math.floor((futureTime - currTime)/ (1000 * 60 * 60 * 24)); //finding number of days between current and future time
  const moreThanHundredDays = ()=> {
    if(differenceDays>100){
      return true;
    }
    return false;
  }
const handleBlur = (e) =>{
    const futureDateTime = e.target.value;
    setDateTime(futureDateTime);
}

const handleClear = (e) => {
  if(e.target.value.length === 0){
    setDateTime(null);
  }
  
}
const handleSubmit = (e) => {
  e.preventDefault();
  if(moreThanHundredDays()){  // check more than 100 days condition
    console.log("more than 100 days");
  }
  else if(dateTime === "" || differenceDays < 0){ //check if dateTime currently selected is empty or past date is selected
    console.log("Past time or No Time is selected")
    setSelectedDateTime(null);
  }
  else if(isTimerOn){ //if timer is ON then stop it and reset the count Down
    setIsTimerOn(false);
    setSelectedDateTime(null);
  }
  else{
    setIsTimerOn(true);//if timer is OFF then start it and set the count Down to the current date time selected in picker
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