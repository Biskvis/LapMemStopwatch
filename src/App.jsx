import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const timeOBJ = {
  h: 0,
  m: 0,
  s: 0,
  ms: 0
}
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startBtn, setStartBtn] = useState(null)
  const [laps, setLaps] = useState([])
  const [timeTotal, setTimeTotal] = useState(timeOBJ)

  const buttonRef = useRef(null);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const start = () => {
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
      setIsRunning(true);
    }
  };


  const stop = () => {
    setIsRunning(false)
    buttonRef.current.disabled = false;
  }

  const reset = () => {
    setLaps([])
    setTimeTotal(timeOBJ)
    setTime(0);
  };

  const lap = () => {
    setTimeTotal(prevState => ({
      h: prevState.h + hours,
      m: prevState.m + minutes,
      s: prevState.s + seconds,
      ms: prevState.ms + milliseconds
    }));
    
    
    setLaps(prevState => [
      ...prevState,
      {
        lap: prevState.length + 1, // Increment lap number based on the current length of the laps array
        lapTime: `${hours}:${minutes}:${seconds}:${milliseconds}`, // Lap time
        totalTime: `${timeTotal.h}:${timeTotal.m}:${timeTotal.s}:${timeTotal.ms}` // Total time
      }
    ]);
  
    // Reset the time to 0
    setTime(0);
  };
  
  
  const track = laps.map((v, i) => (
    <div className='lap-stats'>
      <span>
        Lap {laps[i].lap}
        </span>
        <span>
      {laps[i].lapTime}

        </span>
        <span>
      {laps[i].totalTime}

        </span>
    </div>
  ));
  
  
  return (
    <>
      <h1>Stopwatch</h1>
      <main>
        <div className='time'>
          <h2>
            {hours}:{minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}:
              {milliseconds.toString().padStart(2, "0")}
              </h2>
        </div>
        <div className='buttons'>
          <button ref={buttonRef} onClick={(e) => start(e)} className={isRunning ? 'disabled' : ''}>Start</button>
          <button onClick={stop}>Pause</button>
          <button onClick={lap}>Lap</button>
          <button onClick={reset}>Reset</button>
        </div>{ laps.length > 0 &&

          <div className='lap-info'><h2>Lap</h2><h2>Time</h2><h2>Total Time</h2></div>
        }
        <div className='laps'>
          {laps.length > 0 && track}
        </div>
      </main>
    </>
  )
}

export default App
