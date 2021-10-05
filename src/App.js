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
  const getRandomSpeed = () => Math.random() * 6 + 4; //da 4 a 6% ogni secondo

  const [tubes, setTubes] = useState([
    {
      id: 0,
      weight: getRandomWeight(),
      speedMultiplier: getRandomSpeed(),
      active: true,
      waterLevel: 100,
    },
    {
      id: 1,
      weight: getRandomWeight(),
      speedMultiplier: getRandomSpeed(),
      active: true,
      waterLevel: 0,
    },
    {
      id: 2,
      weight: getRandomWeight(),
      speedMultiplier: getRandomSpeed(),
      active: true,
      waterLevel: 0,
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

  const startGame = () => {
    setIsFirstStart(false);
    setStartTime(Date.now());
  };

  const stopGame = () => {
    setStartTime(null);
    setTimeRemaining(30);
    setTubes(
      tubes.map((tube) => ({
        ...tube,
        active: true,
        waterLevel: 0,
        weight: isFirstStart ? tube.weight : getRandomWeight(),
        speed: getRandomSpeed(),
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
    let interval = null;

    if (isRunning && startTime != null && timeRemaining > 0) {
      interval = setInterval(() => {
        var msFromStart = Date.now() - startTime;

        setTubes(
          tubes.map((tube) =>
            tube.active
              ? {
                  ...tube,
                  waterLevel:
                    (msFromStart / 1000) * tube.speedMultiplier > 100
                      ? 100
                      : (msFromStart / 1000) * tube.speedMultiplier,
                }
              : tube
          )
        );

        setTimeRemaining(timerTotal - Math.floor(msFromStart / 1000));
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [startTime, timeRemaining, tubes]);

  return (
    <div className="App">
      <div className="head">
        <h1 className="text-white">
          {("0" + Math.floor(timeRemaining / 60)).slice(-2)}:
          {("0" + (timeRemaining % 60)).slice(-2)}
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
          <Step className="step" value="10" />
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
