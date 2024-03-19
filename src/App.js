import React from 'react';
import './App.css';
import DateTimePicker from './components/dateTimePicker';
function App() {
  return (
    <div id="app">
      <div className='container'>
      Count Down Timer

      <div className="date-container"><DateTimePicker/></div>
      
    </div>
    </div>
    
  );
}

export default App;
