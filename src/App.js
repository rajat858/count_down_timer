import React from 'react';
import './App.css';
import DateTimePicker from './components/dateTimePicker';
function App() {
  return (
    <div id="app">
      <div className='container'>
        <div className="title">
        <h1 className="count">Countdown</h1> <h1 className="timer">Timer</h1>
        </div>
      

      <div className="date-container"><DateTimePicker/></div>
      
    </div>
    </div>
    
  );
}

export default App;
