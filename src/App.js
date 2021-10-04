import "./App.css";
import Step from "./components/Step/Step";
import Tube from "./components/Tube/Tube";

import React, { useState, useEffect } from "react";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [isFirstStart, setIsFirstStart] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [timerTotal, setTimerTotal] = useState(30);
  const [startTime, setStartTime] = useState(null);

  const getRandomWeight = () => Math.floor((Math.random() * 4 + 1) * 10) / 10;
  const getRandomSpeed = () => Math.floor(Math.random() * 1000 + 500);

  const [tubes, setTubes] = useState([
    {
      id: 0,
      weight: getRandomWeight(),
      speed: getRandomSpeed(),
      active: true,
      waterLevel: 0,
      intervalFunction: null,
    },
    {
      id: 1,
      weight: getRandomWeight(),
      speed: getRandomSpeed(),
      active: true,
      waterLevel: 0,
      intervalFunction: null,
    },
    {
      id: 2,
      weight: getRandomWeight(),
      speed: getRandomSpeed(),
      active: true,
      waterLevel: 0,
      intervalFunction: null,
    },
  ]);

  const boxPressed = (id) => {
    setTubes(
      tubes.map((tube) => (tube.id === id ? { ...tube, active: false } : tube))
    );
  };

  const togglePlay = () => {
    setIsRunning(!isRunning);
  };

  const startTubesUpdate = () => {
    setTubes(
      tubes.map((tube) => {
        var intervalFunction = setInterval(() => {
          if (startTime !== null) {
            console.log(Date.now() - startTime);
          }
          setTubes(
            tubes.map((tube) => ({
              ...tube,
              waterLevel: 10,
            }))
          );
        }, 300);

        return { ...tube, intervalFunction: intervalFunction };
      })
    );
  };

  const startGame = () => {
    setIsFirstStart(false);
    setStartTime(Date.now());

    startTubesUpdate();
  };

  const stopGame = () => {
    setStartTime(null);

    tubes.forEach((tube) => {
      clearInterval(tube.intervalFunction);
    });

    setTubes(
      tubes.map((tube) => ({
        ...tube,
        active: true,
        waterLevel: 0,
        weight: isFirstStart ? getRandomWeight() : tube.weight,
        speed: getRandomSpeed(),
        intervalFunction: null,
      }))
    );
  };

  useEffect(() => {
    //check game running

    if (isRunning) {
      startGame();
    } else {
      stopGame();
    }
  }, [isRunning]);

  useEffect(() => {
    console.log(startTime - Date.now());

    let interval = null;

    if (isRunning && startTime != null && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(
          timerTotal - Math.floor((Date.now() - startTime) / 1000)
        );
      }, 500);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [startTime, timeRemaining]);

  return (
    <div className="App">
      <div className="head">
        <h1 className="text-white">
          {Math.floor(timeRemaining / 60)}:{timeRemaining % 60}
        </h1>
        <h1 className="text-white">GOAL: 45</h1>
        <button onClick={togglePlay}>{isRunning ? "STOP" : "START"}</button>
      </div>

      <div className="game">
        <div className="tubes">
          <Tube tube={tubes[0]} boxPressed={boxPressed} />
          <Tube tube={tubes[1]} boxPressed={boxPressed} />
          <Tube tube={tubes[2]} boxPressed={boxPressed} />
        </div>

        <div className="steps">
          <Step className="step" value="9" />
          <Step className="step" value="8" />
          <Step className="step" value="7" />
          <Step className="step" value="6" />
          <Step className="step" value="5" />
          <Step className="step" value="4" />
          <Step className="step" value="3" />
          <Step className="step" value="2" />
          <Step className="step" value="1" />
        </div>
      </div>
    </div>
  );
}

export default App;
